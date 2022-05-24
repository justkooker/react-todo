import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  toggleModalTodoCreator,
  addTodoDb,
  getAllTodos,
} from 'redux/features/todoSlice';
import styles from '../../commonStyles/todoFormStyles.module.css';
const TodoCreator = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    description: '',
  });
  const handleChangeText = e => {
    const { name, value } = e.target;
    setTodo({ [name]: value });
  };
  const closeTodoCreatorByEsc = e => {
    if (e.code === 'Escape') {
      dispatch(toggleModalTodoCreator());
    }
  };
  const closeTodoCreaterByCancelBtn = e => {
    dispatch(toggleModalTodoCreator());
  };
  const onHandleSubmit = e => {
    e.preventDefault();
    dispatch(addTodoDb(todo));
    dispatch(toggleModalTodoCreator());
  };
  useEffect(() => {
    window.addEventListener('keydown', closeTodoCreatorByEsc);
    return () => {
      window.removeEventListener('keydown', closeTodoCreatorByEsc);
      dispatch(getAllTodos());
    };
  }, []);

  return (
    <form onSubmit={onHandleSubmit} className={styles.todoCreatorForm}>
      <textarea
        onChange={handleChangeText}
        name="description"
        className={styles.description}
        value={todo.description}
      />
      <div className={styles.btnContainer}>
        <button
          onClick={closeTodoCreaterByCancelBtn}
          className={styles.cancelBtn}
          type="button"
        >
          cancel
        </button>
        <button className={styles.submitBtn} type="submit">
          add todo
        </button>
      </div>
    </form>
  );
};
export default TodoCreator;
