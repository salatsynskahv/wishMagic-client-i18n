import React from 'react';
import { useTranslations } from 'next-intl';
import {getTranslations} from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
    const t = await getTranslations({ locale, namespace: 'METADATA' });
    return { title: t('ABOUT_TITLE') };
}

const AboutPage = ({ params: { locale } }: any) => {
    const t = useTranslations();

    return <h1>{t('TITLE_ABOUT')}</h1>;
};

export default AboutPage;