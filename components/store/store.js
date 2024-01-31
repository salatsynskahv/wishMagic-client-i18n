import {configureStore} from "@reduxjs/toolkit";
import wishlistsSlice from "@/components/store/slices/wishlistSlice";
import {wishlistApi} from "./wishlistApi";
import {setupListeners} from "@reduxjs/toolkit/query";
// import { getUserWishlists} from "@/components/services/api/WishlistService";
//
//
// const preloadedState =  async () => {
//     try {
//         const result= await getUserWishlists();
//         const wishlists = result;
//         console.log(wishlists);
//         return { wishlist: { wishlists } };
//     } catch (error) {
//         console.error('Error fetching wishlists:', error);
//         return undefined;
//     }
// };



const store = configureStore({
    reducer: {
        wishlist: wishlistsSlice,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(wishlistApi.middleware)

    // preloadedState: preloadedState(),
});

setupListeners(store.dispatch);




export default store;