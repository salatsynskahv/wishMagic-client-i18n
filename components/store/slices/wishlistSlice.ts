import {createSlice} from '@reduxjs/toolkit'
import Wishlist from "@/types/Wishlist";


export const wishlistsSlice = createSlice({
    name: 'wishlists',
    initialState: {
        wishlists: [] as Wishlist[],
    },
    reducers: {
        init: (state, action) => {
            state.wishlists = action.payload.wishlists
        },
        add: (state, action) => {
            state.wishlists = [...state.wishlists, action.payload.wishlist];
        },
        addWish: (state, action) => {
            const {wishlistId, wish} = action.payload;
            state.wishlists = state.wishlists.map((wishlist) => {
                if (wishlist.id != wishlistId) return wishlist;
                let newWishes;
                if (wishlist.wishes) {
                    newWishes = [...wishlist.wishes, wish]
                } else {
                    newWishes = [wish];
                }
                return {
                    ...wishlist,
                    wishes: newWishes,
                }
            })
        },

        remove: (state, action) => {
            state.wishlists = state.wishlists.filter(wishlist => wishlist.id !== action.payload.id);
        },
    },
})

// Action creators are generated for each case reducer function
export const {init, add, remove, addWish} = wishlistsSlice.actions

export default wishlistsSlice.reducer