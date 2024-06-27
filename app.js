const express = require("express");
const db = require("./db");


const app = express();


app.use(express.text());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Pagina de Inicio");
});


app.get("/Producto", (req, res) => {
  res.json(db);
});

app.get("/Producto/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const getProductos = db.find((productos) => productos.id === id);
  res.json(getProductos);
});


app.post("/Producto", (req, res) => {
  const { id, productos, quantity, price } = req.body;

      const newProducto = db.push({ id: id, productos: productos, quantity:quantity, price:price});
    console.log(newProducto);
    res.json({ message: "Producto creado con éxito" });
  });
 

app.put("/Producto/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { productos, price } = req.body;
  const{quantity} = req.body
  const getProductos = db.find((productos, quantity, price) => productos.id === id);
  const getQuantity = db.find((quantity) => quantity.id === id);
  const getPrice = db.find((price) => price.id === id);


  getProductos.productos = productos;
  console.log(getProductos);
  getQuantity.quantity = quantity;
  console.log(getQuantity)
  getPrice.price = price;
  console.log(getPrice)
  res.json({ message: "Producto actualizado" });
});

app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const getProductos = db.find((productos) => productos.id === id);
  const ProductosIndex = db.indexOf(getProductos);
  const deletedProductos = db.splice(productosIndex, 1);

  res.json({ message: "Producto eliminado", deletedProductos });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor en puerto ${PORT}`));
﻿
