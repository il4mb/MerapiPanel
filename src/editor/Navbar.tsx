import React from "react";
export interface NavbarProps {
    children: React.ReactNode
}

export const Navbar = ({ children }: NavbarProps) => {

    return (
        <div className="navbar">
            {children}
        </div>
    )
}