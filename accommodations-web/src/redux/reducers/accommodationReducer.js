const initialState = {
    accommodations: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  };
  
  const accommodationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_ACCOMMODATIONS':
        return { ...state, accommodations: action.payload };
      case 'TOGGLE_FAVORITE':
        const updatedFavorites = state.favorites.includes(action.payload)
          ? state.favorites.filter(item => item !== action.payload)
          : [...state.favorites, action.payload];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return { ...state, favorites: updatedFavorites };
      default:
        return state;
    }
  };
  
  export default accommodationReducer;
  