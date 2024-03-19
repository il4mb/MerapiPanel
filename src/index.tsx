import React, { StrictMode } from "react";
import { RootEditor } from "./editor";
import { createRoot } from "react-dom/client";



const App = () => {
    return (
        <RootEditor >

        </RootEditor>
    )
}


const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
)
