'use client';
import React, {useState} from "react";
import {FiPlusCircle} from "react-icons/fi";
import {useTranslations} from "next-intl";
import CreateWishModal from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/createWishModal";

const CreateWishCard = ({wishlistId, setWishlist}: { wishlistId: number, setWishlist: React.Dispatch<any> }) => {
    const [showModal, setShowModal] = useState(false);
    const t = useTranslations('Wishlists');
    return (<>
            <div
                className="wish  p-4 bg-white rounded-xl flex-col gap-1 border-2 border-b-neutral-100 flex justify-center items-center"
                onClick={() => setShowModal(prevState => !prevState)}
            >
                <h1 className="text-xl">{t('create')}</h1>
                <FiPlusCircle/>

            </div>
            <CreateWishModal
                showModal={showModal}
                setShowModal={setShowModal}
                wishlistId={wishlistId}
                setWishlist={setWishlist}
            />
        </>
    )
}

export default CreateWishCard;