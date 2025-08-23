import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { translations } from './translations';

type LanguageCode = 'en' | 'hi';

interface I18nContextValue {
	language: LanguageCode;
	setLanguage: (lang: LanguageCode) => void;
	t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [language, setLanguage] = useState<LanguageCode>('en');

	const t = useMemo(() => {
		return (key: string) => {
			const table = translations[language] || {};
			return (table as any)[key] || key;
		};
	}, [language]);

	const value: I18nContextValue = {
		language,
		setLanguage,
		t,
	};

	return (
		<I18nContext.Provider value={value}>
			{children}
		</I18nContext.Provider>
	);
};

export function useI18n() {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error('useI18n must be used within I18nProvider');
	return ctx;
}