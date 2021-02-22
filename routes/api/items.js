const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')

// item model
const Item = require('../../models/item');

// @route GET api/items
// @desc  get all items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
})


// @route POST api/item
// @desc  Create a item
// @access delete
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => res.json(item))
})


// @route delete api/items/:id
// @desc  delete an item
// @access Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(()=> res.json({success: true})))
        .catch(err=> res.status(404).json({success: false}))
})


module.exports = router