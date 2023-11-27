import { Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'


function SaveButton() {

    return(
    <Stack spacing={2} direction={'row'}>
        <LoadingButton variant='outlined' loadingPosition='start' startIcon={< SaveIcon />}
            sx={{ fontSize: '13px', padding: '6px 12px' }} // 원하는 크기로 조절
        >저장</LoadingButton>

    </Stack>
    );
}

export default SaveButton;