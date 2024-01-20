export type Wish = {
    id?: number;
    wishlistId: number | undefined;
    name: string;
    price?: string;
    imageUrl?: string;
    link?: string;
    likes?:number;
    comment?: string;// Optional property for image
    // Add other properties as needed
};

export const defaultWishes: Wish[] = [{
    id: 1,
    wishlistId: 1,
    name: "One",
    price: "20",
    imageUrl: "",
    link: "",
    comment: ""// Optional p
},
    {
        id: 2,
        wishlistId: 1,
        name: "Two",
        price: "30",
        imageUrl: "",
        link: "",
        comment: ""// Optional p
    },
    {
        id: 1,
        wishlistId: 1,
        name: "One",
        price: "20",
        imageUrl: "",
        link: "",
        comment: ""// Optional p
    },
    {
        id: 1,
        wishlistId: 1,
        name: "One",
        price: "20",
        imageUrl: "",
        link: "",
        comment: ""// Optional p
    }
]