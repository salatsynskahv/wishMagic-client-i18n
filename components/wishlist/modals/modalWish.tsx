'use client'
import React, {useEffect, useReducer, useState} from "react";
import {serviceApi} from "@/components/services/api/ServiceApi";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useTranslations} from "next-intl";
import WiButton from "@/components/elements/button";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import WiInput from "@/components/elements/input";
import {inputStyle} from "@/components/StyleConstants";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {usePathname, useRouter} from "next/navigation";
import wishlist from "@/types/Wishlist";

type ModalWishProps = {
    wishInit: Wish | null,
    wishlistId: string,
    submitLabel: string
    modalTitle: string
    setShowModal: any,
    handleSubmit: any
}

export default function ModalWish({setShowModal, handleSubmit, submitLabel, modalTitle, wishInit, wishlistId}: ModalWishProps) {

    const t = useTranslations('Wishlists');
    const pathname = usePathname();

    const [wishlists, setWishlists] = useState(useAppSelector((state: any) => state.wishlist.wishlists));
    const [link, setLink] = useState<string>();

    const dataReducer = (state: any, action: any) => {
        if (action.type === "init") {
            return {...state, ...action.payload};
        }
        if (action.type === "input") {
            return {...state, [action.payload.name]: action.payload.value}
        }
    }
    const [data, dispatchData] = useReducer(dataReducer, wishInit || {});

    useEffect(() => {

        if (wishlists === undefined || wishlists.length === 0) {
            getUserWishlistFetcher().then(
                res => {
                    setWishlists(res.data);
                }
            )
        }

        const match = pathname.match(/\/(\d+)$/);
        console.log(match);

        dispatchData(
            {
                type: "input",
                payload: {
                    name: 'wishlistId',
                    value: wishlistId
                }
            });

    }, []);

    function submitLink() {
        serviceApi.scrappingFromUrl(data.link).then((result) => {
            dispatchData({
                type: "init",
                payload: result.data
            });
            console.log(result.data);
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

    function handleItemSubmit() {
        console.log(data);
        handleSubmit(data);
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {t(modalTitle)}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(null)
                                }
                            >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-blueGray-500 text-xl font-medium leading-relaxed">
                                {t('insert_link')}
                            </p>
                            <input
                                className={inputStyle}
                                placeholder="https://"
                                value={data.link}
                                name="link"
                                onChange={handleInput}
                            />
                            <p className="my-6 mx-3">Скопіюйте лінк на товар або бажання і ми спробуємо
                                заповнити всі поля автоматично</p>
                            <WiButton onClickHandler={submitLink}>
                                {t("add")}
                            </WiButton>
                        </div>

                        {
                            data &&
                            <div className="flex flex-col mx-10 my-6">
                                <label>Select Wishlist:</label>
                                <select
                                    name="wishlistId"
                                    onChange={handleSelectChange}
                                >
                                    {
                                        wishlists && wishlists.map((wishlist: Wishlist) => (
                                            <option key={wishlist.id} value={wishlist.id}>
                                                {wishlist.title}
                                            </option>
                                        ))}
                                </select>
                                <label htmlFor="title">{t('wish_name')}</label>
                                <WiInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    handleChange={handleInput}
                                />
                                <label htmlFor="title">{t('price')}</label>
                                <WiInput
                                    type="text"
                                    name="price"
                                    value={data.price}
                                    handleChange={handleInput}
                                />
                                <label> {t('comment')}</label>
                                <textarea
                                    className={inputStyle}
                                    name="comment"
                                    value={data.comment}
                                    onChange={handleInput}
                                />
                            </div>
                        }
                        <div
                            className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(null)}
                            >
                                {t('close')}
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleItemSubmit}
                            >
                                {t(submitLabel)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}