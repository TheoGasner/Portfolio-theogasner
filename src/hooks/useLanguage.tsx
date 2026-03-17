import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import texts from '../content/text.json';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  switchLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = texts[language];

    for (const k of keys) {
      result = result?.[k];
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
