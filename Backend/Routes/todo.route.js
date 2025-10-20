const router = require("express").Router();
const authMiddleware = require("../Middleware/auth.middleware");
const {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} = require("../Controllers/todo.controller");

router.use(authMiddleware);
router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

module.exports = router;
