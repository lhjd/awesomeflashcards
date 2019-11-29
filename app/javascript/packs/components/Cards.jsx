import React, { useReducer } from 'react';
import Container from '@material-ui/core/Container';
import Card from './Card';
import styles from './Cards.module.scss';

export default function Cards(props) {

    let { words, wordIndex } = props;

    let word = words[wordIndex];

    return (
        <>
            {/* <Container> */}
            <div className={styles.slider}>
                {words.map(word => (
                    <div className={styles.section}>
                        <Card word={word} />
                    </div>
                ))}
            </div>
            {/* </Container> */}
        </>
    );
}