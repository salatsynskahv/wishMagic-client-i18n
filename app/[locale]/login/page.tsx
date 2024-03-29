'use client'
import React from 'react'
import {parseJwt, getSocialLoginUrl, handleLogError} from '@/components/services/Helpers'
import Link from "next/link";
import {useTranslations} from "next-intl";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

function Login(): React.JSX.Element {


    const t = useTranslations('Login');



    // if (isLoggedIn) {
    //     return <Navigate to='/'/>
    // }

    return (
        <div className="flex bg-cover bg-no-repeat bg-center justify-center flex-grow overflow-y-auto h-screen"
              // style={{backgroundImage: "url(https://source.unsplash.com/pink-smoke-hR545CzxZxk)"}}
        >
            <div className="flex flex-col h-fit items-center rounded-2xl border shadow-md p-10 mt-20"
                 style={{backgroundColor: "white"}}>
                <h1 className="w-fit text-xl font-bold"> {t('login_title')}</h1>
                <br/>
                {/*<p className="text-l">Створіть ідеальний список бажань, </p>*/}
                {/*<p> щоб поділитись ним з рідними та друзями</p>*/}
                <div className="flex flex-col gap-4 pt-5 w-full">
                    <Link
                        href={getSocialLoginUrl('google')}
                        className="flex justify-center gap-2  relative text-center rounded-full px-3 py-3 text-sm leading-6  ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        {t('google')} <FcGoogle className="inline-block" size="1.5rem"/>
                    </Link>
                    {/*<Link*/}
                    {/*    href={getSocialLoginUrl('facebook')}*/}
                    {/*    className="relative text-center rounded-full px-3 py-3 text-sm leading-6  ring-1 ring-gray-900/10 hover:ring-gray-900/20"> Продовжити*/}
                    {/*    з Facebook*/}
                    {/*</Link>*/}
                    <Link
                        href={getSocialLoginUrl('github')}
                        className="flex justify-center gap-2 align-middle relative text-center rounded-full px-3 py-3 text-sm leading-6  ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        {t('github')} <FaGithub className="inline-block" size="1.5rem"/>
                    </Link>
                </div>
                <div className="border-b border-gray-500 my-8 w-1/2"></div>
                    {/*<form className="w-full px-6 flex flex-col" onSubmit={handleSubmit}>*/}
                    {/*    <div className="py-2">*/}
                    {/*        <label htmlFor="username"*/}
                    {/*               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>*/}
                    {/*        <input type="text"*/}
                    {/*               id="username"*/}
                    {/*               value={username}*/}
                    {/*               onChange={(e) => setUsername(e.target.value)}*/}
                    {/*               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>*/}
                    {/*    </div>*/}
                    {/*    <div className="py-2">*/}
                    {/*        <label htmlFor="password"*/}
                    {/*               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>*/}
                    {/*        <input type="password"*/}
                    {/*               id="password"*/}
                    {/*               value={password}*/}
                    {/*               onChange={(e) => setPassword(e.target.value)}*/}
                    {/*               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>*/}
                    {/*    </div>*/}
                    {/*    <button*/}
                    {/*        type="submit"*/}
                    {/*        className="bg-fuchsia-900 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded"> Login </button>*/}

                    {/*</form>*/}
            </div>

            <div></div>
        </div>

    )
}

export default Login
