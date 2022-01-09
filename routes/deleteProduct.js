const mongodbUtil = require('../mongodbUtil.js')

module.exports = {
    delete: (req, res) => {

        query = {}

        if (req.params.id != undefined) {
            if (!Number.isInteger(req.params.id)) {
                res.status(400).send("Invalid ID")
                return
            }

            query = {_id: parseInt(req.params.id)}
        }
        
        mongodbUtil.getConnection 
        .then (db => {
            db.collection("Products").deleteMany(query, (error, response) => {

               console.log(response) 

               if (error) {
                    console.log(error);
                    res.status(400).send("Error in deleting, please try again later");
               }

               else {
                   if (!response.acknowledged) res.sendStatus(400)
                   else if (response.deletedCount == 0) res.sendStatus(404)
                   else res.status(200).send(response.deletedCount + " products deleted") 
               }

            });    
        })   
    }
}