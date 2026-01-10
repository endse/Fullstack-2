'use client';

import { useState } from 'react';

export default function Page() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { text: task.trim(), completed: false }]);
    setTask('');
  };

  const toggleTodo = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(135deg, #f5f7fa 0%, #e4e8ee 100%)',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: '360px',
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          animation: 'fadeIn 0.4s ease-in-out',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '22px',
            fontWeight: 600,
            color: '#1f2937',
          }}
        >
          To-Do List
        </h2>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Enter a task"
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              fontSize: '14px',
              outline: 'none',
            }}
          />

          <button
            onClick={addTodo}
            style={{
              padding: '10px 16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: '#6b7280',
              fontSize: '14px',
            }}
          >
            No tasks added yet
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {todos.map((todo, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 6px',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                  />

                  <span
                    style={{
                      marginLeft: '10px',
                      fontSize: '14px',
                      color: todo.completed ? '#6b7280' : '#111827',
                      textDecoration: todo.completed
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTodo(index)}
                  aria-label="Delete task"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '16px',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
