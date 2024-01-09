import { AuthProvider } from '@/components/context/AuthContext';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import StoreProvider from "@/components/context/StoreProvider";
import '../globals.css'
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
        <body>
        <AuthProvider>
            <StoreProvider>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    {children}
                </NextIntlClientProvider>
            </StoreProvider>
        </AuthProvider>
        </body>
        </html>
    );
};

export default RootLayout;