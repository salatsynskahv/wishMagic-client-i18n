import {getTranslations} from "next-intl/server";
import HeroSection from "@/components/herosection/heroSection";
import PopularWishes from "@/components/wishlist/popularWihes";
import {getUser} from "@/app/[locale]/lib/actions";
export async function generateMetadata({ params: { locale } }: any) {
    const t = await getTranslations({ locale, namespace: 'METADATA' });
    return { title: t('TITLE') };
}

const HomePage = async ({ params: { locale } }: any) => {
    return (
        <div>
            <HeroSection/>
            {/*<PopularWishes/>*/}
        </div>);
};

export default HomePage;
