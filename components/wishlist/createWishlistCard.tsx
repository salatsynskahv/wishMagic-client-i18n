import CreateWishlist from "@/components/wishlist/createWishlist";
import {FiPlusCircle} from "react-icons/fi";
import {useTranslations} from "next-intl";
import createWishlist from "@/components/wishlist/createWishlist";


export const CreateWishlistCard = () => {
    const t = useTranslations('Wishlists');
    return (
        <div className="p-4 bg-white rounded-xl w-[16rem] h-[23rem] flex-col gap-1 border-2 border-b-neutral-100 flex justify-center items-center">
            <h1 className="text-xl">{t('create')}</h1>
            <FiPlusCircle />
            <CreateWishlist/>
        </div>


    )
}