# Shopify-Summer2022-Challenge

[Read](https://github.com/smitdesai1010/Shopify-Summer2022-Challenge/blob/main/Assets/Shopify%20Backend%20Developer%20Intern%20Challenge%20-%20Summer%202022.pdf) challenge description.
Additional feature: Push a button export product data to a CSV


Technologies used: Node.js, Express.js, Mongodb, POSTMAN, git, heroku

## Heroku Hosted Server

https://shopify-is-awesome.herokuapp.com/

Note: 
- The production database contains 10 records, check 'Assets\products.json' file for product details
- Structure of products stored in inventory: 
```
{
      productID:    {type: "integer", maximum: 1000000, exclusiveMinimum: 0},
      productName:  {type: "string", minLength: 2, maxLength: 100},
      productPrice: {type: "number", maximum: 1000000, exclusiveMinimum: 0},
      productQty:   {type: "integer", maximum: 5000, minimum: 0}
}
```


## Run Locally

Install node and npm
```
https://nodejs.org/en/download/
```

Clone the project

```
git clone https://github.com/smitdesai1010/Shopify-Summer2022-Challenge.git
```

Go to the project directory

```
npm install     
npm start   
```

Once the program is running, go to http://localhost:4500/

## How to use

- Go to the server URL 
  - If you are using locally, go to http://localhost:4500/
  - If you are using the heroku hosted server, go to https://shopify-is-awesome.herokuapp.com/
- Use curl, Postman or any other API testing software to interact with the server
- Please view [API Documentation](https://github.com/smitdesai1010/Shopify-Summer2022-Challenge#api-documentation) for more details

## Results

Note: These results are tested on Windows locally and may differ as they are tested using the development database.

<details>
  <summary>CREATE</summary>
  <br>

  ```
  curl -X POST http://localhost:4500/product/  -H "Content-Type: application/json" -d "[{\"productID\":1234,\"productName\":\"Apple\"},{\"productID\":4321,\"productName\":\"TV\",\"productPrice\":2000,\"productQty\":793,\"Smit\":123},{\"productID\":1111,\"productName\":\"Laptop\",\"productPrice\":1500,\"productQty\":624},{\"productID\":2222,\"productName\":\"Computer\",\"productPrice\":3000,\"productQty\":2534},{\"productID\":5555,\"productName\":\"Apple 13 Pro Max\",\"productPrice\":1200.5,\"productQty\":432},{\"productID\":\"asd888asd8\",\"productName\":\"Cloth bag\",\"productPrice\":0.89,\"productQty\":24},{\"productID\":9999,\"productName\":\"Galaxy buds pro\",\"productPrice\":189.5,\"productQty\":634},{\"productID\":0,\"productName\":\"Cricket bat\",\"productPrice\":45,\"productQty\":32},{\"productID\":6789,\"productName\":\"Yoga mat\",\"productPrice\":5.534,\"productQty\":12},{\"productID\":1010,\"productName\":\"BMW i8\",\"productPrice\":346346,\"productQty\":45678}]"


  {
    "inserted": [
        1111,
        5555,
        2222
    ],
    "cannotInsert": [],
    "duplicateInsertion": [
        9999,
        0,
        1010,
        6789
    ],
    "invalidFormat": [
        {
            "_id": 1234,
            "errMsg": "Product at index 0 is invalid: must have required property 'productPrice'"
        },
        {
            "_id": 4321,
            "errMsg": "Product at index 1 is invalid: must NOT have additional properties"
        },
        {
            "_id": "asd888asd8",
            "errMsg": "Product at index 5 is invalid: must be integer"
        }
    ]
  }
  ```

</details>

<details>
  <summary>READ</summary>
  <br>

  ```
  curl -X GET http://localhost:4500/product/4321

  [
    {
        "_id": 4321,
        "productName": "TV",
        "productPrice": 2000,
        "productQty": 793
    }
  ]
  ```

  ```
  curl -X GET http://localhost:4500/product/

  [{"_id":4321,"productName":"TV","productPrice":2000,"productQty":793},{"_id":8888,"productName":"Cloth bag","productPrice":0.89,"productQty":24},{"_id":23,"productName":"Cricket bat","productPrice":45,"productQty":32},{"_id":1010,"productName":"BMW i8","productPrice":346346,"productQty":45678}]
  ```

</details>

<details>
  <summary>UPDATE</summary>
  <br>

  ```
  curl -X POST http://localhost:4500/product/ -H "Content-Type: application/json" -d "[{\"productID\":1234,\"productName\":\"Apple\"},{\"productID\":4321,\"productName\":\"TV\",\"productPrice\":2000,\"productQty\":793,\"Smit\":123},{\"productID\":\"qwe1111123\",\"productName\":\"Laptop\",\"productPrice\":1500,\"productQty\":624},{\"productID\":2222,\"productName\":\"PC\",\"productPrice\":3000,\"productQty\":2534},{\"productID\":5555,\"productName\":\"Apple 13 Pro Max\",\"productPrice\":10.5,\"productQty\":432},{\"productID\":\"asd888asd8\",\"productName\":\"Cloth bag\",\"productPrice\":0.89,\"productQty\":24},{\"productID\":9999,\"productName\":\"Galaxy buds pro\",\"productPrice\":189.5,\"productQty\":634123}]"
  
  {
    "updated": [
        1234,
        2222,
        5555,
        9999
    ],
    "notFound": [],
    "cannotUpdate": [],
    "invalidFormat": [
        {
            "_id": 4321,
            "errMsg": "Product at index 1 is invalid: must NOT have additional properties"
        },
        {
            "_id": "qwe1111123",
            "errMsg": "Product at index 2 is invalid: must be integer"
        },
        {
            "_id": "asd888asd8",
            "errMsg": "Product at index 5 is invalid: must be integer"
        }
    ]
  } 
  
  ```
</details>


<details>
  <summary>DELETE</summary>
  <br>

  ```
  curl -X DELETE http://localhost:4500/product/4321

  "1 products deleted"
  ```

  ```
  curl -X DELETE http://localhost:4500/product/
  "3 products deleted"
  ```

</details>

<details>
  <summary>CSV</summary>
  <br>

  ```
  curl -X GET http://localhost:4500/product2csv/4321

  "ID","Name","Price","Quantity"
  4321,"TV",2000,793
  ```

  ```
  curl -X GET http://localhost:4500/product2csv/

  "ID","Name","Price","Quantity"
  4321,"TV",2000,793
  8888,"Cloth bag",0.89,24
  23,"Cricket bat",45,32
  1010,"BMW i8",346346,45678
  ```

</details>


 
## API Documentation

<details>
<summary>CREATE</summary>
<br>

| URL | METHOD | BODY | RETURN | DESCRIPTION |
|-----|--------|------|--------|-------------|
|/product | POST | JSON or Array of JSON | JSON | Accepts JSON of product details outlined by the schema and returns the outcome of insertion |

Schema: 
```
{
    type: "object",
    properties: {
      productID: {type: "integer"},
      productName: {type: "string"},
      productPrice: {type: "number"},
      productQty: {type: "integer"}
    },
    required: ["productID","productName","productPrice","productQty"],
    additionalProperties: false,
}
```

Example: 
```
[
    {
        "productID": 1234,
        "productName": "Apple",
        "productPrice": 2.5,
        "productQty": 120
    },

    {
        "productID": 4321,
        "productName": "TV",
        "productPrice": 2000,
        "productQty": 793
    },
]
```


Return: 
```
 {
    "inserted": [],
    "cannotInsert": [],
    "duplicateInsertion": [],
    "invalidFormat": [
        {
            "_id":
            "errMsg": 
        }
    ]
  }

  inserted: List of ProductIDs that were sucessfully inserted
  cannotInsert: List of ProductIDs that couldn't be inserted due to server error
  duplicateInsertion: List of ProductIDs that were already inserted into the database
  invalidFormat: List of ProductIDs that had invalidFormat
```


Possible Errors: 
- 400: "Invalid Request data" (if above given syntax is not followed)
- View the returned object for more information
</details>


<details>
<summary>READ</summary>
<br>

| URL | METHOD | BODY | RETURN | DESCRIPTION |
|-----|--------|------|--------|-------------|
|/product       | GET | None | Array of JSON | Details of every product |
|/product/:id   | GET | None | Array of JSON | Details of requested product |

Possible Errors: 
- 400: "Invalid Request data" (if above given syntax is not followed)
- 400: "Invalid ID"
- 404: "Requested resource not found"
- 500: "Internal Server Error"
</details>

<details>
<summary>UPDATE</summary>
<br>

| URL | METHOD | BODY | RETURN | DESCRIPTION |
|-----|--------|------|--------|-------------|
|/product | PUT | JSON or Array of JSON | JSON | Accepts JSON of product details outlined by the schema and returns the outcome of updation |

Schema: 

```
{
    type: "object",
    properties: {
      productID: {type: "integer"},
      productName: {type: "string"},
      productPrice: {type: "number"},
      productQty: {type: "integer"}
    },
    required: ["productID"],
    additionalProperties: false,
}
```

Example: 
```
[
    {
        "productID": 1234,
        "productName": "Red Fruit",
        "productQty": 90
    },

    {
        "productID": 4321,
        "productQty": 1234
    },
]
```


Return: 
```
  {
    "updated": [],                 
    "notFound": [],
    "cannotUpdate": [],
    "invalidFormat": [
        {
            "_id":
            "errMsg": 
        }
    ]
  }

  Updated: List of ProductIDs that were sucessfully updated
  notFound: List of ProductIDs that were not found
  cannotUpdate: List of ProductIDs that couldn't be updated due to server error
  invalidFormat: List of ProductIDs that had invalidFormat
```


Possible Errors: 
- 400: "Invalid Request data" (if above given syntax is not followed)
- View the returned object for more information
</details>

<details>
<summary>DELETE</summary>
<br>

| URL | METHOD | BODY | RETURN | DESCRIPTION |
|-----|--------|------|--------|-------------|
|/product       | DELETE | None | String | Deletes every product; returns the number of products deleted|
|/product/:id   | DELETE | None | String | Deletes requested product; returns the number of products deleted| |

Possible Errors: 
- 400: "Invalid Request data" (if above given syntax is not followed)
- 400: "Invalid ID"
- 400: "Delete request was not acknowledged by the database"
- 404: "Requested resource not found"
- 500: "Internal Server Error"
</details>

<details>
<summary>CSV</summary>
<br>

| URL | METHOD | BODY | RETURN | DESCRIPTION |
|-----|--------|------|--------|-------------|
|/product2csv       | GET | None | String of CSV | CSV of every product |
|/product2csv/:id   | GET | None | String of CSV | CSV of requested product |

Possible Errors: 
- 400: "Invalid Request data" (if above given syntax is not followed)
- 400: "Invalid ID"
- 404: "Requested resource not found"
- 500: "Internal Server Error"
</details>
