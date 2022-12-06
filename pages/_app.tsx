import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

export const TimerContext = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>]
>(undefined!);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <TimerContext.Provider value={useState(false)}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </TimerContext.Provider>
    );
}

export default MyApp;
