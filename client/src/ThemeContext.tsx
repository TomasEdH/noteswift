import React, { useEffect } from "react";

interface ThemeContextProps {
    theme: 'light' | 'dark';
    toggleTheme: () => Promise<void>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: async () => {},
});


export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if(currentTheme) {
            setTheme(currentTheme as 'light' | 'dark');
        }
    }, []);
    
    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
    
}
