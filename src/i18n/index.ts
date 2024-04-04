import { VERSION } from 'config';
import { useSettingsStore } from 'context/settings/store';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend'; // fallback http load
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache
import { initReactI18next } from 'react-i18next';
import { namespaces } from './config';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        ns: namespaces,
        defaultNS: 'common',
        fallbackLng: 'az',
        debug: false,
        load: 'languageOnly',
        lng: useSettingsStore.getState().language || 'az',
        backend: {
            backends: [
                LocalStorageBackend, // primary
                HttpApi, // fallback
            ],
            backendOptions: [
                {
                    prefix: 'i18next_res_',
                    expirationTime: 5 * 60 * 1000,
                },
                {
                    loadPath: `/lang/{{lng}}/{{ns}}.json`,
                    queryStringParams: {
                        hash: VERSION,
                    },
                },
            ],
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;
