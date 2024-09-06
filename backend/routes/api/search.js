const express = require('express');

const router = express.Router();
const {StarredNote, Lesson} = require('../../db/models');
const { Op, where } = require('sequelize');

router.get('/:key', async (req, res) => {
    const {key} = req.params;
    const result = await StarredNote.findAll({where: {
        content: {
            [Op.like]: `%${key}%`,
        }
    }});

    res.status(200).json(result);
})

module.exports = router