'use client';
import React, {useState} from "react";
import ModalCreateWish from "./modals/modalCreateWish";
import {FiPlusCircle} from "react-icons/fi";
import {useTranslations} from "next-intl";

const CreateWish = () => {
    const [showModal, setShowModal] = useState(false);
    const t = useTranslations('Wishlists');
    return (
        <>
                <div className="max-w-[20%] w-[16rem] p-4 bg-white rounded-xl flex-col gap-1 border-2 border-b-neutral-100 flex justify-center items-center"
                     onClick={() => setShowModal(prevState => !prevState)}>
                    <h1 className="text-xl">{t('create')}</h1>
                    <FiPlusCircle />
                </div>
    <ModalCreateWish showModal={showModal} setShowModal={setShowModal}>
    </ModalCreateWish>
    </>
    )
}

export default CreateWish;