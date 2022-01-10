const mongodbUtil = require('../mongodbUtil.js')
const Ajv = require('ajv')
const ajv = new Ajv()

module.exports = {
    add: (req, res) => {
        let products = req.body

        if (!(products.constructor === Array)) {
            products = [products]
        }

        let invalidFormat = []
        let insertedEntries = [];
        let duplicateInsertion = [];
        let cannotInsert = [];
        let reqProcessed = products.length;

        //Get Mongodb connection and add the products
        mongodbUtil.getConnection 
        .then (db => {
            for (let index = 0; index < products.length; ++index) {
                const validate = ajv.compile(mongodbUtil.addDocumentSchema)
                const valid = validate(products[index])

                if (!valid) { 
                    invalidFormat.push({
                        _id: products[index].productID,
                        errMsg: 'Product at index ' + index + ' is invalid: ' + validate.errors[0].message
                    })
                    --reqProcessed;
                    if (reqProcessed == 0) {  //all callbacks have invoked
                        let msg = {
                            "inserted": insertedEntries,
                            "cannotInsert": cannotInsert,
                            "duplicateInsertion": duplicateInsertion,
                            "invalidFormat": invalidFormat
                        }
                        console.log(msg)
                        res.set('Content-Type', 'application/json')
                        res.status(400).send(msg);
                    }

                    continue;
                }

                //renaming productID to the default unique key to automatically handle duplicate insertions 
                products[index]._id = products[index].productID
                delete products[index]["productID"]
            
                db.collection("Products").insertOne(products[index], (error, response) => {
                    if (error) {
                        if (error.code == 11000) duplicateInsertion.push(products[index]._id)
                        else cannotInsert.push(products[index]._id)
                    }
        
                    else insertedEntries.push(products[index]._id)
    
                    --reqProcessed
    
                    if (reqProcessed == 0) {
                        let msg = {
                            "inserted": insertedEntries,
                            "cannotInsert": cannotInsert,
                            "duplicateInsertion": duplicateInsertion,
                            "invalidFormat": invalidFormat
                        }
    
                        console.log(msg)
                        res.set('Content-Type', 'application/json')
                        res.status(200).send(msg)
                    }
                });    
            
            }
        })
        .catch(err => {
            console.log('Error in getting connection: ', err)
            res.set('Content-Type', 'text/plain')
            res.status(500).send('Please view server logs for more details')        
        })  

    }
}