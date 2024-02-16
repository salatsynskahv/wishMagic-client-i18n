'use client';
import React, {useState} from "react";
import ModalCreateWish from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/modalCreateWish";
import {FiPlusCircle} from "react-icons/fi";
import {useTranslations} from "next-intl";

const CreateWish = ({wishlistId}: { wishlistId: number }) => {
    const [showModal, setShowModal] = useState(false);
    const t = useTranslations('Wishlists');
    return (
            <div
                className="sm:max-w-[20%] sm:min-w-[20%]  p-4 bg-white rounded-xl flex-col gap-1 border-2 border-b-neutral-100 flex justify-center items-center"
                onClick={() => setShowModal(prevState => !prevState)}
            >
                <h1 className="text-xl">{t('create')}</h1>
                <FiPlusCircle/>
                <ModalCreateWish
                    showModal={showModal}
                    setShowModal={setShowModal}
                    wishlistId={wishlistId}
                />
            </div>
    )
}

export default CreateWish;