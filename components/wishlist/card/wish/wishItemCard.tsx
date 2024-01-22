import {Wish} from "@/types/Wish";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import useSWR from "swr";
import {useState} from "react";



export const WishItemCard = ({ wishItem, navigateWish }: { wishItem: Wish , navigateWish: any  }) => {
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
    return (
        <div onClick={navigateWish} className=" max-w-[20%] w-[16rem] p-4 bg-white rounded-xl flex-col border-2 border-b-neutral-100 items-center gap-14 inline-flex">
            <div className="w-[14rem] h-[14rem] bg-zinc-300 rounded-lg" style={{ backgroundImage: `url(${wishItem.imageUrl})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
            <div className="items-center gap-[10px] flex flex-col">
                <div className="flex w-full justify-between">
                    <div className="text-black text-lg font-normal font-['Inter']">{wishItem.price || "No price"}</div>
                    <div className="text-black text-xl font-normal font-['Inter'] flex items-center">{wishItem.likes || 0}
                        <div className="ml-1 h-fit"> {!like ? <FaRegHeart onClick={handler}/> :
                            <FaHeart onClick={handler}/> } </div>
                    </div>

                </div>
                <div className="justify-end items-center gap-1 flex">
                    <div className="text-black text-[17px] font-['Inter']">{formatName(wishItem.name)}</div>
                </div>
            </div>
        </div>
    )
}