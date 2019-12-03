import React, { useContext } from 'react';
import MonsterImage from '../../../assets/images/monster.svg'
import MonsterImage2 from '../../../assets/images/monster2.svg'
import Box from '@material-ui/core/Box';
import { Context } from '../App';

export default function Monster(props) {
    const dispatch = useContext(Context);

    let answeredWrongly = props.wrongAnswer.includes(true);

    const handleClick = () => {
        dispatch({type: "SHOW_EASTER_EGG"});
    }

    return (
        <>
            {   answeredWrongly
                ?
                <Box display="flex" flexDirection="column" className="animated swing">
                    <Box display="flex">
                        <img src={MonsterImage2} width="200px" onClick={handleClick}/>
                    </Box>
                    {/* <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small> */}
                </Box>
                :
                <Box display="flex" flexDirection="column" className="animated slideInUp">
                    <Box display="flex">
                        <img src={MonsterImage} width="200px" onClick={handleClick}/>
                    </Box>
                    {/* <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small> */}
                </Box>            
            }
        </>
    );
}