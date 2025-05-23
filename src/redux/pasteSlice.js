import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
const initialState = {
    pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
};

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPastes(state, action) {
            const exists = state.pastes.some(p => p._id === action.payload._id);
            if (exists) {
                toast.error("Paste already exists!");
                return;
            }
           const paste = action.payload;
           state.pastes.push(paste);
           localStorage.setItem('pastes', JSON.stringify(state.pastes));
        },
        updateToPastes(state, action) {
          const idx = state.pastes.findIndex(p => p._id === action.payload._id);
          if (idx !== -1) {
            state.pastes[idx] = action.payload;
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast.success("Paste Updated Successfully!");
          }
        },
        resetAllPastes(state) {
           state.pastes = [];
           localStorage.removeItem('pastes');
           toast.success("All pastes removed successfully!");
        },
        removeFromPastes(state, action) {
          const pasteId = action.payload;
          state.pastes = state.pastes.filter(paste => paste._id !== pasteId);
          localStorage.setItem('pastes', JSON.stringify(state.pastes));
          toast.success("Paste Removed Successfully!");
        },
    },
});

export const {
    addToPastes,
    updateToPastes,
    resetAllPastes,
    removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;