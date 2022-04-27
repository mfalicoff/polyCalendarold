import React from "react";

export const MainContent: React.FC = ({ children, ...rest }) => {
    return (
        <div
            className={`flex-1 container my-8 max-w-screen-lg mx-auto p-5`}
            {...rest}
        >
            {children}
        </div>
    );
};
