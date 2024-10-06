const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '127.0.0.1',  // Corrección del host
  user: 'root',        // Usuario de MySQL 
  password: '',        // Contraseña de MySQL 
  database: 'user'     // Nombre de la base de datos correcta
});

// Conexión a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta GET para obtener todos los usuarios de la tabla userdata
app.get('/id', (req, res) => {
  connection.query('SELECT * FROM userdata', (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// Ruta POST para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { id, email, contraseña } = req.body;  // Datos recibidos del cliente
  
  // Consulta SQL para insertar en la tabla
  const query = `INSERT INTO userdata (id, email, contraseña) VALUES (?, ?, ?)`;
  
  // Ejecución de la consulta con los parámetros
  connection.query(query, [id, email, contraseña], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Usuario creado con éxito', id: results.insertId });
    }
  });
});

// Iniciando el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
