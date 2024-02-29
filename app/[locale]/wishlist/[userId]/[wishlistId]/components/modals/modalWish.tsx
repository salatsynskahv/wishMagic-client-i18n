'use client'
import React from "react";
import {useTranslations} from "next-intl";
import WiButton from "@/components/elements/wiButton";
import WiInput from "@/components/elements/input";
import {inputStyle} from "@/components/StyleConstants";
import Image from "next/image";

type ModalWishProps = {
    modalTitle: string
    data: any
    handleInput: any
    handleSelectChange: any
    setShowModal: any
    submitLink: any
    submitTitle: string
    handleSubmit: any
}

export default function ModalWish({
                                      setShowModal,
                                      data,
                                      handleInput,
                                      submitLink,
                                      handleSelectChange,
                                      handleSubmit,
                                      submitTitle,
                                      modalTitle
                                  }: ModalWishProps) {

    const t = useTranslations('Wishlists');

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div
                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-5">
                        {/*header*/}
                        <div
                            className="flex items-start justify-between py-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {t(modalTitle)}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(undefined)
                                }
                            >
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative  flex-auto">
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
                            <p className="my-2 text-xs text-gray-500">Скопіюйте лінк на товар або бажання і ми спробуємо
                                заповнити всі поля автоматично</p>
                            <WiButton onClickHandler={submitLink}>
                                {t("add")}
                            </WiButton>
                        </div>
                        <div>
                            {data.imageUrl && <Image src={data.imageUrl} alt="new" height="150" width="100"/>}
                        </div>

                        {
                            data &&
                            <div className="flex flex-col my-6">
                                <label>Select Wishlist:</label>
                                <select
                                    name="wishlistId"
                                    onChange={handleSelectChange}
                                >
                                    {/*{*/}
                                    {/*    wishlists && wishlists.map((wishlist: Wishlist) => (*/}
                                    {/*        <option key={wishlist.id} value={wishlist.id}>*/}
                                    {/*            {wishlist.title}*/}
                                    {/*        </option>*/}
                                    {/*    ))}*/}
                                </select>
                                <FormGroup data={data.name} label={t('wish_name')} handleInput={handleInput}/>
                                <FormGroup data={data.price} label={t('price')} handleInput={handleInput}/>
                                <FormGroup data={data.comment} label={t('comment')} handleInput={handleInput}/>
                            </div>
                        }
                        <div
                            className="flex items-center gap-2 justify-end pb-3">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(undefined)}
                            >
                                {t('close')}
                            </button>
                            <form>
                                <button
                                    onClick={(e) => handleSubmit(e, data)}
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                    {t(submitTitle)}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}


const FormGroup = ({data, label, handleInput}: { data: any, label: String, handleInput: () => {} }) => {
    return (
        <div className="pt-2">
            <label htmlFor="title" className="text-sm text-gray-500">{label}</label>
            <WiInput
                type="text"
                name="name"
                value={data}
                handleChange={handleInput}/>
        </div>
    )
}