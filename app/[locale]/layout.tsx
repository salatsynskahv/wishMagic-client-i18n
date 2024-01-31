import { AuthProvider } from '@/components/context/AuthContext';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import StoreProvider from "@/components/context/StoreProvider";
import '../globals.css'
import Header from "@/components/header/header";
import {inter} from "@/app/[locale]/ui/fonts";
// import { PageParamsType } from '@/types';

const RootLayout = ({
                        children,
                        params: {locale},
                    }: {
    children: React.ReactNode;
    params: any;
}) => {
    const messages = useMessages();
    console.log("RELAODING !!!!!!!!!!")

    return (
        <html lang={locale}>
        <body className={`${inter.className} antialiased`}>
        <AuthProvider>
            <StoreProvider>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    <Header/>
                        {children}
                </NextIntlClientProvider>
            </StoreProvider>
        </AuthProvider>
        </body>
        </html>
    );
};

export default RootLayout;