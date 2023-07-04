import React, { useEffect, useState } from 'react';
import { db } from './firebase';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const unsubscribe = db.collection('todos').onSnapshot((snapshot) => {
      const todoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTodos(todoList);
    });

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, [setTodos]);
    
  const addTodo = () => {
    db.collection('todos').add({
      title: newTodo,
      completed: false
    });
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    db.collection('todos').doc(id).delete();
  };

  const toggleComplete = (id, completed) => {
    db.collection('todos')
      .doc(id)
      .update({ completed: !completed })
      .then(() => {
        console.log('Todo updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              onClick={() => toggleComplete(todo.id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoList;
