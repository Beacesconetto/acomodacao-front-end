import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccommodations = createAsyncThunk(
  "accommodations/fetchAccommodations",
  async () => {
    const response = await fetch("http://localhost:8000/acomodacoes");
    return await response.json();
  }
);

const initialState = {
  accommodations: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const accommodationSlice = createSlice({
  name: "accommodations",
  initialState,
  reducers: {
    addAccommodation: (state, action) => {
      state.accommodations.push(action.payload);
    },
    toggleFavorite: (state, action) => {
      const updatedFavorites = state.favorites.includes(action.payload)
        ? state.favorites.filter((item) => item !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      state.favorites = updatedFavorites;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccommodations.fulfilled, (state, action) => {
      state.accommodations = action.payload;
    });
  },
});

export const { addAccommodation, toggleFavorite } = accommodationSlice.actions;
export default accommodationSlice.reducer;
