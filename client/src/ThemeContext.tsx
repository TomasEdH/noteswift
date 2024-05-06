import React, { useEffect } from "react";
import { Theme } from "./types";

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => Promise<void>;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    theme: Theme.LIGHT,
    toggleTheme: async () => {},
});


export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [theme, setTheme] = React.useState<Theme>(Theme.LIGHT);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if(currentTheme) {
            setTheme(currentTheme as Theme);
        }
    }, []);
    
    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme as Theme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
    
}
