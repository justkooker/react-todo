import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { filterTodo } from 'redux/features/todoSlice';
import { todoLogout } from 'redux/features/authSlice';
import routes from 'routes/routes';
import {
  completnessTodos,
  saveCompletedTodosToState,
} from 'redux/features/todoSlice';
import DropdownFilter from 'components/DropdownFilter/DropdownFilter';

import styles from './NavBar.module.css';
import AddTodoBtn from 'components/AddTodoBtn/AddTodoBtn';

const NavBar = function () {
  const isAuth = useSelector(state => state.authState.isAuth);
  const userName = useSelector(state => state.authState.user.name);

  const [filterValue, setFilterValue] = useState('');
  const [dropdownFilterStatus, setDropdownFilterStatus] = useState(false);
  const completenessInitialState = {
    completed: null,
    incompleted: null,
  };
  const mobileView = useSelector(state => state.todoState.mobileView);
  const [completeness, setCompleteness] = useState(completenessInitialState);
  const dispatch = useDispatch();
  const focusTarget = useRef();

  useEffect(() => {
    dispatch(filterTodo(''));
  }, []);
  useEffect(() => {
    dispatch(completnessTodos(completeness));
  }, [completeness]);

  const onHandleChange = e => {
    const { value } = e.target;
    setFilterValue(value);
    dispatch(filterTodo(value));
  };
  const droppdownDesktopFilterOn = () => {
    if (mobileView) {
      return;
    }
    setDropdownFilterStatus(true);
  };
  const droppdownFilterOff = () => {
    if (mobileView) {
      return;
    }
    setDropdownFilterStatus(false);
  };
  const droppdownMobileFilterOn = e => {
    if (!mobileView) {
      return;
    }

    setDropdownFilterStatus(true);
  };

  const filterByCompletness = data => {
    setCompleteness({
      ...completenessInitialState,
      ...data,
    });
  };
  const resetCompletnessFilter = e => {
    e.stopPropagation();
    setCompleteness(completenessInitialState);
    setDropdownFilterStatus(false);
    dispatch(saveCompletedTodosToState([]));
  };
  return (
    <header>
      {!mobileView && (
        <NavLink className={styles.logo} to={routes.home}>
          Todo List
        </NavLink>
      )}

      <div className={styles.navContainer}>
        <div className={styles.todoActions}>
          {!mobileView && <AddTodoBtn />}
          <div
            onPointerOver={droppdownDesktopFilterOn}
            onPointerOut={droppdownFilterOff}
            onClick={droppdownMobileFilterOn}
            className={styles.filterContainer}
          >
            <div ref={focusTarget} className={styles.filter}>
              filter
              {(completeness.completed || completeness.incompleted) && (
                <button
                  onClick={resetCompletnessFilter}
                  type="button"
                  className={styles.resetFilterBtn}
                ></button>
              )}
            </div>
            {dropdownFilterStatus && (
              <DropdownFilter
                filter={filterByCompletness}
                onClose={setDropdownFilterStatus}
                focusTarget={focusTarget}
              />
            )}
          </div>
        </div>
        <input
          onChange={onHandleChange}
          value={filterValue}
          placeholder="Search todo..."
        />
      </div>
      {!isAuth ? (
        <div className={styles.nav}>
          <NavLink to={routes.login}>login</NavLink>
          <NavLink to={routes.register}>register</NavLink>
        </div>
      ) : (
        <div
          className={styles.nav}
          style={{ width: `${userName.length - 2}vw` }}
        >
          <NavLink  className={styles.user} to={routes.user}>
            {userName.length > 8 ? `${userName.substring(0, 8)}...` : userName}
          </NavLink>
          <NavLink to={routes.home}>
            {mobileView ? (
              <button
                onClick={() => dispatch(todoLogout())}
                className={styles.logoutBtnMobile}
                type="button"
              ></button>
            ) : (
              <button
                onClick={() => dispatch(todoLogout())}
                className={styles.logoutBtn}
                type="button"
              >
                logout
              </button>
            )}
          </NavLink>
        </div>
      )}
    </header>
  );
};
export default NavBar;
