import {configureStore} from "@reduxjs/toolkit";
import wishlistsSlice from "@/components/store/slices/wishlistSlice";
// import { getUserWishlist} from "@/components/services/api/WishlistService";
//
//
// const preloadedState =  async () => {
//     try {
//         const result= await getUserWishlist();
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
    },
    // preloadedState: preloadedState(),
});




export default store;