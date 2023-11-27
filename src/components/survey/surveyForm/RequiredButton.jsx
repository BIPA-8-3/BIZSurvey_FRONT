import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import {useEffect, useState} from "react";


export default function RequiredButton(){


    const [selected, setSelected] = React.useState(false);
    const [text, setText] = useState('필수 off');

    const RequiredStyle = {
        padding: '0 !important',
        width: '80px',
        height: '30px',
        border: '0',
        borderRadius: '30px'
    };


    useEffect(() => {
        if (selected){
            setText('필수 on');
        }else {
            setText('필수 off');
        }
    }, [selected]);

    return (
        <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
                setSelected(!selected);
            }}
            sx={RequiredStyle}
        >
            {text}
        </ToggleButton>
    );
}