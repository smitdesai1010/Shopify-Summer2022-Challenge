require('dotenv').config({path:'.env'})

const express = require('express');
const addProduct = require('./routes/addProduct.js')
const viewProduct = require('./routes/viewProduct.js')
const updateProduct = require('./routes/updateProduct.js')
const deleteProduct = require('./routes/deleteProduct.js')
const getCSV = require('./routes/getCSV.js')

const app = express();
const PORT = process.env.PORT || 4500;

//if users uploads a string invalid data format
app.use(express.json())
app.use((err, req, res, next) => {
    if (err) {
      console.log('Invalid Request data')
      res.status(400).send('Invalid Request data')
    } 
    else {
      next()
    }
})

// Add a big Try catch block
// make sure add n update res doesn't fail
// make repo public
// Specify return types

//Create
app.post('/product', addProduct.add)

//Read
app.get('/product', viewProduct.view)
app.get('/product/:id', viewProduct.view)

//Update
app.put('/product', updateProduct.update)

//Delete
app.delete('/product', deleteProduct.delete)
app.delete('/product/:id', deleteProduct.delete)

//CSV
app.get('/product2csv', getCSV.CSV)
app.get('/product2csv/:id', getCSV.CSV)



app.all('*',(req,res) => {
    res.send('This is a invalid route');
})

app.listen(PORT, () => console.log('Server connected at:', `localhost:${PORT}`));
