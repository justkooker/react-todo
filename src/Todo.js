import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { lazy, Suspense } from 'react';

import AddTodoBtn from 'components/AddTodoBtn/AddTodoBtn';
import Modal from 'components/Modal';
import TodoCreator from 'components/TodoCreator';
import TodoEditor from './components/TodoEditor';
import PrivatRoute from 'routes/PrivatRoute';
import RestrictedRoute from 'routes/RestrictedRoute';
import { setMobileView } from 'redux/features/todoSlice';
import routes from 'routes/routes';

import styles from './Todo.module.css';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-view" */)
);
const LoginView = lazy(() =>
  import('./views/LoginView' /* webpackChunkName: "login-view" */)
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "register-view" */)
);
const PageNotFoundView = lazy(() =>
  import(
    './views/PageNotFoundView' /* webpackChunkName: "page-not-found-view" */
  )
);

function Todo() {
  const showTodoCreator = useSelector(state => state.todoState.showTodoCreator);
  const showTodoEditor = useSelector(state => state.todoState.showTodoEditor);
  const mobileView = useSelector(state => state.todoState.mobileView);
  const isAuth = useSelector(state => state.authState.isAuth);
  const dispatch = useDispatch();
  const onResize = () => {
    window.onresize = () => {
      if (window.innerWidth < 768) {
        dispatch(setMobileView(true));
        return;
      }
      dispatch(setMobileView(false));
      return;
    };
  };
  useEffect(() => {
    onResize();
  }, []);
  return (
    <>
      {showTodoCreator && (
        <Modal>
          <TodoCreator />
        </Modal>
      )}
      {showTodoEditor && (
        <Modal>
          <TodoEditor />
        </Modal>
      )}
      {mobileView && isAuth && <AddTodoBtn />}
      <Suspense fallback={<p>loading...</p>}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivatRoute>
                <HomeView />
              </PrivatRoute>
            }
          />
          <Route
            path={routes.login}
            element={
              <RestrictedRoute>
                <LoginView />
              </RestrictedRoute>
            }
          />
          <Route
            path={routes.register}
            element={
              <RestrictedRoute>
                <RegisterView />
              </RestrictedRoute>
            }
          />
          <Route path={routes.notFound} element={<PageNotFoundView />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default Todo;
