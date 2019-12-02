import React, { useContext } from 'react';
import Button from './Button';
import Box from '@material-ui/core/Box';
import ContinueButton from './ContinueButton';

export default function Controls() {

    return (
        <>
            <Box display="flex" flexDirection="row">
                {/* <Button actionType="PREVIOUS_WORD" btnText="arrow_back_ios" />
                <Button actionType="NEXT_WORD" btnText="arrow_forward_ios" /> */}
                <ContinueButton />
            </Box>
        </>
    );
}