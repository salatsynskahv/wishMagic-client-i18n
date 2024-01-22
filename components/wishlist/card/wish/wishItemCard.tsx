import {Wish} from "@/types/Wish";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import useSWR from "swr";
import React, {useState} from "react";
import {BsCheckCircle, BsXCircle} from "react-icons/bs";
import {useTranslations} from "next-intl";



export const WishItemCard = ({ wishItem, selectWish }: { wishItem: Wish , selectWish: any  }) => {
    const [like, setLike] = useState<boolean>(false);
    const handler = () => {
        setLike(prev => !prev);
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
            <div className="max-w-[100%] max-h-[100%] w-[14rem] h-[14rem] bg-zinc-300 rounded-lg mb-3" style={{ backgroundImage: `url(${wishItem.imageUrl})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
            <div className="items-center gap-[10px] flex flex-col">
                <div className="flex w-full justify-between">
                    <div className="text-black text-lg font-normal font-['Inter']">{wishItem.price || "No price"}</div>
                    <div className="text-black text-xl font-normal font-['Inter'] flex items-center">{wishItem.likes || 0}
                        <div className="ml-1 h-fit"> {
                            !like ?
                            <FaRegHeart onClick={handler}/> :
                            <FaHeart onClick={handler}/> } </div>
                    </div>

                </div>
                <div className="justify-end gap-1 flex h-[70px]">
                    <div className="text-black text-[17px] font-['Inter']">{formatName(wishItem.name)}</div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    className="text-gray-600 text-sm py-1 mb-2"
                    onClick={() => selectWish(wishItem)}
                >
                    {t('edit')}
                </button>
            </div>

        </div>
    )
}