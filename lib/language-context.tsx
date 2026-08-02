"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Language = "en" | "km"

export interface Translations {
  home: string
  shop: string
  about: string
  contact: string
  login: string
  register: string
  wishlist: string
  cart: string
  search: string
  flashSale: string
  flashSaleNav: string
  freeShipping: string
  viewAll: string
  addToCart: string
  language: string
}

const translations: Record<Language, Translations> = {
  en: {
    home: "Home",
    shop: "Shop",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    wishlist: "Wishlist",
    cart: "Cart",
    search: "Search",
    flashSale: "FLASH SALE — FREE SHIPPING ON ORDERS $30+ · TODAY ONLY",
    flashSaleNav: "Flash Sale",
    freeShipping: "Free shipping on orders over $30",
    viewAll: "View All",
    addToCart: "Add to Cart",
    language: "Language",
  },
  km: {
    home: "ទំព័រដើម",
    shop: "ហាង",
    about: "អំពីយើង",
    contact: "ទំនាក់ទំនង",
    login: "ចូលប្រើ",
    register: "ចុះឈ្មោះ",
    wishlist: "បញ្ជីចង់បាន",
    cart: "កន្ត្រក",
    search: "ស្វែងរក",
    flashSale: "លក់ Flash — ដឹកជញ្ជូនឥតគិតថ្លៃ $30+ · ថ្ងៃនេះប៉ុណ្ណោះ",
    flashSaleNav: "Flash Sale",
    freeShipping: "ដឹកជញ្ជូនឥតគិតថ្លៃ លើការបញ្ជាទិញ $30+",
    viewAll: "មើលទាំងអស់",
    addToCart: "បញ្ចូលទៅកន្ត្រក",
    language: "ភាសា",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}
