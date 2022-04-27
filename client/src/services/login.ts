import fetch, { Response } from "node-fetch";
import { User } from "../../../common/interfaces/users.interface";

export const login = async (data: User): Promise<Response> => {
    console.log(data);
    return await fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const signUp = async (data: User): Promise<Response> => {
    console.log(data);
    return await fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};
