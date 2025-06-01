import { useEffect, useState } from 'react';
import Todo from '../Todo/Todo';

function TodosList() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [completedOnly, setCompletedOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setTodos(data);
      setLoading(false);
    };
    fetchTodos();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (value.length > 20) {
      setError('Search input is too long (max 20 characters).');
      return;
    }

    if (value.trim() !== '' && value.length < 3) {
      setError('Please enter at least 3 characters.');
    } else {
      setError('');
    }

    setSearch(value);
  };

  const filteredTodos = error
    ? []
    : todos.filter((todo) => {
        const title = todo.title.toLowerCase().includes(search.toLowerCase());
        const completion = completedOnly ? todo.completed : true;
        return title && completion;
      });

  const completedCount = filteredTodos.filter((todo) => todo.completed).length;
  const incompleteCount = filteredTodos.length - completedCount;

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo List</h2>
      <div className="todo-filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          // onChange={(e) => setSearch(e.target.value)}
          onChange={handleSearchChange}
          className="todo-search"
        />
        <label className="todo-checkbox-label">
          <input
            type="checkbox"
            checked={completedOnly}
            onChange={() => setCompletedOnly((prev) => !prev)}
            className="custom-checkbox"
          />
          Show only completed
        </label>
      </div>
      {error && <p className="todo-error">{error}</p>}
      <div className="todo-stats">
        <p>✅ Completed: {completedCount}</p>
        <p>❌ Incomplete: {incompleteCount}</p>
      </div>

      {loading ? (
        <p className="todo-loading">Loading...</p>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}



export default TodosList;
