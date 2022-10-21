import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Отримати посилання
        const listingsRef = collection(db, 'listings');

        //Створити запит
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        //Виконати запит
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Виникла помилка. Будь ласка, спробуйте ще раз');
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Пропозиції</p>
      </header>

      {loading ? (
        <h3 className="loading">Загрузка...</h3>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>Нажаль, немає актуальних пропозицій</p>
      )}
    </div>
  );
}

export default Offers;
