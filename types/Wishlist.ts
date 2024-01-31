import {Wish} from "@/types/Wish";

type Wishlist = {
    id: number;
    userId: number;
    title: string;
    createdAt?: string;
    isPrivate?: boolean;
    status?: string;
    wishes: Wish[];
};

export default Wishlist;
