import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from 'components/NavBar';
import TodoList from 'components/TodoList';
import { todoCurrentUser } from 'redux/features/authSlice';
const HomeView = () => {
  const token = useSelector(state => state.authState.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(todoCurrentUser(token));
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <TodoList />
    </>
  );
};
export default HomeView;
