import { Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'

function LoadingButton() {
    return(
    <Stack spacing={2} direction={'row'}>
        <LoadingButton loading variant='outlined'>submit</LoadingButton>     
    </Stack>
    );
   }
 
   export default LoadingButton;