import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import shareIcon from '../assets/svg/shareIcon.svg';

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <h3 className="loading">Загрузка...</h3>;
  }

  return (
    <main>
      {/*Slider */}

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="copy" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Посилання скопійовано</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name},{' '}
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          ₴
        </p>
        <div className="listingLocation">{listing.location}</div>
        <p className="listingType">
          {listing.type === 'rent' ? 'Оренда' : 'Продаж'}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            {listing.regularPrice - listing.discountedPrice}₴ знижка
          </p>
        )}

        <ul className="listingDetailsList">
          <li>{`Спальні кімнати: ${listing.bedrooms}`}</li>
          <li>{`Ванні кімнати: ${listing.bathrooms}`}</li>
          <li>{listing.parking && 'Є місце для парковки'}</li>
          <li>{listing.furnished && 'З меблями'}</li>
        </ul>

        <p className="listingLocationTitle">Місцезнаходження</p>

        {/* map */}

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Зв'язатися з {listing.type === 'rent' ? 'орендодавцем' : 'провацем'}
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
