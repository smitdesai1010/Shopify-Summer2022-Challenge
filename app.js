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
    res.sendFile(__dirname + '/Assets/index.html');
})

app.listen(PORT, () => console.log('Server connected at:', `localhost:${PORT}`));
