import {getTranslations} from "next-intl/server";
import LanguageSwitcher from "@/components/lang-switcher/LanguageSwitcher";
import HeroSection from "@/components/herosection/heroSection";
import PopularWishes from "@/components/wishlist/popularWihes";
// import { PageType } from '@/types';

export async function generateMetadata({ params: { locale } }: any) {
    const t = await getTranslations({ locale, namespace: 'METADATA' });
    return { title: t('TITLE') };
}

const HomePage = ({ params: { locale } }: any) => {
    console.log("RELAODING PAGE !!!!!!!!!!")

    return (
        <div>
            <HeroSection/>
            <PopularWishes/>
        </div>);
};

export default HomePage;
