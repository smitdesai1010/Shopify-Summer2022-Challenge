# Shopify-Summer2022-Challenge

[Read]() challenge description.
Additional feature: Push a button export product data to a CSV


Technologies used: Node.js, Express.js, Mongodb, POSTMAN, git, heroku


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

## How to use

- Once the program is running, go to http://localhost:4500/
- Use curl, Postman or any other API testing software to interact with the server
- Please view API Documentation (below) for more details

Results: 

Note: 
- The database contains 10 records, check 'Assets\products.json' file for product details
- Structure of products stored in inventory: 
```
{
    productID: {type: "integer"},
    productName: {type: "string"},
    productPrice: {type: "float"},
    productQty: {type: "integer"}
}
```
 
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
|/product/:id   | GET | None | JSON          | Details of requested product |

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


Possible Errors: 
- 400: "Invalid Request data" (if above given syntax is not followed)
- View the returned object for more information
</details>

<details>
<summary>DELETE</summary>
<br>

| URL | METHOD | BODY | RETURN | DESCRIPTION |
|-----|--------|------|--------|-------------|
|/product       | DELETE | None | None | Deletes every product |
|/product/:id   | DELETE | None | None | Deletes requested product |

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
|/product       | GET | None | String of CSV | CSV of every product |
|/product/:id   | GET | None | String of CSV | CSV of requested product |

Possible Errors: 
- 400: "Invalid Request data" (if above given syntax is not followed)
- 400: "Invalid ID"
- 404: "Requested resource not found"
- 500: "Internal Server Error"
</details>
