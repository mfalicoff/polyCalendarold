import React, { SyntheticEvent, useState } from "react";
import { Button, Container, Footer, Header } from "@components";
import { useRouter } from "next/router";
import { signUp } from "../src/services/login";

const SignUpPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignUp = async (event: SyntheticEvent) => {
        event.preventDefault();
        console.log("signing up  with", username, password);
        const ok = await signUp({ email: username, password: password });
        if (ok.status === 201) {
            console.log("ok");
            await router.push("/login");
        }
    };

    const navigateLogin = async () => {
        await router.push("/login");
    };

    return (
        <Container>
            <Header />
            <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5">
                <div className="flex items-center justify-center h-screen">
                    <div className="col-span-1 rounded-md border border-gray-300 p-5">
                        <div className="py-4">
                            <h1>Login</h1>
                        </div>
                        <div>
                            <form onSubmit={handleSignUp}>
                                <fieldset>
                                    <div className="py-4">
                                        <label>
                                            Username or email
                                            <br />
                                            <input
                                                className="px-4 py-1 border-b-2 border-gray-400 outline-none  focus:border-gray-400"
                                                name="name"
                                                value={username}
                                                onChange={({ target }) =>
                                                    setUsername(target.value)
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            Password
                                            <br />
                                            <input
                                                className="px-4 py-1 border-b-2 border-gray-400 outline-none  focus:border-gray-400"
                                                name="name"
                                                value={password}
                                                onChange={({ target }) =>
                                                    setPassword(target.value)
                                                }
                                            />
                                        </label>
                                    </div>
                                </fieldset>
                                <br />
                                <Button type="submit">Submit</Button>
                            </form>
                        </div>
                        <div>
                            <Button type="button" onClick={navigateLogin}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Container>
    );
};

export default SignUpPage;
