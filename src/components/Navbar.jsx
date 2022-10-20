import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../assets/svg/offer.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/explore.svg';
import { ReactComponent as PersonIcon } from '../assets/svg/person.svg';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/')}>
            <ExploreIcon
              fill={pathMatchRoute('/') ? '#f08080' : '#fbc4ab'}
              width="36px"
              heigth="36px"
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Пошук
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/offers')}>
            <OfferIcon
              fill={pathMatchRoute('/offers') ? '#f08080' : '#fbc4ab'}
              width="36px"
              heigth="36px"
            />
            <p
              className={
                pathMatchRoute('/offers')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Пропозиції
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonIcon
              fill={pathMatchRoute('/profile') ? '#f08080' : '#fbc4ab'}
              width="36px"
              heigth="36px"
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Профіль
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
