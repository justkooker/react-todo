import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { todoRegister } from 'redux/features/authSlice';
import routes from 'routes/routes';

import 'react-toastify/dist/ReactToastify.css';
import commonStyles from 'commonStyles/authFormStyles.module.css';
const RegisterView = () => {
  const dispatch = useDispatch();
  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordVerification: '',
    age: '',
  };
  const [user, setUser] = useState(initialState);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const handleChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    formVerification();
  };
  const formNotification = e => {
    e.preventDefault();
    const { name, email, age, password, passwordVerification } = user;

    if (password !== passwordVerification) {
      setUser({ ...user, password: '', passwordVerification: '' });
      toast('Passwords do not match');
      return;
    }
    if (name.length < 4) {
      toast('Too short name');
      return;
    }
    if (!email.includes('@')) {
      toast("Email must contain '@'");
      return;
    }
    if (age < 18) {
      toast('You are not yet 18 years old');
      return;
    }
  };
  const formVerification = () => {
    const { name, email, age, password, passwordVerification } = user;

    if (password !== passwordVerification) {
      setDisabledBtn(true);
      return;
    }
    if (name.length < 3) {
      setDisabledBtn(true);
      return;
    }
    if (!email.includes('@')) {
      setDisabledBtn(true);
      return;
    }
    if (age < 18) {
      setDisabledBtn(true);
      return;
    }
    setDisabledBtn(false);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    formVerification();
    dispatch(todoRegister(user));
    setUser(initialState);
  };
  return (
    <form
      onSubmit={disabledBtn ? formNotification : onFormSubmit}
      className={commonStyles.form}
    >
      <h1 className={commonStyles.capture}>registration</h1>
      <input
        onChange={handleChangeInput}
        className={commonStyles.name}
        name="name"
        value={user.name}
        placeholder=" Name"
      />
      <input
        onChange={handleChangeInput}
        className={commonStyles.email}
        name="email"
        value={user.email}
        placeholder=" Email"
      />
      <input
        onChange={handleChangeInput}
        className={commonStyles.password}
        name="password"
        type="password"
        value={user.password}
        placeholder=" Password"
      />
      <input
        onChange={handleChangeInput}
        className={commonStyles.password}
        name="passwordVerification"
        type="password"
        value={user.passwordVerification}
        placeholder=" Password verification"
      />
      <input
        onChange={handleChangeInput}
        className={commonStyles.age}
        name="age"
        type="number"
        value={user.age}
        placeholder=" Age"
      />
      <button className={commonStyles.submitBtn} type="submit">
        register
      </button>
      <NavLink className={commonStyles.loginLink} to={routes.login}>
        <button className={commonStyles.linkBtn}>login</button>
      </NavLink>
      <ToastContainer />
    </form>
  );
};
export default RegisterView;
