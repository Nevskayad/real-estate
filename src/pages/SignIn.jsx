import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibility from '../assets/svg/visibility.svg';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = () => {};

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">З поверненням!</p>
        </header>

        <main>
          <form>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />

            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                className="passwordInput"
                placeholder="Пароль"
                id="password"
                value={password}
                onChange={onChange}
              />

              <img
                src={visibility}
                alt="показати пароль"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>

            <Link to="/forgot-password" className="forgotPasswordLink">
              Забули пароль?
            </Link>

            <div className="signInBar">
              <p className="signInText">Увійти</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffdab9" width="34px" height="34px" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignIn;
