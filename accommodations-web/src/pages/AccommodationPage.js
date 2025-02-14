// src/pages/AccommodationPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccommodationPage = () => {
  const { id } = useParams();
  const accommodations = useSelector(state => state.accommodations.accommodations);
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    if (accommodations.length > 0) {
      const foundAccommodation = accommodations.find(acc => acc.id === parseInt(id));
      setAccommodation(foundAccommodation);
    }
  }, [accommodations, id]);

  if (!accommodation) {
    return <div>Loading...</div>; // Exibe "Loading..." até encontrar a acomodação
  }

  return (
    <div className="accommodation-detail">
      <img src={accommodation.image} alt={accommodation.name} />
      <h2>{accommodation.name}</h2>
      <p>{accommodation.description}</p>
      <p>{accommodation.price}</p>
      <p>{accommodation.location}</p>
    </div>
  );
};

export default AccommodationPage;
