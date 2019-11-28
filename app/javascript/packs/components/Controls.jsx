import React, { useContext } from 'react';
import Button from './Button';

export default function Controls() {

    return (
        <>
            <Button actionType="PREVIOUS_WORD" btnText="Previous Card" />
            <Button actionType="NEXT_WORD" btnText="Next Card" />
        </>
    );
}