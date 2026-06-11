const express = require("express");
const tareasRouter = require("./routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tareas", tareasRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API de tareas funcionando",
    endpoints: "/tareas",
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
  });
}

module.exports = app;
