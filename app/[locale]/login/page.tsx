'use client'
import React, {FormEvent, useState} from 'react'
import {useAuth} from '@/components/context/AuthContext'
import {serviceApi} from '@/components/services/api/ServiceApi'
import {parseJwt, getSocialLoginUrl, handleLogError} from '@/components/services/Helpers'
import Link from "next/link";

function Login(): React.JSX.Element {
    const Auth = useAuth();
    const isLoggedIn = Auth.userIsAuthenticated()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!(username && password)) {
            setIsError(true)
            return
        }

        try {
            const response = await serviceApi.authenticate(username, password)
            const {accessToken} = response.data
            const data = parseJwt(accessToken)
            const authenticatedUser = {data, accessToken}

            Auth.userLogin(authenticatedUser)

            setUsername('')
            setPassword('')
            setIsError(false)
        } catch (error) {
            handleLogError(error)
            setIsError(true)
        }
    }

    // if (isLoggedIn) {
    //     return <Navigate to='/'/>
    // }

    return (
        <div className="flex bg-cover bg-no-repeat bg-center justify-center flex-grow overflow-y-auto h-screen"
              style={{backgroundImage: "url(https://source.unsplash.com/pink-smoke-hR545CzxZxk)"}}
        >
            <div className="flex flex-col h-fit items-center rounded-2xl border shadow-md p-10 mt-20"
                 style={{backgroundColor: "white"}}>
                <h1 className="w-fit text-xl font-bold"> Увійдіть або зареєструйтесь</h1>
                <br/>
                <p className="text-l">Створіть ідеальний список бажань, </p>
                <p> щоб поділитись ним з рідними та друзями</p>
                <div className="flex flex-col gap-4 pt-5 w-full">
                    <Link
                        href={getSocialLoginUrl('google')}
                        className="relative text-center rounded-full px-3 py-3 text-sm leading-6  ring-1 ring-gray-900/10 hover:ring-gray-900/20"> Продовжити
                        з Google
                    </Link>
                    <Link
                        href={getSocialLoginUrl('facebook')}
                        className="relative text-center rounded-full px-3 py-3 text-sm leading-6  ring-1 ring-gray-900/10 hover:ring-gray-900/20"> Продовжити
                        з Facebook
                    </Link>
                    <Link
                        href={getSocialLoginUrl('github')}
                        className="relative text-center rounded-full px-3 py-3 text-sm leading-6  ring-1 ring-gray-900/10 hover:ring-gray-900/20"> Продовжити
                        з Github
                    </Link>
                </div>
                <div className="border-b border-gray-500 my-8 w-1/2"></div>
                <form className="w-full px-6 flex flex-col" onSubmit={handleSubmit}>
                    <div className="py-2">
                        <label htmlFor="username"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text"
                               id="username"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                    <div className="py-2">
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password"
                               id="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    </div>
                    <button
                        type="submit"
                        className="bg-fuchsia-900 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded"> Login </button>

                </form>
            </div>

            <div></div>
        </div>

    )
}

export default Login
