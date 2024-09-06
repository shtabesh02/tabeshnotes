const express = require('express');
const router = express.Router();
const { StarredNote, User } = require('../../db/models');

const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { where } = require('sequelize');

router.get('/', async (req, res) => {
    const SN = await StarredNote.findAll({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName', 'username'] }
        ]
    });
    // console.log('SN: ', SN);
    res.status(200).json(SN);
});

const validateNewnote = [
    check('title')
        .notEmpty()
        .withMessage('The title cannot be empty.'),
    check('note')
        .notEmpty()
        .withMessage('The note is not added yet.'),
    handleValidationErrors
]

router.post('/', validateNewnote, async (req, res) => {
    const { user_id, title, note } = req.body;
    const newnote = await StarredNote.create({
        user_id,
        title,
        content: note
    });
    console.log('newnote: ', newnote)
    if(newnote){
        // When you insert a new record into the database using Sequelize, the "newly created record" is returned by the create method.
        const newnote_User = await StarredNote.findOne(
            {
                where: { id: newnote.id },
                include: {
                    model: User, attributes: ['id', 'firstName', 'lastName']
                }
            });
        res.status(200).json(newnote_User);
    }else{
        res.status(400).json(newnote);
    }
});

router.get('/:starrednote_id', async (req, res) => {
    const { starrednote_id } = req.params;
    const thenote = await StarredNote.findAll(
        {
            where: {
                id: starrednote_id
            },
            include: {
                model: User, attributes: ['id', 'firstName', 'lastName', 'username']
            }
        }
    );
    // console.log('thenote: ', thenote);
    res.status(200).json(thenote);
})

router.put('/:starrednote_id/update', async (req, res) => {
    const { starrednote_id } = req.params;
    const { title, content } = req.body;
    const updatednote = await StarredNote.findOne({ where: { id: starrednote_id } });
    const setUpdatednote = updatednote.set({
        title,
        content
    });
    console.log('setUpdatednote: ', setUpdatednote);
    await setUpdatednote.save();
    res.status(200).json(setUpdatednote);
})

router.delete('/:starrednote_id', async (req, res) => {
    const { starrednote_id } = req.params;
    const deletenote = await StarredNote.findOne({ where: { id: starrednote_id } });
    deletenote.destroy();
    res.status(200).json(deletenote);
})
module.exports = router;