import OptionSelect from "./OptionSelect";
import RequiredButton from "./RequiredButton";
import DeleteButton from "./DeleteButton";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";
import ChoiceOption from "./fields/ChoiceOption";
import TextOption from "./fields/TextOption";
import FileOption from "./fields/FileOption";
import DateOption from "./fields/DateOption";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import * as React from "react";


export default function QuestionComp({onDelete, index}) {


    const [option, setOption] = useState('');


    useEffect(() => {
        console.log('effect');

    }, [option]);

    const handleDelete = () => {
        onDelete(index);
    }


    return(


              <>

                  <div style={{width: "600px",  backgroundColor: "white", borderRadius:'10px', minHeight: '150px',
                  border: '1px solid #D6D6D6'}}>

                      {/*ㅇㅕ긴 선택 버튼들*/}
                      <div style={{display:'flex', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: '10px 10px 0 0'}}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                              <span style={{display: 'inline-block', width:'50px', textAlign:'center'}}>1</span>

                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={1}>
                              <span><OptionSelect option={option} setOption={setOption}/></span>

                              <span style={{marginRight:'10px'}}>
                                  <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                                     <DeleteIcon />
                                     </IconButton>
                                 </span>
                          </Stack>
                      </div>


                      {/*질문답변들*/}
                      <div style={{marginTop: '20px'}}>
                          <div style={{margin: '0 auto', width: '500px'}}>
                              <TextField
                                  id="filled-basic"
                                  variant="filled"
                                  placeholder={'제목'}
                                  inputProps={{style: {fontWeight: "bold", padding: '12px 13px'}}}
                                  sx={{width: 500}}
                              />
                              <TextField
                                  id="standard-basic"
                                  variant="standard"
                                  placeholder={'설명'}
                                  inputProps={{style: {fontSize: '14px', padding: '15px 0 0 0'}}}
                                  sx={{width: 500}}
                              />

                          </div>
                      </div>


                        {/*옵션들 */}
                      <div>
                              <div>
                                  {option ?  (
                                      <>
                                          {/* 원하는 조건에 따른 옵션을 렌더링 */}
                                          {option === 10 && <ChoiceOption single/>}
                                          {option === 20 && <ChoiceOption />}
                                          {option === 30 && <TextOption />}
                                          {option === 40 && <DateOption />}
                                          {option === 50 && <FileOption />}
                                      </>
                                  ) : (
                                      <></>
                                  ) }
                              </div>


                      </div>


                      {/*푸터*/}

                      <div style={{
                          width:'600px',
                          height:'40px',
                          backgroundColor: 'white',
                          marginBottom: '0',
                          marginTop: '20px',
                          borderRadius: '0 0 10px 10px',
                          borderTop : '1px solid #D6D6D6',
                          paddingTop: '10px',
                          textAlign: 'right'}}>
                          <span style={{margin: '20px 30px 0 0'}}><RequiredButton/></span>
                      </div>


                  </div>


              </>

    );


}