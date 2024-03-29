'use client';
import React, {useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import LanguageSwitcher from "@/components/lang-switcher/LanguageSwitcher";
import Link from "next/link";
import {Dialog} from "@headlessui/react";
import {lusitana} from "@/app/[locale]/ui/fonts";
import {getUserWishlistFetcher} from "@/components/services/api/WishlistService";
import {useRouter} from "next/navigation";
import Wishlist from "@/types/Wishlist";
import {cookies} from "next/headers";
import {User} from "@/types/User";


const HeaderClient = ( {user, children}: { user: User, children: React.ReactNode }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations('Wishlists');

    const redirectToWishlist = () => {
        router.push('/wishlist');
    }

    return (
        <div className="relative inset-x-0 top-0 z-50 ">
            <nav className="flex items-center justify-between lg:px-8 bg-gray-700 h-16" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className={`${lusitana.className} md:text-3xl text-white`}>Wish Magic</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {
                        user && <>
                            <button
                                onClick={redirectToWishlist}
                                className="border-none text-white text-xl font-normal">
                                {t('my_wishlists')}
                            </button>
                        </>
                    }
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    <LanguageSwitcher/>
                    {user ? (
                        <div>
                            <span
                                className="px-2 text-white text-xl font-normal font-['Inter']">{user.email}</span>
                            {children}

                        </div>
                    ) : (
                        <Link href={`/${locale}/login`} className="text-white text-xl font-normal font-['Inter']">
                            Log in
                            {/*<span aria-hidden="true">&rarr;</span>*/}
                        </Link>
                    )}
                </div>

            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            {/*<div className="space-y-2 py-6">*/}
                            {/*    {navigation.map((item) => (*/}
                            {/*        <a*/}
                            {/*            key={item.name}*/}
                            {/*            href={item.href}*/}
                            {/*            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
                            {/*        >*/}
                            {/*            {item.name}*/}
                            {/*        </a>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}

export default HeaderClient;