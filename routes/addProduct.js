const mongodbUtil = require('../mongodbUtil.js')
const Ajv = require('ajv')
const ajv = new Ajv()

module.exports = {
    add: async (req, res) => {
        let products = req.body
        const db = await mongodbUtil.getConnection    

        if (!(products.constructor === Array)) {
            products = [products]
        }

        for (let index = 0; index < products.length; ++index) {
            const validate = ajv.compile(mongodbUtil.documentSchema)
            const valid = validate(products[index])

            if (!valid) { 
                let errMsg = 'Product at index ' + index + ' is invalid: ' + validate.errors[0].message + '\nNo entries inserted into the database'
                console.error(errMsg)
                res.status(400).send(errMsg)
                return;
            }

            //renaming productID to the default unique key to automatically handle duplicate insertions 
            products[index]._id = products[index].productID
            delete products[index]["productID"]
        }

        db.collection("Products").insertMany(products, (error, response) => {
            if (error) {
                if (error.code == 11000) {
                    let errMsg = "Duplicate entry on productID: " + JSON.stringify(error.writeErrors[0].err.op) + '\nFollow up product details are not inserted into the database'
                    console.log(errMsg)
                    res.status(409).send(errMsg)
                }

                else {
                    res.status(400).send('Unable to insert into Database, please try again later')
                }
            }

            else console.log("Document inserted");
        });

    }
}