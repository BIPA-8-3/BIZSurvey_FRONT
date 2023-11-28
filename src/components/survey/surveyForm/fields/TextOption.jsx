import TextField from '@mui/material/TextField';

export default function TextOption(){


    return(
        <>

<div style={{width: '600px', margin: '0 auto', paddingTop: '15px'}}>
    <TextField
        disabled
        id="standard-disabled"
        defaultValue="주관식 텍스트"
        variant="standard"
        fullWidth={'true'}
    />

</div>



        </>

    )

}