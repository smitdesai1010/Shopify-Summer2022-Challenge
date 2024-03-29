const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://smit1010:FdwN6ePA732KddwU@cluster0.u7uth.mongodb.net/Shopify-Inventory?retryWrites=true&w=majority";

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

  addDocumentSchema: {
    type: "object",
    properties: {
      productID: {type: "integer", maximum: 1000000, exclusiveMinimum: 0},
      productName: {type: "string", minLength: 2, maxLength: 100},
      productPrice: {type: "number", maximum: 1000000, exclusiveMinimum: 0},
      productQty: {type: "integer", maximum: 5000, minimum: 0}
    },
    required: ["productID","productName","productPrice","productQty"],
    additionalProperties: false,
  },

  updateDocumentSchema: {
    type: "object",
    properties: {
      productID: {type: "integer", maximum: 1000000, exclusiveMinimum: 0},
      productName: {type: "string", minLength: 2, maxLength: 100},
      productPrice: {type: "number", maximum: 1000000, exclusiveMinimum: 0},
      productQty: {type: "integer", maximum: 5000, minimum: 0}
    },
    required: ["productID"],
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

  https://ajv.js.org/json-schema.html#keywords-for-numbers
*/