import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/arrow.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Лист відправлено');
    } catch (error) {
      toast.error('Не вдалося надіслати');
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Забули пароль?</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to="/sign-in">
            Увійти
          </Link>

          <div className="signInBar">
            <div className="signInText">
              Надіслати лист для відновлення пароля
            </div>
            <button className="signInButton">
              <ArrowRightIcon width="34px" height="34px" fill="#ffdab9" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
