'use client';
import React, {useState} from "react";
import ModalCreateWishlist from "./modalCreateWishlist";
import {FiPlusCircle} from "react-icons/fi";
import {useTranslations} from "next-intl";

const CreateWishlist = () => {
    const [showModal, setShowModal] = useState(false);
    const t = useTranslations('Wishlists');
    return (
        <>
                <div className="max-w-[20%] w-[16rem] p-4 bg-white rounded-xl flex-col gap-1 border-2 border-b-neutral-100 flex justify-center items-center"
                     onClick={() => setShowModal(prevState => !prevState)}>
                    <h1 className="text-xl">{t('create')}</h1>
                    <FiPlusCircle />
                </div>
    <ModalCreateWishlist showModal={showModal} setShowModal={setShowModal}>
    </ModalCreateWishlist>
    </>
    )



}

export default CreateWishlist;