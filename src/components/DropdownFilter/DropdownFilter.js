import { useEffect, useRef } from 'react';
import styles from './DropdownFilter.module.css';
const DropdownFilter = ({ filter, onClose, focusTarget }) => {
  const completedRef = useRef();
  const incompletedRef = useRef();
  const isSelected = e => {
    const id = e.target.id;
    const value = e.target.value;
    filter({ [id]: value });
    onClose(false);
  };
  const closeOnClick = e => {
    console.log(e)
    if (
      e.target === completedRef.current ||
      e.target === incompletedRef.current ||
      e.target === focusTarget.current
    ) {
      onClose(true);
      return;
    }
    onClose(false);
  };
  useEffect(() => {
    window.addEventListener('click', closeOnClick);
    return () => window.removeEventListener('click', closeOnClick);
  }, []);
  return (
    <div className={styles.container}>
      <label ref={completedRef} className={styles.filterLabel}>
        comleted todos
        <input
          onChange={isSelected}
          className={styles.filterInput}
          id="completed"
          type="radio"
          name="completness"
        />
      </label>
      <label ref={incompletedRef} className={styles.filterLabel}>
        incomleted todos
        <input
          onChange={isSelected}
          className={styles.filterInput}
          id="incompleted"
          type="radio"
          name="completness"
        />
      </label>
    </div>
  );
};
export default DropdownFilter;
