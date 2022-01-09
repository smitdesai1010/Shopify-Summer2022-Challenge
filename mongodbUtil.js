const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://smit1010:"+process.env.MONGODB_PASSWORD+"@cluster0.u7uth.mongodb.net/Shopify-Inventory?retryWrites=true&w=majority";

let database = null;


module.exports = {
  getConnection: new Promise((resolve, reject) => {
    
    if (database) resolve(database)
    
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      database = db.db("Shopify-Inventory");
      console.log('Connected to database successfully')
      resolve(database)
    });
  }),

  documentSchema: {
    type: "object",
    properties: {
      productID: {type: "integer"},
      productName: {type: "string"},
      productPrice: {type: "number"},
      ProductQty: {type: "integer"}
    },
    required: ["productID","productName","productPrice","ProductQty"],
    additionalProperties: false,
  }
}

/*
  Document structure: 
  {
    productID
    productName
    productPrice
    ProductQty
  }
*/