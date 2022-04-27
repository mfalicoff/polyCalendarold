import React from "react";
import Image from "next/image";

export const Logo: React.FC = () => {
    return (
        <Image
            src="/icons/jules.jpg"
            alt="polyCalendar"
            width="50"
            height="50"
        />
    );
};
