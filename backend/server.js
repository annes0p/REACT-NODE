const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const BOOK_DB_PATH = path.join(__dirname, 'books.json');
const ORDER_DB_PATH = path.join(__dirname, 'orders.json');

app.use(cors());
app.use(express.json());

app.get('/api/books', (req, res) => {
    console.log('Peticion GET recibida en /api/books');
    fs.readFile(BOOK_DB_PATH, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer los libros'});
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/order', (req, res) => {
    console.log('Peticion POST recibida en /api/order');
    const newOrder = req.body;

    fs.readFile(ORDER_DB_PATH, 'utf-8', (err, data) =>{
        let order = [];
        if (!err && data) {
            try {
                orders = JSON.parse(data);
            } catch (parseErr) {
                order = [];
            }
        }
        
        newOrder.id = new Date().getTime();
        order.push(newOrder);

        fs.writeFile(ORDER_DB_PATH, JSON.stringify(order, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: 'Error al guardar la orden' });
            }
            res.status(201).json({ message: 'Orden guardada', order: newOrder });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});