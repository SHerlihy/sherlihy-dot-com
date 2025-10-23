import { createContext, ReactNode, useState } from 'react';

export const NavContext = createContext({
    isNav: false,
    toggleIsNav: () => { }
});

export function IsNavProvider({ children }: { children: ReactNode }) {
    const [isNav, setIsNav] = useState(false);

    const toggleIsNav = () => {
        setIsNav((prev) => !prev)
    }

    return (
        <NavContext value={{ isNav, toggleIsNav }}>
            {children}
        </NavContext>
    )
}
