import React from 'react';
import Card from './Card';
import Choice from './Choice';

export default function Quiz(props) {

    return (
        <>
            <h1>Quiz</h1>
            <Card frontWord={props.question} backWord="" flipped={false} />
            <Choice />
            <Choice />
            <Choice />
        </>
    );


}