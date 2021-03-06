const express = require('express');
// const router = require('./routes');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/', (req, res, next) => {
    Product.find().exec().then(docs =>{
       console.log(docs);
       res.status(200).json(docs);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/',(req,res,next) => {

    const product = new Product({
       _id: new mongoose.Types.ObjectId(),
       name: req.body.name,
       price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message : 'Handling POST requests to /products',
            createdProduct: product
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});


router.get('/:group/:limitNum',(req,res,next) => {
    const group = req.params.group;
    const limitNum = Number(req.params.limitNum);

    Product.find({"Group":group}).limit(limitNum)
        .exec()
        .then(doc => {
            console.log("From database",doc);
            if (doc){
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No valid entry found'});
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
            }
        );

});


router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Update product'

    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete product'

    });
});

module.exports = router;