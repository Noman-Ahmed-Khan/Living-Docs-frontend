'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
    const [theme, setTheme] = useState<'nord' | 'forest'>('nord')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'nord' | 'forest' | null
        if (savedTheme) {
            setTheme(savedTheme)
            document.documentElement.setAttribute('data-theme', savedTheme)
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const initialTheme = prefersDark ? 'forest' : 'nord'
            setTheme(initialTheme)
            document.documentElement.setAttribute('data-theme', initialTheme)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'nord' ? 'forest' : 'nord'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-base-200 hover:bg-base-300 text-base-content transition-all border border-base-300 shadow-sm flex items-center justify-center"
            aria-label="Toggle Theme"
        >
            {theme === 'nord' ? (
                <Moon className="size-5 fill-current" />
            ) : (
                <Sun className="size-5 fill-current" />
            )}
        </button>
    )
}
