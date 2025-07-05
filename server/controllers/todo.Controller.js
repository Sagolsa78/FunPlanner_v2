import Todo from "../models/todo.model.js";

// Get all todos for the logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { text, priority } = req.body;

    const newTodo = await Todo.create({
      userId: req.user._id,
      text,
      priority: priority || "normal",
    });

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Toggle completion status
export const toggleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo || !todo.userId.equals(req.user._id)) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle todo" });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo || !todo.userId.equals(req.user._id)) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
