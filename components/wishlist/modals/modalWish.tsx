'use client'
import React, {useEffect, useReducer, useState} from "react";
import {serviceApi} from "@/components/services/api/ServiceApi";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";
import {updateWishRequest} from "@/components/services/api/WishlistService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {addWish} from "@/components/store/slices/wishlistSlice";
import {useTranslations} from "next-intl";

type ModalWishProps = {
    data: Wish,
    children: any,
    dispatchData: any,
    setShowModal: any,
    handleSelectChange: any
}
export default function ModalWish({data, dispatchData, setShowModal, handleSelectChange, children}: ModalWishProps) {
    const t = useTranslations('Wishlists');
    const wishlists = useAppSelector((state: any) => state.wishlist);

    const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    function submitLink() {
        serviceApi.scrappingFromUrl(data.link).then((result) => {
            dispatchData({
                type: "init",
                payload: result.data
            });
            console.log(result.data);
        })
    }

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
                                {t('edit_wish')}
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
                            <button className="bg-green-200 rounded-3xl py-3 px-6"
                                    onClick={submitLink}>
                                {t("add")}
                            </button>
                        </div>

                        {
                            data &&
                            <div className="flex flex-col mx-10 my-6">
                                <label>Select Wishlist:</label>
                                <select onChange={handleSelectChange}>
                                    {wishlists.wishlists.map((wishlist: Wishlist) => (
                                        <option key={wishlist.id} value={wishlist.id}>
                                            {wishlist.title}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="title">{t('wish_name')}</label>
                                <input
                                    className={inputStyle}
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleInput}
                                />
                                <label htmlFor="title">{t('price')}</label>
                                <input
                                    className={inputStyle}
                                    type="text"
                                    name="price"
                                    value={data.price}
                                    onChange={handleInput}
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
                        {children}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}