const mongodbUtil = require('../mongodbUtil.js')

module.exports = {
    delete: (req, res) => {

        query = {}
        
        //check if id is present or not, if not, delete all results
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
            db.collection("Products").deleteMany(query, (error, response) => {

               if (error) {
                    console.log(error);
                    res.set('Content-Type', 'text/plain')
                    res.status(500).send("Error in deleting, please try again later");
               }

               else {
                   if (!response.acknowledged) res.sendStatus(400)  //delete request was not acknowledged, return 400: bad request
                   else if (response.deletedCount == 0) res.sendStatus(404) //did not found any matching data
                   else res.set('Content-Type', 'text/plain').status(200).send(response.deletedCount + " products deleted") 
               }

            });    
        }) 
        .catch(err => {
            console.log('Error in getting connection: ', err)
            res.set('Content-Type', 'text/plain')
            res.status(500).send('Please view server logs for more details')
        })  
    }
}