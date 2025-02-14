import axios from 'axios';

export const fetchAccommodations = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/acomodacoes');
    dispatch({
      type: 'FETCH_ACCOMMODATIONS',
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};