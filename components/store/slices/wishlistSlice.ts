import {createSlice} from '@reduxjs/toolkit'
import Wishlist from "@/types/Wishlist";


export const wishlistsSlice = createSlice({
    name: 'wishlists',
    initialState: {
        wishlists: [] as Wishlist[],
    },
    reducers: {
        init: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.wishlists = action.payload.wishlists
        },
        add: (state, action) => {
            state.wishlists.push(action.payload.wishlist);
        },
        addWish: (state, action) => {
            const {wishlistId, wish} = action.payload;
            const wishlist = state.wishlists.find(w => w.id === wishlistId);

            if (wishlist) {
                if (!wishlist.wishes) {
                    wishlist.wishes = [];
                }
                wishlist.wishes.push(wish);
            }
        },
        remove: (state, action) => {
            state.wishlists = state.wishlists.filter(wishlist => wishlist.id !== action.payload.id);
        },
    },
})

// Action creators are generated for each case reducer function
export const {init, add, remove, addWish} = wishlistsSlice.actions

export default wishlistsSlice.reducer