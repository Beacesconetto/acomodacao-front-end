import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AccommodationCard = ({ accommodation }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => state.accommodations.favorites.includes(accommodation.id));

  const toggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: accommodation.id });
  };

  return (
    <div className="accommodation-card">
      <img src={accommodation.image} alt={accommodation.name} />
      <h3>{accommodation.name}</h3>
      <p>{accommodation.price}</p>
      <p>{accommodation.location}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default AccommodationCard;
