import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTodo,
  deleteTodoFromDb,
  toggleModalTodoEditor,
  todoEditorHandler,
  getCompletedTodos,
  getAllTodos,
} from 'redux/features/todoSlice';
import styles from './TodoList.module.css';
const TodoList = () => {
  const todos = useSelector(state => state.todoState.todos);
  const filterValue = useSelector(state => state.todoState.filter);
  const completedTodos = useSelector(state => state.todoState.completedTodos);
  const completenessTodos = useSelector(state => state.todoState.completness);
  const dispatch = useDispatch();
  useEffect(() => {
    if (completenessTodos.completed === 'on') {
      dispatch(getCompletedTodos('true'));
    } else if (completenessTodos.incompleted === 'on') {
      dispatch(getCompletedTodos('false'));
    } else if (
      completenessTodos.completed !== 'on' &&
      completenessTodos.incompleted !== 'on'
    ) {
      dispatch(getAllTodos());
    }
  }, [completenessTodos.completed, completenessTodos.incompleted]);
  const completeTodo = (e, _id) => {
    const checked = e.target.checked;
    const update = {
      toUpdate: { completed: checked },
      _id,
    };
    dispatch(updateTodo(update));
  };
  let visibleTodos;
  {
    !completenessTodos.completed && !completenessTodos.incompleted
      ? (visibleTodos = todos.filter(todo =>
          todo.description.includes(filterValue)
        ))
      : (visibleTodos = completedTodos.filter(todo =>
          todo.description.includes(filterValue)
        ));
  }
  const timeFormater = data => {
    const date = data
      .substring(0, data.length - 5)
      .split('T')
      .join('  ');
    return date;
  };
  const edit = (_id, description) => {
    dispatch(todoEditorHandler(_id, description));
    dispatch(toggleModalTodoEditor());
  };
  return (
    <ul className={styles.todoList}>
      {visibleTodos.length !== 0 &&
        visibleTodos.map(({ _id, completed, createdAt, description }) => (
          <li
            key={_id}
            className={styles.container}
            style={{
              boxShadow: `0 0 10px 1px ${completed ? 'green' : 'red'}`,
              backgroundColor: completed
                ? `rgba(0, 128, 0, 0.5)`
                : 'rgba(255, 0, 0, 0.5)',
            }}
          >
            <div className={styles.completedBar}></div>
            <p className={styles.createdAt}>{timeFormater(createdAt)}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.btnContainer}>
              <button
                onClick={() => edit({ _id, description })}
                type="button"
                className={styles.editBtn}
              ></button>
              <label className={styles.completeLabel}>
                <input
                  onChange={e => completeTodo(e, _id)}
                  type="checkbox"
                  checked={completed}
                  className={styles.completeInput}
                />
              </label>
              <button
                onClick={() => dispatch(deleteTodoFromDb(_id))}
                type="button"
                className={styles.deleteBtn}
              ></button>
            </div>
          </li>
        ))}
    </ul>
  );
};
export default TodoList;
