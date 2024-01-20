import {Wish} from "@/types/Wish";
import {FiHeart} from "react-icons/fi";

export const WishItemCardDemo = ({ wishItem }: { wishItem: Wish   }) => {
    return (
        <div className="p-4 bg-white rounded-xl flex-col justify-center border-2 border-b-neutral-100 items-center gap-7 inline-flex">
            <div className="w-[12rem] h-[12rem] bg-zinc-300 rounded-lg">
                <img src={wishItem.imageUrl} alt=""/>
            </div>
            <div className="self-stretch justify-start items-center gap-[5px] flex flex-col">
                <div className="flex w-full justify-between">
                    <div className="text-black text-[18px] font-bold font-['Inter']">{wishItem.name}</div>
                    <div className="text-black text-xl font-normal font-['Inter']">
                        <span>{wishItem.likes}</span>
                       <FiHeart className="ml-0.5 inline-block" size="20px"/>
                    </div>
                </div>
                <div className="justify-start w-full flex">
                    <div className="text-black text-lg font-normal font-['Inter']">{wishItem.price || "No price"}</div>
                </div>
                <div className="justify-start items-center flex overflow-hidden">
                    <div className="text-black text-base font-normal font-['Inter']">{wishItem.comment} </div>
                </div>
            </div>
        </div>
    )
}