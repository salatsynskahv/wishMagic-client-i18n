'use client';
import React, { FC } from 'react';
import { useLocale } from 'next-intl';
import ISO6391 from 'iso-639-1';
import { locales, usePathname, useRouter } from '@/navigation';

const LanguageSwitcher: FC = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathName = usePathname();
    console.log(locales);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(pathName, { locale: e.target.value });
    };

    return (
        <div className="mx-10">
            <select className="rounded-md" value={locale} onChange={handleChange}>
                {locales.map((lang) => (
                    <option key={lang} value={lang}>
                        {lang}
                    </option>
                ))}
            </select>
        </div>

    );
};

export default LanguageSwitcher;