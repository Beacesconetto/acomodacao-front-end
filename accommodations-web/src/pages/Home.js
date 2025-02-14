import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../redux/actions/accommodationActions';
import AccommodationCard from '../components/AccommodationCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector(state => state.accommodations.accommodations);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAccommodations(accommodations);
  }, [accommodations]);

  const handleSearch = (searchTerm) => {
    setFilteredAccommodations(
      accommodations.filter(accommodation =>
        accommodation.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="accommodation-list">
        {filteredAccommodations.map(accommodation => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
      </div>
    </div>
  );
};

export default Home;
