const mongodbUtil = require('../mongodbUtil.js')

module.exports = {
    viewOne: async (req, res) => {
        collection = await mongodbUtil.getConnection
        console.log(collection)        
        res.send('GET ONE')
    },
    
    viewAll: (req, res) => {
        res.send('GET ALL')
    }
}