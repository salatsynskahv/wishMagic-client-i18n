import React from 'react'
import Link from 'next/link';
import {useLocale} from "next-intl";
import {getUser} from "@/app/[locale]/lib/actions";
import {getTranslations} from "next-intl/server";

export default async function HeroSection() {
    const user = await getUser();
    console.log("user: " + user);
    const locale = useLocale();
    const t = await getTranslations('HeroSection');
    return (
        <>
            <div className="flex bg-cover bg-no-repeat bg-center flex-grow overflow-y-auto">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true">
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="max-w-2xl pb-11 sm:pt-46 lg:pt-52 flex flex-col items-center">
                    <div className="white-gradient ">
                        <div className="ml-36 py-12">
                            <h1 className="top-0 left-0 [font-family:'Inter-Bold', Helvetica] font-bold text-[#404958] sm:text-6xl tracking-[0] leading-[normal]">
                                {t('banner_title')}
                            </h1>
                            <p className="text-black md:text-[24px] font-normal pt-4">
                                {t('banner_text')}
                            </p>
                        </div>


                    </div>
                    <div className="mt-12 px-5 py-2 bg-white rounded-xl justify-center items-center gap-2 inline-flex">
                        {user ?
                            <Link href={`/${locale}/wishlists`}
                                  className="text-xl leading-6 text-red-800 text-[24px] font-medium font-['Inter']">
                                {t('to_wishlists')}
                            </Link>
                            :
                            <Link href={`/${locale}/login`}
                                  className="text-xl leading-6 text-red-800 text-[24px] font-medium font-['Inter']">
                                {t('join')}
                            </Link>
                        }
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true">
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </>
    )
}
