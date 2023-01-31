const { Router } = require("express");
const router = Router();
const productoController = require("../controllers/productoControler")

router.post("/", productoController.crearProducto);
router.get("/", productoController.obtenerProductos);
router.put("/:id", productoController.actualizarProductos);
router.get("/:id", productoController.obtenerProducto);
router.delete("/:id", productoController.eliminarProducto);

module.exports = router;