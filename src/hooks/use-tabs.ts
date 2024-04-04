import { stringify } from 'query-string';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type TabsOptions = {
    customURLParamName: string;
};

export const useTabs = <T>(
    initialActiveTab: T,
    options: TabsOptions = { customURLParamName: 'tab' },
): { activeTab: T; loading: boolean; changeActiveTab: (tab: T) => void } => {
    const [activeTab, setActiveTab] = useState(initialActiveTab);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const changeActiveTab = (tab: T) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        if (params[options.customURLParamName]) {
            setActiveTab((params[options.customURLParamName] as unknown) as T);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        setSearchParams(stringify({ [options.customURLParamName]: activeTab }), { replace: true });
    }, [activeTab]);

    return { activeTab, loading, changeActiveTab };
};
