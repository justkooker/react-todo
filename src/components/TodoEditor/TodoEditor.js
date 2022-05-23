import { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalTodoEditor, editTodo,getAllTodos } from 'redux/features/todoSlice';
import commonStyles from '../../commonStyles/todoFormStyles.module.css'
const TodoEditor = () => {
  const dispatch = useDispatch();
  const editDescription = useSelector(state => state.todoState.editDescription);
  const todos = useSelector(state => state.todoState.todos);
  const todoToEdit = todos.find(todo => todo._id === editDescription._id);
  const [description, setDescription] = useState(todoToEdit.description);
  const onFormSubmit = e => {
    e.preventDefault();
    const _id = editDescription._id;
    const update = {
      toUpdate: { description: description },
      _id,
    };
    dispatch(editTodo(update));
    dispatch(toggleModalTodoEditor());
  };
  const onChangeInput = e => {
    setDescription(e.target.value);
  };
  const closeTodoEditorByEsc = e => {
    if (e.code === 'Escape') {
      dispatch(toggleModalTodoEditor());
    }
  };
  const closeTodoEditorByCancelBtn = e => {
    dispatch(toggleModalTodoEditor());
  };
  useEffect(() => {
    window.addEventListener('keydown', closeTodoEditorByEsc);
    return () => {
      window.removeEventListener('keydown', closeTodoEditorByEsc);
      dispatch(getAllTodos());
    };
  }, []);
  return (
    <form onSubmit={onFormSubmit} className={commonStyles.todoCreatorForm}>
      <textarea onChange={onChangeInput} type="text" value={description}  className={commonStyles.description} />
      <div className={commonStyles.btnContainer}>
      <button
          onClick={closeTodoEditorByCancelBtn}
          className={commonStyles.cancelBtn}
          type="button"
        >
          cancel
        </button>
      <button type="submit" className={commonStyles.submitBtn}>apply changes</button>
      </div>
    </form>
  );
};
export default TodoEditor;
