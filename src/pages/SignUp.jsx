import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UpdateProfile,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/arrow.svg';
import visibility from '../assets/svg/visibility.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Помилка реєстрації');
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">З поверненням!</p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput"
              placeholder="Ваше Ім'я"
              id="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
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

            <div className="signUpBar">
              <p className="signUpText">Зареєструватися</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#ffdab9" width="34px" height="34px" />
              </button>
            </div>
          </form>
          <Link to="/sign-in" className="registerLink">
            Увійти
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
