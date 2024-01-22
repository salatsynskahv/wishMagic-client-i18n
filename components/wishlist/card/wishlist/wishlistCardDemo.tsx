import {Wish} from "@/types/Wish";
import {FiHeart} from "react-icons/fi";

export const WishItemCardDemo = ({ wishItem }: { wishItem: Wish   }) => {
    function formatName(name: string): string {
        if(name.length > 30) {
            return name.split(" ").slice(0, 10).join(" ") + "...";
        }
        return name;
    }
    return (
        <div className="p-4 bg-white rounded-xl flex-col justify-center border-2 border-b-neutral-100 items-center gap-7 inline-flex">
            <div className="w-[12rem] h-[12rem] bg-zinc-300 rounded-lg" style={{ backgroundImage: `url(${wishItem.imageUrl})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>

            <div className="justify-start items-center gap-[5px] flex flex-col">
                <div className="flex w-full justify-between h-[75px]">
                    <div className="text-black text-[16px] font-bold font-['Inter']">{formatName(wishItem.name)}</div>
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