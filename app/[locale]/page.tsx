import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import {getTranslations} from "next-intl/server";
import LanguageSwitcher from "@/components/Switcher/LanguageSwitcher";
import HeroSection from "@/components/herosection/heroSection";
// import { PageType } from '@/types';

export async function generateMetadata({ params: { locale } }: any) {
    const t = await getTranslations({ locale, namespace: 'METADATA' });
    return { title: t('TITLE') };
}

const HomePage = ({ params: { locale } }: any) => {
    const t = useTranslations();

    return (
        <div>
            <HeroSection/>
        </div>);
};

export default HomePage;
