import React from 'react';
import TopNavBar from './components/TopNavBar';
import Card from './components/Card';
import Container from '@material-ui/core/Container';

const app = () => {

    return (
        <div>
            <TopNavBar />
            <Container>
                <Card />
            </Container>
        </div>
    );

}

export default app;