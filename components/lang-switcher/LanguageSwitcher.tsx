'use client';
import React, {FC} from 'react';
import {useLocale} from 'next-intl';
import ISO6391 from 'iso-639-1';
import {locales, usePathname, useRouter} from '@/navigation';


const LanguageSwitcher: FC = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();
    console.log(locales);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(pathName, {locale: e.target.value});
    };

    const langMap: { [key: string]: string } = {
        'ua': "🇺🇦",
        'en': "🇬🇧"
    }

    return (
        <select
            className="inline-flex rounded-xl py-0.5  align-middle pl-[8px] pr-[10px] mr-10"
            value={locale}
            onChange={handleChange}>
            {
                locales.map((lang) => (
                    <option className="w-1 " key={lang} value={lang}>
                        {langMap[lang]}
                    </option>))
            }
        </select>
    );
};

export default LanguageSwitcher;