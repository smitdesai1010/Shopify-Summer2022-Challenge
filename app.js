require('dotenv').config({path:'.env'})

const express = require('express');
const addProduct = require('./routes/addProduct.js')
const viewProduct = require('./routes/viewProduct.js')
const updateProduct = require('./routes/updateProduct.js')
const deleteProduct = require('./routes/deleteProduct.js')

const app = express();
const PORT = process.env.PORT || 4500;

//what if users uploads a string ?
app.use(express.json())

//Create
app.post('/product', addProduct.add)

//Read
app.get('/product', viewProduct.viewAll)
app.get('/product/:id', viewProduct.viewOne)

//Update
app.put('/product', updateProduct.update)

//Delete
app.delete('/product', deleteProduct.deleteAll)
app.delete('/product/:id', deleteProduct.deleteOne)

//CSV
// app.get('/product/csv', )
// app.get('/product/csv/:id',)

app.all('*',(req,res) => {
    res.send('This is a invalid route');
})

app.listen(PORT, () => console.log('Server connected at:', `localhost:${PORT}`));
