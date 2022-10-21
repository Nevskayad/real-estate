import { Link } from 'react-router-dom';
import rentImage from '../assets/jpg/img1.jpg';
import sellImage from '../assets/jpg/img2.jpg';

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Пошук</p>
      </header>

      <main>
        <p className="exploreCategoryHeading">Категорії</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img src={rentImage} alt="оренда" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Оренда квартир та домівок</p>
          </Link>
          <Link to="/category/sell">
            <img src={sellImage} alt="продаж" className="exploreCategoryImg" />
            <p className="exploreCategoryName">Продаж нерухомого майна</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
