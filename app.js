const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  res.json(db.getAllProducts());
});


app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = db.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

app.post('/products', (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || quantity === undefined || price === undefined) {
    return res.status(400).send('complete todos campos');
  }
  const newProduct = db.addProduct({ name, quantity, price });
  res.status(201).json(newProduct);
});


app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, quantity, price } = req.body;
  const updatedProduct = db.updateProduct(id, { name, quantity, price });
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(403).send('Producto no encontrado');
  }
});


app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = db.deleteProduct(id);
  if (success) {
    res.status(205).send();
  } else {
    res.status(403).send('Producto no encontrado');
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});