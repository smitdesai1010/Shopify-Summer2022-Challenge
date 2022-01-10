const mongodbUtil = require('../mongodbUtil.js')
const { Parser } = require('json2csv');

const fields = [ 
    {
        label: "ID",
        value: "_id"
    }, {
        label: "Name",
        value: "productName"
    }, {
        label: "Price",
        value: "productPrice"
    }, {
        label: "Quantity",
        value: "productQty"
    }
]

const json2csvParser = new Parser({ fields });


module.exports = {
    CSV: (req, res) => {

        query = {}

        //check if id is present or not, if not, send back all results
        //check if id is valid or not, if not, return 400: bad request
        if (req.params.id != undefined) {
            if (!Number.isInteger(parseInt(req.params.id))) {
                res.set('Content-Type', 'text/plain')
                res.status(400).send("Invalid ID")
                return
            }

            query = {_id: parseInt(req.params.id)}
        }

        mongodbUtil.getConnection 
        .then (db => {
            db.collection("Products").find(query).toArray(function(error, result) {
               if (error) {
                    console.log(error);
                    res.set('Content-Type', 'text/plain')
                    res.status(500).send("Error in retrieving data, please try again later");
               }

               else {
                    if (result.length == 0) res.sendStatus(404) //no matching result found

                   else {
                        const csv = json2csvParser.parse(result);
                        res.set('Content-Type', 'application/json')
                        res.status(200).send(csv) 
                   }
               }
            })   
        })
        .catch(err => {
            console.log('Error in getting connection: ', err)
            res.set('Content-Type', 'text/plain')
            res.status(500).send('Please view server logs for more details')
        })   
    }
}