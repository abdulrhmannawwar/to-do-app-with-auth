const Todo = require("../Models/Todo");

module.exports.getTodos = async (req, res) => {
    try {
        const id = req.user.id;
        const todos = await Todo.find({ user: id });
        res.status(200).json({ todos });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports.addTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;

        const newTodo = await Todo.create({
            title,
            done: false,
            user: userId,
        });

        res.status(201).json({ message: "Todo created", newTodo });
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
            user: req.user,
        });
    }
};

module.exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, done } = req.body;
        const userId = req.user.id;
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            { title, done },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res
                .status(404)
                .json({ message: "Todo not found or not yours" });
        }
        res.status(200).json({ message: "Todo updated", updatedTodo });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({
            message: "Todo deleted successfully",
            deletedTodo,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
