const mongodbUtil = require('../mongodbUtil.js')
const { Parser } = require('json2csv');
const json2csvParser = new Parser();

module.exports = {
    CSV: (req, res) => {

        query = {}

        if (req.params.id != undefined) {
            if (!Number.isInteger(parseInt(req.params.id))) {
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
                    res.status(400).send("Error in retrieving data, please try again later");
               }

               else {
                   if (result.length == 0) res.sendStatus(404)

                   else {
                    const csv = json2csvParser.parse(result);
                    res.status(200).send(csv) 
                   }
               }
              })   
        })   
    }
}