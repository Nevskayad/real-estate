import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ height: '600px', margin: '1rem' }}
      >
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

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
        <p className="listingType listingType2">
          {listing.furnished && 'З меблями'}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            {listing.regularPrice - listing.discountedPrice}₴ знижка
          </p>
        )}

        <ul className="listingDetailsList">
          <li>{`Спальні кімнати: ${listing.bedrooms}`}</li>
          <li>{`Ванні кімнати: ${listing.bathrooms}`}</li>
          <li>{`Загальна площа: ${listing.totalArea}м2`}</li>
          <li>{listing.parking && 'Є місце для парковки'}</li>
          <li>{listing.furnished && 'З меблями'}</li>
        </ul>

        <p className="listingLocationTitle">Місцезнаходження</p>

        <div className="leafletContainer">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />

            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

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
