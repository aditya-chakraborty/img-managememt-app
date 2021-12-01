import { configureStore } from '@reduxjs/toolkit';
import gallerySlice from './images-slice';

const store = configureStore({
    reducer: {gallery: gallerySlice.reducer}
});

export default store;
