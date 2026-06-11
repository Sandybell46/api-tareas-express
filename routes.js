const express = require("express");
const tareas = require("./data");

const router = express.Router();

function buscarTarea(id) {
  return tareas.find((tarea) => tarea.id === id);
}

function validarTarea(datos, actualizacion = false) {
  const camposObligatorios = ["titulo", "descripcion", "completada"];

  if (!actualizacion) {
    const campoFaltante = camposObligatorios.find(
      (campo) => datos[campo] === undefined
    );

    if (campoFaltante) {
      return `El campo '${campoFaltante}' es obligatorio`;
    }
  }

  if (datos.titulo !== undefined && typeof datos.titulo !== "string") {
    return "El campo 'titulo' debe ser texto";
  }

  if (
    datos.descripcion !== undefined &&
    typeof datos.descripcion !== "string"
  ) {
    return "El campo 'descripcion' debe ser texto";
  }

  if (datos.completada !== undefined && typeof datos.completada !== "boolean") {
    return "El campo 'completada' debe ser boolean";
  }

  return null;
}

router.get("/", (req, res) => {
  res.status(200).json(tareas);
});

router.get("/:id", (req, res) => {
  const tarea = buscarTarea(Number(req.params.id));

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.status(200).json(tarea);
});

router.post("/", (req, res) => {
  const error = validarTarea(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map((tarea) => tarea.id)) + 1 : 1,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    completada: req.body.completada,
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

router.put("/:id", (req, res) => {
  const tarea = buscarTarea(Number(req.params.id));

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const error = validarTarea(req.body, true);

  if (error) {
    return res.status(400).json({ error });
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Debes enviar al menos un campo" });
  }

  const camposPermitidos = ["titulo", "descripcion", "completada"];
  camposPermitidos.forEach((campo) => {
    if (req.body[campo] !== undefined) {
      tarea[campo] = req.body[campo];
    }
  });

  res.status(200).json(tarea);
});

router.delete("/:id", (req, res) => {
  const indice = tareas.findIndex((tarea) => tarea.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const tareaEliminada = tareas.splice(indice, 1)[0];
  res.status(200).json({
    mensaje: "Tarea eliminada correctamente",
    tarea: tareaEliminada,
  });
});

module.exports = router;
