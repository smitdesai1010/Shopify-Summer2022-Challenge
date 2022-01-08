const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://smit1010:"+process.env.MONGODB_PASSWORD+"@cluster0.u7uth.mongodb.net/Shopify-Inventory?retryWrites=true&w=majority";

let collection = null;

module.exports = {
  getConnection: new Promise((resolve, reject) => {
    
    if (collection) resolve(collection)
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
      if (err) {
        console.error('Error in connecting to the database: ', err)
        reject(err);
        process.exit(1);
      }

      console.log('Connected to database successfully')
      collection = client.db('Shopify-Inventory').collections("Products");
      resolve(collection)
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