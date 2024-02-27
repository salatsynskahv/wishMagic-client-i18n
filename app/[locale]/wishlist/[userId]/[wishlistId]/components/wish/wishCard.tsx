import {Wish} from "@/types/Wish";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import React, {useState} from "react";
import {BsPencilSquare, BsXCircle} from "react-icons/bs";
import {useTranslations} from "next-intl";
import {disLikeWishRequest, likeWishRequest} from "@/components/services/api/WishService";
import Wishlist from "@/types/Wishlist";
import Image from "next/image";
import DeleteWishModal from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/deleteWishModal";

const WishCard = ({userId, wishItem, selectWish, setWishlist}: {
    userId: string
    wishItem: Wish,
    selectWish: any,
    setWishlist: React.Dispatch<React.SetStateAction<Wishlist>>
}) => {
    const [like, setLike] = useState<boolean>((!!wishItem.likes && wishItem.likes.filter(like => like.userId.toString() === userId).length > 0));
    const [localWish, setLocalWish] = useState(wishItem);
    const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
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
        setShowDeleteCardModal(true);
    }

    const deleteFromState = () => {
        setWishlist((prev) => {
            return {...prev, wishes: prev.wishes.filter(item => item.id !== wishItem.id)};
        });
    }

    function formatName(name: string): string {
        if (name.length > 30) {
            return name.split(" ").slice(0, 8).join(" ") + "...";
        }
        return name;
    }

    const t = useTranslations('Wishlists');

    return (
        <>
            <div className="wish">
                <div className="flex justify-end w-full gap-1.5 mb-2">
                    <button
                        className="text-gray-600"
                        onClick={() => selectWish(localWish)}
                    >
                        <BsPencilSquare/>
                    </button>
                    <BsXCircle onClick={handleDelete}/>
                    {
                        showDeleteCardModal &&
                        <DeleteWishModal
                            wishId={wishItem.id}
                            setShowDeleteCardModal={setShowDeleteCardModal}
                            deleteFromState={deleteFromState}
                        />
                    }
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


        </>
    )
}

export default WishCard;