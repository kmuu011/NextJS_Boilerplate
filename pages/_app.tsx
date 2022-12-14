import '../styles/globals.scss';
import '../public/static/font/NanumSquareRound/style.scss';
import type {AppProps} from 'next/app';
import {Fragment, useEffect} from "react";
import Footer from "../src/component/common/Footer";
import GlobalNavigation from "../src/component/common/navigation/GlobalNavigation";
import NavigationMenu from "../src/component/common/sideBar/SideBar";

import {
    RecoilRoot,
} from 'recoil';

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        const pathName: string = window.location.pathname;
        const tokenCode: string | null = localStorage.getItem('token-code');

        if (tokenCode) {
            if (pathName === '/') {
                window.location.href = '/todoGroup';
            }
        }
    }, []);

    return (
        <RecoilRoot>
            <Fragment>
                <GlobalNavigation/>
                <NavigationMenu/>
                <Component {...pageProps}/>
                <Footer/>
            </Fragment>
        </RecoilRoot>
    )
}

export default MyApp
