import {Wish} from "@/types/Wish";
import {FiHeart} from "react-icons/fi";
import {FaRegCircleCheck} from "react-icons/fa6";
import React from "react";
import {FaTimes} from "react-icons/fa";

export const WishItemCardDemo = ({ wishItem }: { wishItem: Wish   }) => {
    function formatName(name: string): string {
        if(name.length > 30) {
            return name.split(" ").slice(0, 6).join(" ") + "...";
        }
        return name;
    }
    return (
        <div className="inline-flex max-w-[14rem] p-4 bg-white rounded-xl flex-col justify-center border-2 border-b-neutral-100 items-center gap-7">
            <div className="w-[12rem] h-[12rem] bg-zinc-300 rounded-lg" style={{ backgroundImage: `url(${wishItem.imageUrl})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
            <div className="w-full justify-start items-center gap-[5px] flex flex-col">
                <div className="flex w-full justify-between ">
                    <div className="text-black text-[15px] font-['Inter'] h-[50px]">{formatName(wishItem.name)}</div>
                    {/*<div className="text-black text-xl font-normal font-['Inter']">*/}
                    {/*    <span>{wishItem.likesCount}</span>*/}
                    {/*   <FiHeart className="ml-0.5 inline-block" size="20px"/>*/}
                    {/*</div>*/}
                </div>
                <div className="justify-start w-full flex">
                    <div className="text-black text-lg font-normal font-['Inter']">{wishItem.price || "No price"}</div>
                </div>
                {/*<div className="justify-start items-center flex overflow-hidden">*/}
                {/*    <div className="text-black text-base font-normal font-['Inter']">{wishItem.comment} </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}