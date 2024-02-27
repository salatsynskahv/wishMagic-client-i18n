'use client'
import React, {Dispatch, SetStateAction, useEffect, useReducer} from "react";
import {Wish} from "@/types/Wish";
import {usePathname} from "next/navigation";
import Wishlist from "@/types/Wishlist";
import {useTranslations} from "next-intl";
import {serviceApi} from "@/components/services/api/ServiceApi";
import ModalWish from "@/app/[locale]/wishlist/[userId]/[wishlistId]/components/modals/modalWish";


type ModalEditWishParams = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<Wish | undefined>>,
    wish: Wish | undefined,
    wishlistId: number,
    setWishlist: Dispatch<SetStateAction<Wishlist>>
};
export default function EditWishModal({showModal, setShowModal, wish, setWishlist}: ModalEditWishParams) {
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

    const [data, dispatchData] = useReducer(dataReducer, wish || {});


    const handleSubmit = async (e: any, wish: any) => {
        e.preventDefault();
        try {
            fetch('/api/wish', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({wish}),
            }).then(
                (response) => {
                    response.json().then(
                        (result) => {
                            console.log(result);
                            setWishlist(prevState => (
                                {
                                    ...prevState,
                                    wishes: prevState.wishes.map(item => {
                                            if (item.id === data.id) {
                                                return {...result};
                                            }
                                            return item;
                                        }
                                    )
                                }));
                            setShowModal(undefined);
                        })
                })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        dispatchData({
            type: "init",
            payload: wish
        });

    }, [wish]);

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
            {showModal ? <ModalWish
                modalTitle="edit_wish"
                data={data}
                handleInput={handleInput}
                handleSelectChange={handleSelectChange}
                setShowModal={setShowModal}
                submitLink={submitLink}
                submitTitle={'edit'}
                handleSubmit={handleSubmit}/> : <></>}
        </>
    );

}