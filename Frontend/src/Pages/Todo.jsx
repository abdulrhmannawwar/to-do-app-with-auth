import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Todo.css";
import notepage from "../../Assets/notepage.jpg";
export default function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [editDetails, setEditDetails] = useState({
        editId: null,
        value: "",
    });
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const todosPerPage = 10;
    const totalPages = Math.ceil(todos.length / todosPerPage);
    async function getTodos() {
        try {
            const response = await fetch("http://localhost:5000/api/todos", {
                credentials: "include",
            });
            const data = await response.json();
            console.log(data.todos);
            setTodos(data.todos);
        } catch (err) {
            console.error(err);
        }
    }
    async function addTodo(title) {
        try {
            const data = await fetch("http://localhost:5000/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                }),
                credentials: "include",
            });
            const response = await data.json();
            console.log(response);
        } catch (err) {
            console.error(err);
        }
        getTodos();
    }
    async function updateTodo(id, updatedField) {
        try {
            const response = await fetch(
                `http://localhost:5000/api/todos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedField),
                    credentials: "include",
                }
            );

            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
        getTodos();
    }
    async function deleteTodo(id) {
        try {
            const data = await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const response = await data.json();
            console.log(response);
        } catch (err) {
            console.error(err);
        }
        getTodos();
    }
    async function logOut() {
        try {
            const res = await fetch("http://localhost:5000/api/logOut", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) navigate("/");
        } catch (err) {
            console.error(err);
        }
    }
    const handleAddTodo = (t) => {
        if (t.trim()) {
            addTodo(t);
            setError("");
            setShowInput(false);
            setTitle("");
        } else {
            setError("You need to enter something first");
        }
    };
    useEffect(() => {
        getTodos();
    }, []);
    return (
        <div>
            <img src={notepage} alt="" className="img" />
            <div className="img-overlay"></div>

            <div className="todos-container container">
                <div className="todos">
                    {!todos.length ? (
                        <div style={{ margin: "auto" }}>You have no todos</div>
                    ) : (
                        <>
                            {todos
                                .slice(
                                    (currentPage - 1) * todosPerPage,
                                    currentPage * todosPerPage
                                )
                                .map((todo) => (
                                    <div className="todo" key={todo._id}>
                                        <div className="buttons">
                                            <button
                                                title="Mark as done"
                                                className="done"
                                                onClick={() =>
                                                    updateTodo(todo._id, {
                                                        done: !todo.done,
                                                    })
                                                }
                                                style={{
                                                    backgroundColor: todo.done
                                                        ? "green"
                                                        : "",
                                                }}
                                            >
                                                <i className="fa-solid fa-square-check"></i>
                                            </button>
                                            <button
                                                title="Update"
                                                className="update"
                                                onClick={() =>
                                                    setEditDetails({
                                                        editId: todo._id,
                                                        value: todo.title,
                                                    })
                                                }
                                            >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button
                                                title="Delete"
                                                className="delete"
                                                onClick={() =>
                                                    deleteTodo(todo._id)
                                                }
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                        <div
                                            style={{
                                                "--title-length":
                                                    todo.title.length,
                                            }}
                                            className={`title ${
                                                todo.done ? "done" : ""
                                            }`}
                                        >
                                            {editDetails.editId === todo._id ? (
                                                <div className="edit-mode">
                                                    <input
                                                        type="text"
                                                        value={
                                                            editDetails.value
                                                        }
                                                        maxLength={45}
                                                        onChange={(e) =>
                                                            setEditDetails({
                                                                ...editDetails,
                                                                value: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                    <button
                                                        className="confirm"
                                                        onClick={() => {
                                                            updateTodo(
                                                                todo._id,
                                                                {
                                                                    title: editDetails.value,
                                                                }
                                                            );
                                                            setEditDetails({
                                                                editId: null,
                                                                value: "",
                                                            });
                                                        }}
                                                    >
                                                        ✔
                                                    </button>
                                                    <button
                                                        className="cancel"
                                                        onClick={() =>
                                                            setEditDetails({
                                                                editId: null,
                                                                value: "",
                                                            })
                                                        }
                                                    >
                                                        ✖
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>{todo.title}</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </>
                    )}
                </div>
                {showInput && (
                    <div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddTodo(title);
                            }}
                            className="add-process"
                        >
                            <div style={{ display: "flex" }}>
                                <button type="submit" className="confirm">
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTitle("");
                                        setShowInput(false);
                                        setError("");
                                    }}
                                    className="cancel"
                                >
                                    Cancel
                                </button>
                            </div>
                            <input
                                className="todo-input"
                                type="text"
                                maxLength={45}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </form>
                        <div style={{ color: "red", textAlign: "center" }}>
                            {error}
                        </div>
                    </div>
                )}
                <button
                    title="Add todos"
                    onClick={() => setShowInput(true)}
                    className="add-todo"
                >
                    +
                </button>
                {todos.length > 0 ? (
                    <div className="pagination">
                        <button
                            className="prev"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="next"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(p + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                ) : (
                    ""
                )}
                <button title="Log out" className="logout" onClick={logOut}>
                    Log out
                </button>
            </div>
        </div>
    );
}
