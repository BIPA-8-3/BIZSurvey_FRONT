import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import {IoCloseOutline} from "react-icons/io5";
import Stack from '@mui/material/Stack';
import {useEffect, useState} from "react";
import {FaCirclePlus} from "react-icons/fa6";
import Button from '@mui/material/Button';


export default function ChoiceOption({single, handleOption, index}){

    const [options, setOptions] = useState([{step : 1, surveyAnswer : ''}]);

    const addOption = () => {
        setOptions(pre => {
            const lastId = pre.length > 0 ? pre[pre.length -1 ].step : 0;
            return [...pre, {step: lastId + 1, surveyAnswer: ''}]
            });

    }

    const deleteOption = (id) => {
        setOptions(pre => {
            const deleteOptions = pre.filter(option => option.step !== id)
                .map((option, index) => ({ ...option, step: index + 1 })
            );
            return deleteOptions;
        });
    };

    const changeText = (id, text) => {
        setOptions(pre => {
            // id에 해당하는 옵션을 찾아 업데이트
            const updatedOptions = pre.map((option, index) =>
                option.step === id ? { ...option, surveyAnswer: text, step: index + 1 } : option
            );
            return updatedOptions;
        });
    }

    useEffect(() => {
        console.log(options)
        handleOption(index, options);
    }, [options]);


    return(

        <>

            <div style={{marginTop : '15px'}}>
                {options.map(({step, surveyAnswer}) => (
                    <Option key={step} index={step} onDelete={deleteOption} changeText={changeText} single={single} text={surveyAnswer}></Option>
                ))}
            </div>


            <div style={{marginTop: '10px', paddingLeft: '45px'}}>
                <Button variant="text" startIcon={<FaCirclePlus />} sx={{fontSize :13}} onClick={addOption}>
                    옵션 추가
                </Button>
            </div>



        </>
    );
}




function Option({onDelete, index, changeText, single, text}){

    console.log('index : '+index);

    // const handleDelete = () => {
    //     onDelete(index);
    // };


    return(

      <>

          <div style={{margin: '0 auto', width: '600px'}}>
              <Stack direction="row" alignItems="center" spacing={1}>
                    <span style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid #D6D6D6',
                        textAlign: 'center',
                        borderRadius: single ? '50%' : '3px'}}></span>
                  <TextField
                      value={text}
                      onChange = {(e)=>changeText(index, e.target.value)}
                      id="standard-multiline-static"
                      variant="standard"
                      placeholder={'옵션을 입력하세요'}
                      inputProps={{style: {fontSize: 15}}}
                      sx={{width: 550}}
                  />
                  <IconButton aria-label="fingerprint" onClick={()=>onDelete(index)}>
                      <IoCloseOutline />
                  </IconButton>
              </Stack>

          </div>


      </>


    );


}