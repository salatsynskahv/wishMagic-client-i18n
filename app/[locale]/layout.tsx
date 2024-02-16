import { AuthProvider } from '@/components/context/AuthContext';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import '../globals.css'
import Header from "@/components/header/header";
import {inter} from "@/app/[locale]/ui/fonts";
import {cookies} from "next/headers";
import {getUser} from "@/app/[locale]/lib/actions";
// import { PageParamsType } from '@/types';

const RootLayout = ({
                        children,
                        params: {locale},
                    }: {
    children: React.ReactNode;
    params: any;
}) => {
    const messages = useMessages();

    return (
        <html lang={locale}>
        <body className={`${inter.className} antialiased`}>
        <AuthProvider>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    <Header/>
                    {children}
                </NextIntlClientProvider>
        </AuthProvider>
        </body>
        </html>
    );
};

export default RootLayout;