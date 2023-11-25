import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import {IoCloseOutline} from "react-icons/io5";
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {FaCirclePlus} from "react-icons/fa6";
import Button from '@mui/material/Button';


export default function SingleChoice(){

    const [options, setOptions] = useState([{id: 1, text: ''}]);

    const addOption = () => {
        setOptions(pre => [...pre,  { id: pre.length + 1, text: '' }]);
    }

    const deleteOption = (id) => {
        console.log('delete : '+ id)
        setOptions(pre => pre.filter(option => option.id !== id));
    };

    const changeText = (id, text) => {
        setOptions(prevOptions => {
            // id에 해당하는 옵션을 찾아 업데이트
            const updatedOptions = prevOptions.map(option =>
                option.id === id ? { ...option, text: text } : option
            );

            return updatedOptions;
        });

    }

    useEffect(() => {
        console.log(options)
    }, [options]);


    return(

        <>

            {options.map(({id, text}) => (
                <Option key={id} index={id} onDelete={deleteOption} changeText={changeText}></Option>
            ))}



            <div style={{margin: '10px 0 20px 20px'}}>
                <Button variant="text" startIcon={<FaCirclePlus />} sx={{fontSize :14}} onClick={addOption}>
                    옵션 추가
                </Button>
            </div>



        </>
    );
}




function Option({onDelete, index, changeText}){

    console.log('index : '+index);

    const handleDelete = () => {
        onDelete(index);
    };


    return(

      <>


                <Stack direction="row" alignItems="center" spacing={1}>
                    <span style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor:'yellow',
                        textAlign: 'center',
                        borderRadius: '50%'}}></span>
                    <TextField
                        onChange = {(e)=>changeText(index,e.target.value)}
                        id="standard-multiline-static"
                        variant="standard"
                        placeholder={'옵션을 입력하세요'}
                        sx={{width: 430}}
                    />
                    <IconButton aria-label="fingerprint" onClick={handleDelete}>
                        <IoCloseOutline />
                    </IconButton>
                </Stack>

      </>


    );


}