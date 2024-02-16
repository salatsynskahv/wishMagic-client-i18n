import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ua'];

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
    locales
});