const express = require('express');
const {validationRules, validate } = require('../validators/validate')
const { loadWaitListers, addWaitLister, saveWaitListers } = require('../utils/waitlisters')
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../')

const router = new express.Router();


router.post('/waitlist', validationRules(), validate, (req, res) => {
    try {
        if (req.query.type === 'investor') {
            addWaitLister(req.body)
            res.status(201).send({message:'waitlister added successfully'})

        } else if (req.query.type === 'assetLister') {
            if(!req.body.description) {
                return res.status(400).send({error: 'description field is required for asset listers'})
            }
            addWaitLister(req.body)
            res.status(201).send({message:'waitLister added successfully'})
        } else {
            res.status(400).send({error: "please provide waitlist type"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({error : error.message})
    }

})

module.exports = router