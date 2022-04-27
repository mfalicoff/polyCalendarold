import React from "react";

import { Button, Logo } from "@components";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
    const router = useRouter();

    const handleClick = async () => {
        await router.push("/login");
    };

    const handleClickMain = async () => {
        await router.push("/");
    };

    return (
        <div className="flex justify-between bg-gray-800 place-items-center">
            <div className="basis-1/4">
                <Logo />
            </div>
            <div className="basis-1/2">
                <h1
                    onClick={handleClickMain}
                    className="text-red-800 font-bold font text-lg cursor-pointer"
                >
                    PolyCalendar
                </h1>
            </div>
            <div>
                <Button type="button" onClick={handleClick}>
                    Login
                </Button>
            </div>
        </div>
    );
};
