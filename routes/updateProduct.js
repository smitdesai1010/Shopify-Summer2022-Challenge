const mongodbUtil = require('../mongodbUtil.js')
const Ajv = require('ajv')
const ajv = new Ajv()

module.exports = {
    update: (req, res) => {
        let products = req.body

        if (!(products.constructor === Array)) {
            products = [products]
        }

        let invalidFormat = []
        let updated = [];
        let notFound = [];
        let cannotUpdate = [];
        let reqProcessed = products.length;


        mongodbUtil.getConnection  
        .then (db => {

            for (let index = 0; index < products.length; ++index) {

                const validate = ajv.compile(mongodbUtil.updateDocumentSchema)
                const valid = validate(products[index])

                //If not valid, then donot call the database
                if (!valid) {       
                    invalidFormat.push({
                        _id: products[index].productID,
                        errMsg: 'Product at index ' + index + ' is invalid: ' + validate.errors[0].message
                    })
                    --reqProcessed;
                    
                    if (reqProcessed == 0) {  //all request processed
                        let msg = {
                            "updated": updated,
                            "notFound": notFound,
                            "cannotUpdate": cannotUpdate,
                            "invalidFormat": invalidFormat
                        };
                
                        console.log(msg)
                        res.set('Content-Type', 'application/json')
                        res.status(400).send(msg);
                    }

                    continue;
                }

                
                //Make the query
                let query = { _id: products[index].productID } 
                delete products[index]["productID"]     //since _id cannot be updated
                newVal = { $set: products[index] }

                //updating every single product
                db.collection("Products").updateOne(query, newVal, (error, response) => {
                    if (error) cannotUpdate.push(query._id)
                    else if (response.matchedCount == 0) notFound.push(query._id)
                    else updated.push(query._id)

                    --reqProcessed

                    if (reqProcessed == 0) {  //all callbacks have invoked
                        let msg = {
                            "updated": updated,
                            "notFound": notFound,
                            "cannotUpdate": cannotUpdate,
                            "invalidFormat": invalidFormat
                        };
                
                        console.log(msg)
                        res.set('Content-Type', 'application/json')
                        res.status(200).send(msg);
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