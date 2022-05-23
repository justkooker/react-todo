import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { todoLogin } from 'redux/features/authSlice';
import routes from 'routes/routes';
import commonStyles from '../../commonStyles/authFormStyles.module.css';
const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    email: '',
    password: '',
  };
  const [credentials, setCredentials] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = credentials;
  const handleChangeInput = e => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(todoLogin(credentials));
    setCredentials(initialState);
    navigate('/', { replace: true });
  };
  const changeShowPasswordInput = e => {
    setShowPassword(e.target.checked);
  };
  return (
    <>
      <form className={commonStyles.form} onSubmit={onFormSubmit}>
        <h1 className={commonStyles.capture}>login</h1>
        <input
          onChange={handleChangeInput}
          type="text"
          name="email"
          value={email}
          className={commonStyles.email}
          placeholder=" Email"
        />
        <input
          className={commonStyles.password}
          onChange={handleChangeInput}
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          placeholder=" Password"
        />
        <label className={commonStyles.labelCheckPass}>
          show password
          <input
            className={commonStyles.checkPass}
            onChange={changeShowPasswordInput}
            type="checkbox"
            value={showPassword}
          />
        </label>
        <button className={commonStyles.submitBtn} type="submit">
          login
        </button>
        <NavLink className={commonStyles.registerLink} to={routes.register}>
          <button className={commonStyles.linkBtn}>registration</button>
        </NavLink>
      </form>
    </>
  );
};
export default LoginView;
