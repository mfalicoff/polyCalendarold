import React from "react";

import {
    ClassForm,
    Container,
    Footer,
    Header,
    Main,
    MainContent,
} from "@components";

const Home: React.FC = () => {
    return (
        <Container>
            <Header />
            <Main />
            <MainContent>
                <ClassForm />
            </MainContent>
            <Footer />
        </Container>
    );
};

export default Home;
