import React from "react";

import { Container, Footer, Header, Main, MainContent } from "@components";

const Home: React.FC = () => {
    return (
        <Container>
            <Header />
            <Main />
            <MainContent>main</MainContent>
            <Footer />
        </Container>
    );
};

export default Home;