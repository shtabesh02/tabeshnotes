const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserProfile } = require('../../db/models');

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const sharp = require('sharp');
const dotenv = require('dotenv');
dotenv.config();

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/users/:user_id', async (req, res) => {
    // I need to send the username instead of user_id.
    // Then get username's id from the Users table.
    
    const { user_id } = req.params;
    const photos = await UserProfile.findOne(
        { 
            where: { user_id },
            order: [['id', 'DESC']],
            limit: 1
     });
    const getObjectParams = {
        Bucket: bucketName,
        Key: photos.photo
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    res.send(url)
});


// POST request to handle file uploads
// Use multer for handling multipart form-data
router.post('/users/:user_id', upload.single('profilePhoto'), async (req, res) => {
    const { user_id } = req.params;

    const imageName = randomImageName();

    // image resizing
    const buffer = await sharp(req.file.buffer).resize({height:180, width:170, fit: 'contain'}).toBuffer();

    const params = {
        Bucket: bucketName,
        // Key: req.file.originalname,
        Key: imageName, // making random names
        // Body: req.file.buffer,
        Body: buffer, // used this resized image instead of req.file.buffer
        ContentType: req.file.mimetype,
        ACL: 'public-read' // access right. if error, remove it.
    }
    const command = new PutObjectCommand(params)
    await s3.send(command); // it uploads photo to s3

    const save2db = await UserProfile.create({
        user_id,
        photo: imageName
    });

    res.send(save2db)
});

// DELETE
router.delete('/users/:photo_id', async (req,res) => {
    const photoid = req.params.photo_id;

    const photo = await UserProfile.findUnique({where: {photoid}});
    if(!photo){
        res.status(404).json('Photo not found.');
    }

    const params = {
        bucketName: bucketName,
        Key: photo.imageName
    }
    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    
    photo.destroy();
    res.status(200).send(photo)
});

module.exports = router;
