/** This module defines the routes for pins using mongoose
 *
 * @author Johannes Konert
 * @licence MIT
 *
 * @module routes/pins
 * @type {Router}
 */


// modules
const express = require('express');
const logger = require('debug')('we2:pins');
const codes = require('../restapi/http-codes');
const HttpError = require('../restapi/http-error.js');

// TODO add here your require for your own model file
var pinModel = require('../models/pinModel.js');

var mg = require("mongoose");
mg.connect("mongodb://localhost/we2");

const pins = express.Router();

const storeKey = 'pins';

// routes **************
pins.route('/')
    .get((req, res, next) => {
        // TODO replace store and use mongoose/MongoDB
        //res.locals.items = store.select(storeKey);
        pinModel.find({},function (err,items) {
           if(err){
               err.status = 400;
               return next(err);
            }
            res.locals.processed = true;
            res.locals.items = items;
            logger("GET fetched items");
            next();
        });
    })
    .post((req,res,next) => {
        var pin = new pinModel(req.body)
        
        // TODO replace store and use mongoose/MongoDB
        // var result = store.insert(storeKey, req.body);

        pin.save(
            function(err) {
                if (err) {
                    err.status = 400;
                    return next(err);
                }

                res.status(codes.created); // 302
                res.locals.processed = true;
                res.locals.items = pin;
                next();
            }
        );

        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey, id);

        // res.locals.processed = true;
        // next();
    })
    .all((req, res, next) => {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            let err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

pins.route('/:id')
    .get((req, res,next) => {
        // TODO replace store and use mongoose/MongoDB
        // res.locals.items = store.select(storeKey, req.params.id);

        pinModel.findById( 
            req.params.id,
            (err, item) => {
                if (err) {
                    let err = new HttpError('Element with id' + req.params.id + " not in DB.",
                                            codes.notfound);
                }
                res.status(codes.success);
                res.json(item);
                res.locals.processed = true;
            }
        );
    })
    .put((req, res, next) => {

        // TODO replace store and use mongoose/MongoDB
        // store.replace(storeKey, req.body.id, req.body);

        // test for valid id
        logger("p id " + req.params.id);
        logger("b _id " + req.body._id);
        logger("p _id " + req.params._id);
        logger("b id " + req.body.id);

        if (req.body.id != undefined && req.params.id != req.body.id) 
        {
            let err = new HttpError("id in req and body don't match", codes.wrongrequest);
            return next(err);
        }
        if (req.body._id != undefined && req.params.id != req.body._id) 
        {
            let err = new HttpError("id in req and body don't match", codes.wrongrequest);
            return next(err);
        }

        if (req.body.timestamp != undefined) {
            logger("timestamp can't be modified.");
            delete req.body.timestamp;
        }
          if (req.body.__v != undefined) {
            logger("_v can't be modified.");
            delete req.body.__v;
        }

        //  PUT requires ID field
         pinModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {runValidators: true, new: true}, 
            (err, item) => {
                if (err) {
                    let err = new HttpError('Element with id ' + req.params.id + " not in DB.", 
                                            codes.notfound);
                    return next(err);
            }
            res.status(codes.success);
            res.json(item);
            res.locals.processed = true;
        });
    })
    .delete((req,res,next) => {
        // TODO replace store and use mongoose/MongoDB
        // store.remove(storeKey, id);

        pinModel.findByIdAndRemove( 
            req.params.id, 
            (err, item) => {
                if (err) {
                    let err = new HttpError('Element with id' + req.params.id + ' not found.', codes.notfound);
                    return next(err);
                }
                res.status(codes.success);
                res.json(item);
                res.locals.processed = true;
        });
    })

    // executes at the end
    .all((req, res, next) => {
        if (res.locals.processed) {
            next();
        } else {
            // reply with wrong method code 405
            let err = new HttpError('this method is not allowed at ' + req.originalUrl, codes.wrongmethod);
            next(err);
        }
    });

/**
 * This middleware would finally send any data that is in res.locals to the client (as JSON)
 * or, if nothing left, will send a 204.
 */
pins.use((req, res, next) => {
    if (res.locals.items) {
        res.json(res.locals.items);
        delete res.locals.items;
    } else if (res.locals.processed) {
        res.set('Content-Type', 'application/json'); // not really necessary if "no content"
        if (res.get('Status-Code') == undefined) { // maybe other code has set a better status code before
            res.status(204); // no content;
        }
        res.end();
    } else {
        next(); // will result in a 404 from app.js
    }
});

module.exports = pins;
