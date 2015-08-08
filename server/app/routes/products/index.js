"use strict";
var router = require("express").Router();
require("../../../db/models");
var mongoose = require("mongoose");
module.exports = router;
var Product = mongoose.model("Product");

router.param("productId", function(req, res, next, productId) {
    Product.findById(productId).exec()
        .then(function(product) {
            if (!product) res.send(404);
            else {
                req.product = product;
                next();
            }
        }, function(err) {
            console.log(err);
            res.send(404);
        })
        .then(null, next);
});

//get all products
router.get("/", function(req, res) {
    if(req.query.category) req.query.category = JSON.parse(req.query.category)
    Product.find(req.query)
        .populate({
            path: 'seller',
            select: 'storeName'
        })
        .exec().then(function (products) {
        res.json(products)
    }, function(err){
        res.send(err)
    })
});

// add a products
router.post("/", function(req, res) {
    Product.create(req.body)
        .then(function(product) {
            res.status(201).json(product);
        }, function(err){
            console.log(err);
            res.send(err)
        });
});

// get single product
router.get("/:productId", function(req, res) {
    res.json(req.product);
});

// update single product
router.put('/:productId', function(req, res, next) {
    for (var key in req.body) {
        req.product[key] = req.body[key];
    }
    req.product.save()
        .then(function(product) {
            res.json(product);
        })
        .then(null, next);
});

// delete productId
router.delete("/:productId", function(req, res, next) {
    req.product.remove()
        .then(function() {
            res.status(204).end();
        })
        .then(null, next);
});
