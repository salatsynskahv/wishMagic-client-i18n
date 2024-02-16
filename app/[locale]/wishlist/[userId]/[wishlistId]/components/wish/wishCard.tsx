import {Wish} from "@/types/Wish";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import React, {useState} from "react";
import {BsCheckCircle, BsPencilSquare, BsXCircle} from "react-icons/bs";
import {useTranslations} from "next-intl";
import {deleteWishRequest, disLikeWishRequest, likeWishRequest} from "@/components/services/api/WishService";
import Wishlist from "@/types/Wishlist";
import Image from "next/image";

export const WishCard = ({userId, wishItem, selectWish, setWishlist}: {
    userId: string
    wishItem: Wish,
    selectWish: any,
    setWishlist: React.Dispatch<React.SetStateAction<Wishlist>>
}) => {
    const [like, setLike] = useState<boolean>((!!wishItem.likes && wishItem.likes.filter(like => like.userId.toString() === userId).length > 0));
    const [localWish, setLocalWish] = useState(wishItem);
    //todo: rewrite
    const handleLike = () => {
        if (!like) {
            likeWishRequest(wishItem.id, userId)
                .then(
                    (res) => {
                        setLocalWish(res.data);
                        setLike(prev => !prev);
                    });
        } else {
            const like = localWish.likes?.filter(like => like.userId.toString() === userId)[0];
            if (like) {
                disLikeWishRequest(like.id).then(
                    (res) => {
                        setLike(prev => !prev);
                        setLocalWish(res.data);
                    }
                )
            }
        }
    }

    const handleDelete = () => {
        // return deleteWishRequest(wishItem.id)
        //     .then(
        //         (res) => {
        //             const wish = res.data;
                    setWishlist((prev) => {
                        return {...prev, wishes: prev.wishes.filter(item => item.id !== wishItem.id)};
                    });
            //     }
            // )
            // .catch(
            //     (error) => {
            //         console.log(error);
            //     }
            // )
    }

    function formatName(name: string): string {
        if (name.length > 30) {
            return name.split(" ").slice(0, 8).join(" ") + "...";
        }
        return name;
    }

    const t = useTranslations('Wishlists');

    return (
        <div className="wish">
            <div className="flex justify-end w-full gap-1.5 mb-2">
                <button
                    className="text-gray-600"
                    onClick={() => selectWish(localWish)}
                >
                    <BsPencilSquare/>
                </button>
                <BsXCircle onClick={handleDelete}/>
            </div>
            {
                <Image
                    className="w-[100%] h-[60%]"
                    width={200}
                    height={300}
                    style={{objectFit: "cover"}}
                    src={wishItem.imageUrl || 'https://source.unsplash.com/a-black-and-white-photo-of-a-flower-kW0swgPt298'}
                    alt="image of wish">

                </Image>
            }
            {/*</div>*/}
            <div className="items-center w-full h-[30%] justify-around flex flex-col px-2">
                <div className="flex w-full justify-between">
                    <div
                        className="text-black text-xl font-normal font-['Inter']">{wishItem.price || "No price"}</div>
                    <div
                        className="text-black text-xl font-normal font-['Inter'] flex items-center">{localWish.likes?.length || 0}
                        <div className="ml-1 h-fit"> {
                            !like ?
                                <FaRegHeart onClick={handleLike}/> :
                                <FaHeart onClick={handleLike}/>} </div>
                    </div>

                </div>
                <div className="justify-end flex">
                    <div
                        className="whitespace-normal mx-2 text-black font-['Inter']">{formatName(wishItem.name)}
                    </div>
                </div>
            </div>
        </div>
    )
}