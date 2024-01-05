export type Wish = {
    id?: string;
    wishlistId: number | undefined;
    name: string;
    price?: string;
    imageUrl?: string;
    link?: string;
    comment?: string;// Optional property for image
    // Add other properties as needed
};