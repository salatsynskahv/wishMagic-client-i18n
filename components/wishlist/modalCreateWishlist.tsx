'use client'
import React, {useEffect, useReducer, useState} from "react";
import {serviceApi} from "@/components/services/api/ServiceApi";
import {Wish} from "@/types/Wish";
import Wishlist from "@/types/Wishlist";
import {createWishlistItem} from "@/components/services/api/WishlistService";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {useRouter} from "next/navigation";
// @ts-ignore
import {addWish} from "@/components/store/slices/wishlistSlice";

export default function ModalCreateWishlist({showModal, setShowModal}: {showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [link, setLink] = useState<string>();
    const wishlists = useAppSelector((state: any) => state.wishlist);
    console.log(wishlists);
    const router = useRouter();
    const [selectedWishlist, setSelectedWishlist] = useState<Wishlist| null>(null);
    const reduxDispatch = useAppDispatch()
    const dataReducer = (state: any, action: any) => {
        if (action.type === "init") {
            return {...state, ...action.payload};
        }
        if (action.type === "input") {
            return {...state, [action.payload.name]: action.payload.value}
        }
    }

    const [data, dispatchData] = useReducer(dataReducer, {});
    const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";


    function submitLink() {
        serviceApi.scrappingFromUrl(link).then((result) => {
            dispatchData({
                type: "init",
                payload: result.data
            });
            console.log(result.data);
        })
    }

    function createWish() {
        const wish: Wish = {
            name: data.title,
            price: data.price,
            wishlistId: selectedWishlist?.id || wishlists.wishlists[0]?.id,
            imageUrl: data.imageUrl,
            link: link,
            comment: data.comment
        }

        createWishlistItem(wish).then(
            (result) => {
                console.log(result);
                reduxDispatch(addWish({wishlistId: wish.wishlistId, wish: wish}));
                setShowModal(false);
            }
        ).catch((error) => {

        })
    }


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        // @ts-ignore
        const selected = wishlists.wishlists.find((wishlist) => wishlist.id === selectedId);
        setSelectedWishlist(selected);
    };

    useEffect(() => {
        // Do something with the selectedWishlist, for example, dispatch an action or call a function
        if (selectedWishlist) {
            console.log('Selected Wishlist:', selectedWishlist);
        }
    }, [selectedWishlist]);



    return (
        <>
            {/*<button*/}
            {/*    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
            {/*    type="button"*/}
            {/*    onClick={() => setShowModal(true)}*/}
            {/*>*/}
            {/*    Open regular modal*/}
            {/*</button>*/}
            {showModal ? (
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
                                        Додати бажання
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
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
                                        Вставте лінк із будь-якого сайту на ваше бажання
                                    </p>
                                    <input
                                        className={inputStyle}
                                        placeholder="https://"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    ></input>
                                    <p className="my-6 mx-3">Скопіюйте лінк на товар або бажання і ми спробуємо
                                        заповнити всі поля автоматично</p>
                                    <button className="bg-green-200 rounded-3xl py-3 px-6"
                                            onClick={submitLink}>
                                        Додати
                                    </button>
                                </div>

                                {
                                    data &&
                                    <div className="flex flex-col mx-10 my-6">
                                        <label>Select Wishlist:</label>
                                        <select onChange={handleSelectChange}>
                                            // @ts-ignore
                                            {wishlists.wishlists.map((wishlist : Wishlist) => (
                                                <option key={wishlist.id} value={wishlist.id}>
                                                    {wishlist.title}
                                                </option>
                                            ))}
                                        </select>
                                        <label htmlFor="title">Назва бажання</label>
                                        <input
                                            className={inputStyle}
                                            type="text"
                                            name="title"
                                            value={data.title}
                                            onChange={
                                                (
                                                    event) => dispatchData(
                                                    {
                                                        type: "input",
                                                        payload: {
                                                            name: event.target.name,
                                                            value: event.target.value
                                                        }
                                                    }
                                                )
                                            }
                                        />
                                        <label

                                            htmlFor="title">Ціна</label>
                                        <input
                                            className={inputStyle}
                                            type="text"
                                            name="price"
                                            value={data.price}
                                            onChange={
                                                (
                                                    event) => dispatchData(
                                                    {
                                                        type: "input",
                                                        payload: {
                                                            name: event.target.name,
                                                            value: event.target.value
                                                        }
                                                    }
                                                )
                                            }
                                        />
                                        <label> Коментар</label>
                                        <textarea className={inputStyle}></textarea>
                                    </div>
                                }
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={createWish}
                                    >
                                        Add wish
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : <></>}
        </>
    );
}