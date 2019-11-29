import React, { useContext } from 'react';
import { Context } from '../App';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default function Button(props) {

    const dispatch = useContext(Context);

    const handleClick = (actionType) => {
        switch(actionType) {
            case "PREVIOUS_WORD":
                return dispatch({ type: "PREVIOUS_WORD" });
            case "NEXT_WORD":
                return dispatch({ type: "NEXT_WORD" });
            default:
                throw new Error("actionType does not match any of the cases!");
        }
    }

    return (
        <IconButton onClick={() => handleClick(props.actionType)}>
            <Icon>{props.btnText}</Icon>
        </IconButton>
    );
}