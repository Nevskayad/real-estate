import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const auth = getAuth();
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Мій профіль</p>
        <button type="button" onClick={onLogout} className="logOut">
          Вийти
        </button>
      </header>
    </div>
  );
}

export default Profile;
