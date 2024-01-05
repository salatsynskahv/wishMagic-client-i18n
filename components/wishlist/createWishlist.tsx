'use client';
import React, {useState} from "react";
import ModalCreateWishlist from "./modalCreateWishlist";

const CreateWishlist = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-center">
                <button
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setShowModal(prevState => !prevState)}
                >
                    Create Wish
                </button>

                <ModalCreateWishlist showModal={showModal} setShowModal={setShowModal}>
                </ModalCreateWishlist>
            </div>

        </div>
    )
}

export default CreateWishlist;