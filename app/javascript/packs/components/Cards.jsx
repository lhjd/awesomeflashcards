import React, { useReducer } from 'react';
import Container from '@material-ui/core/Container';
import Card from './Card';

export default function Cards(props) {

    let { words, wordIndex } = props;

    let word = words[wordIndex];

    return (
        <Container>
            <Card word={word} />
        </Container>
    );
}