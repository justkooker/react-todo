import { useDispatch, useSelector } from 'react-redux';
import { toggleModalTodoCreator } from 'redux/features/todoSlice';
import styles from './AddTodoBtn.module.css';
const AddTodoBtn = () => {
  const dispatch = useDispatch();
  const mobileView = useSelector(state => state.todoState.mobileView);
  return (
    <button
      onClick={() => dispatch(toggleModalTodoCreator())}
      type="button"
      className={styles.addTodoBtn}
    >
      {!mobileView && 'add todo'}
    </button>
  );
};
export default AddTodoBtn;
