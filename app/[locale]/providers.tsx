'use client';
import {AuthProvider} from "@/components/context/AuthContext";
import {NextIntlClientProvider, useMessages} from "next-intl";

export function Providers({children, locale, messages}: { children: React.ReactNode; locale: any; messages: any }) {

    return (
        <AuthProvider>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    {children}
                </NextIntlClientProvider>
        </AuthProvider>
    );
}