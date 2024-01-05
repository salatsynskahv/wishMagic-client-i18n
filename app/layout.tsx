import { ReactNode } from 'react';
import './globals.css'

type Props = {
    children: ReactNode;
};

const RootLayout = ({ children }: Props) => children;

export default RootLayout;