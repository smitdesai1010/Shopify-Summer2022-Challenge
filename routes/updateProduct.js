const mongodbUtil = require('../mongodbUtil.js')
const Ajv = require('ajv')
const ajv = new Ajv()

module.exports = {
    update: (req, res) => {
        let products = req.body

        if (!(products.constructor === Array)) {
            products = [products]
        }

        for (let index = 0; index < products.length; ++index) {
            const validate = ajv.compile(mongodbUtil.updateDocumentSchema)
            const valid = validate(products[index])

            if (!valid) { 
                let errMsg = 'Product at index ' + index + ' is invalid: ' + validate.errors[0].message + '\nNo entries inserted into the database'
                console.error(errMsg)
                res.status(400).send(errMsg)
                return;
            }

            //renaming productID to the default unique key to automatically handle duplicate insertions 
            let query = { _id: products[index].productID } 
            delete products[index]["productID"]
            
            newVal = { $set: products[index] }

            mongodbUtil.getConnection 
            .then (db => {
                db.collection("Products").updateOne(query, newVal, (error, response) => {
                    if (error || response.matchedCount == 0) { 
                        console.log('Document does not exist')
                    }
                });
            })
        }
        
        console.log("Document updated");
        res.sendStatus(200)
    }
}