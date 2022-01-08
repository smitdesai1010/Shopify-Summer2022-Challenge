const mongodbUtil = require('../mongodbUtil.js')
const Ajv = require('ajv')
const ajv = new Ajv()

module.exports = {
    add: (req, res) => {
        products = req.body

        if (!(products.constructor === Array)) {
            products = [products]
        }

        let validData = true;

        products.forEach((product, index) => {
            const validate = ajv.compile(mongodbUtil.documentSchema)
            const valid = validate(product)
            if (!valid) { 
                let errMsg = 'Product at index ' + index + ' is invalid: ' + validate.errors[0].message
                console.error(errMsg)
                res.status(400).send(errMsg)
                validData = false;
                return;
            }

            //check if already exists
            //http 409: 
        })

        if (!validData) return;

    }
}