function Todo({ todo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : 'incomplete'}`}>
      <span>{todo.title}</span>
      <span>{todo.completed ? '✅' : '❌'}</span>
    </li>
  );
}

export default Todo;