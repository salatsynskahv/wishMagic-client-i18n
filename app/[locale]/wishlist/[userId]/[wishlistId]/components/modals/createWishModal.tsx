'use client'
import React, {Dispatch, SetStateAction, useReducer} from "react";
import {usePathname} from "next/navigation";
import Wishlist from "@/types/Wishlist";
import {useTranslations} from "next-intl";
import {serviceApi} from "@/components/services/api/ServiceApi";
import ModalWish from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/modalWish";
import {Wish} from "@/types/Wish";


type ModalCreateWishParams = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    wishlistId: number,
    setWishlist: Dispatch<SetStateAction<Wishlist>>
};
export default function CreateWishModal({showModal, setShowModal, setWishlist, wishlistId}: ModalCreateWishParams) {
    const t = useTranslations('Wishlists');
    const pathname = usePathname();
    const dataReducer = (state: any, action: any) => {
        if (action.type === "init") {
            return {...state, ...action.payload};
        }
        if (action.type === "input") {
            return {...state, [action.payload.name]: action.payload.value}
        }
    }

    const [data, dispatchData] = useReducer(dataReducer, {wishlistId});


    const handleSubmit = async (e: any, wish: any) => {
        e.preventDefault();
        try {
            fetch('/api/wish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({wish}),
            }).then(
                (res) => {
                    res.json().then((body) => {
                            console.log(body);
                            setWishlist(prevState => (
                                {
                                    ...prevState,
                                    wishes: [...prevState.wishes, body.res]
                                }));
                            setShowModal(false);

                        }
                    )
                });
        } catch (error) {
            console.error(error);
        }
    }

    function submitLink() {
        serviceApi.scrappingFromUrl(data.link).then((result) => {
            dispatchData({
                type: "init",
                payload: result.data
            });
        })
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        dispatchData(
            {
                type: "input",
                payload: {
                    name: 'wishlistId',
                    value: selectedId
                }
            })
    };
    const handleInput = (event: any) => dispatchData(
        {
            type: "input",
            payload: {
                name: event.target.name,
                value: event.target.value
            }
        }
    )


    return (
        <>
            {
                showModal ?
                    <ModalWish
                        modalTitle={'create_wish'}
                        submitTitle={'create'}
                        data={data}
                        handleInput={handleInput}
                        handleSelectChange={handleSelectChange}
                        setShowModal={setShowModal}
                        submitLink={submitLink}
                        handleSubmit={handleSubmit}/>
                    :
                    <></>
            }
        </>
    );

}