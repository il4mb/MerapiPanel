import React from "react";
import { useApp } from "./App";
export interface NavbarProps {
    children: React.ReactNode
}

export const Navbar = ({ children }: NavbarProps) => {

    const { classPrefix } = useApp();


    




    return (
        <div className={`${classPrefix}navbar`}>
            {children}
        </div>
    )
}