import React from 'react';
import MonsterImage from '../../../assets/images/monster.svg'
import MonsterImage2 from '../../../assets/images/monster2.svg'
import Box from '@material-ui/core/Box';

export default function Monster(props) {

    let answeredWrongly = props.wrongAnswer.includes(true);

    return (
        <>
            {   answeredWrongly
                ?
                <Box display="flex" flexDirection="column" className="animated swing">
                    <Box display="flex">
                        <img src={MonsterImage2} width="200px"/>
                    </Box>
                    {/* <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small> */}
                </Box>
                :
                <Box display="flex" flexDirection="column" className="animated slideInUp">
                    <Box display="flex">
                        <img src={MonsterImage} width="200px"/>
                    </Box>
                    {/* <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small> */}
                </Box>            
            }
        </>
    );
}