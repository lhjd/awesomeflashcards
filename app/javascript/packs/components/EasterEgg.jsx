import React, { useContext } from 'react';
import { Context } from '../App';

const EasterEgg = () => {
    
    const dispatch = useContext(Context);

    const handleClick = () => {
        dispatch({type: "SHOW_QUIZ"});
    }

    return (
        <>
        <div>Easter Egg </div>
        <button onClick={handleClick}>Return</button>
        </>
    );
}

export default EasterEgg;