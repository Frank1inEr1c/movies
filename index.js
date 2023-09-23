const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();

app.use(express.json());

app.get("/movies/search", async (req, res) => {
  try {
    const query = req.query.q;

    // Construye la URL de la API de OMDB con los parámetros
    const apiUrl = `${process.env.OMDB_API_URL}?i=${query}&apikey=${process.env.OMDB_API_KEY}`;

    // Hacer una solicitud a la API de OMDB utilizando Axios
    const response = await axios.get(apiUrl);

    // Devolver la respuesta de la API al cliente
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error al consultar la API:", error.message);
    res.status(500).json({ error: "Error al consultar la API" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
