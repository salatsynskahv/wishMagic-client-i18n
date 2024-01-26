import {Wish} from "@/types/Wish";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import React, {useState} from "react";
import {BsCheckCircle, BsXCircle} from "react-icons/bs";
import {useTranslations} from "next-intl";
import {disLikeWishRequest, likeWishRequest} from "@/components/services/api/WishService";
import {useAuth} from "@/components/context/AuthContext";



export const WishItemCard = ({ wishItem, selectWish }: { wishItem: Wish,  selectWish: any  }) => {
    const {user} = useAuth();
    // @ts-ignore
    console.log(user.data.id);
    const [like, setLike] = useState<boolean>( (!!wishItem.likes && wishItem.likes.filter(like => like.userId === user.data.id).length > 0));
    const [localWish, setLocalWish] = useState(wishItem);
    const handler = () => {
        if(!like){
            likeWishRequest(wishItem.id, user.data.id)
                .then(
                    (res)=>
                    {
                        setLocalWish(res.data);
                        setLike(prev => !prev);
                    });
        }
        else {
            const like = localWish.likes?.filter(like => like.userId === user.data.id)[0];
            console.log(like);
            if(like) {
                disLikeWishRequest(like.id).then(
                    (res) => {
                        setLike(prev => !prev);
                        setLocalWish(res.data);
                    }
                )
            }
        }
    }
    function formatName(name: string): string {
        if(name.length > 30) {
            return name.split(" ").slice(0, 8).join(" ") + "...";
        }
        return name;
    }

    const t = useTranslations('Wishlists');
    return (
        <div className=" max-w-[20%] w-[16rem] px-4 pt-4 bg-white rounded-xl flex-col border-2 border-b-neutral-100 items-center gap-3 inline-flex">
            <div className="flex justify-end w-full gap-1.5">
                <BsCheckCircle/>
                <BsXCircle />
            </div>
            <div className="max-w-[100%] max-h-[100%] w-[14rem] h-[14rem] bg-zinc-300 rounded-lg mb-3" style={{ backgroundImage: `url(${localWish.imageUrl})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
            <div className="items-center gap-[10px] flex flex-col">
                <div className="flex w-full justify-between">
                    <div className="text-black text-lg font-normal font-['Inter']">{localWish.price || "No price"}</div>
                    <div className="text-black text-xl font-normal font-['Inter'] flex items-center">{localWish.likes?.length || 0}
                        <div className="ml-1 h-fit"> {
                            !like ?
                            <FaRegHeart onClick={handler}/> :
                            <FaHeart onClick={handler}/> } </div>
                    </div>

                </div>
                <div className="justify-end gap-1 flex h-[70px]">
                    <div className="text-black text-[17px] font-['Inter']">{formatName(localWish.name)}</div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    className="text-gray-600 text-sm py-1 mb-2"
                    onClick={() => selectWish(localWish)}
                >
                    {t('edit')}
                </button>
            </div>

        </div>
    )
}