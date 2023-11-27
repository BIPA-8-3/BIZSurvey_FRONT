import {useEffect, useState} from "react";
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

export default function DateOption(){

    const [cleared, setCleared] = useState(false);

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [cleared]);


    return(

        <>
            <div style={{width: '600px', margin: '0 auto', paddingTop: '15px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DemoItem>
                        <DatePicker
                            variant="standard"
                            disabled
                            sx={{width : 180}}
                            slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                            }}
                        />
                    </DemoItem>

                    {cleared && (
                        <Alert
                            sx={{ position: 'absolute', bottom: 0, right: 0 }}
                            severity="success"
                        >
                            Field cleared!
                        </Alert>
                    )}

                </LocalizationProvider>

            </div>

        </>

    )




}