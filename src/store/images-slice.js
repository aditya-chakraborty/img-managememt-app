import { createSlice } from '@reduxjs/toolkit';
const galleryInitialState = { images: [], searchTerm: "", selectAll: false, isSelected: false };

const gallerySlice = createSlice({
    name: 'gallery',
    initialState : galleryInitialState,
    reducers : {
        addImgToGallery(state, action) {
            const newImg = action.payload;
            const existingImg = state.images.find(img=> img.id === newImg.id);

            if(!existingImg) {
                state.images.push({
                    id: newImg.id,
                    url: newImg.url,
                    name: newImg.name,
                    description: newImg.description,
                    height: newImg.height,
                    width: newImg.width,
                    date: newImg.date,
                    isChecked: newImg.isChecked
                });
            }
        },
        removeImgFromGallery(state, action) {
            state.images = state.images.filter(img => img.isChecked !== true);
        },
        updateSelectAll(state) {
            state.selectAll = !state.selectAll;
                
            if(state.selectAll) {
                state.images.forEach(img => img.isChecked = true);
            } else {
                state.images.forEach(img => img.isChecked = false);
            }
            state.isSelected = state.images.some(img => img.isChecked === true);
        },

        updateSearchTerm(state, action) {
            const searchTerm = action.payload;
            state.searchTerm = searchTerm;
        },

        updateImgToSelected(state, action) {
            const id = action.payload;
            const existingImg = state.images.find(img => img.id === id);
            existingImg.isChecked = !existingImg.isChecked;
            state.isSelected = state.images.some(img => img.isChecked === true);
        },
        sortByTitle(state) {
            state.images = state.images.sort((imgA, imgB) => {
                if(imgA.description === null) return -1;
                else if(imgB.description === null) return 1;
                else {
                    return imgA.description.split(' ')[0] - imgB.description.split(' ')[0];
                }
                
            })
        },
        sortByDate(state) {
            state.images = state.images.sort((imgA, imgB) => new Date(imgA.date) - new Date(imgB.date));
        },
        sortBySize(state) {
            state.images = state.images.sort((imgA, imgB) => (imgA.height * imgA.width) - (imgB.height * imgB.width));
        }
    }
})
export const galleryActions = gallerySlice.actions;
export default gallerySlice;