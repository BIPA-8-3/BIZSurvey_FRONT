import OptionSelect from "./OptionSelect";
import RequiredButton from "./RequiredButton";
import DeleteButton from "./DeleteButton";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";
import SingleChoice from "./fields/SingleChoice";
import TextOption from "./fields/TextOption";
import FileOption from "./fields/FileOption";
import DateOption from "./fields/DateOption";


export default function QuestionComp() {


    const [option, setOption] = useState('');

    const [selected, setSelected] = useState(null); // 새로운 상태 추가

    useEffect(() => {
        console.log('effect');

    }, [option]);


    return(


              <>

                  <div style={{width: "600px",  backgroundColor: "gray", borderRadius:'10px', minHeight: '250px'}}>

                      {/*ㅇㅕ긴 선택 버튼들*/}
                      <div style={{display:'flex', justifyContent: 'space-between', backgroundColor: 'yellow', borderRadius: '10px 10px 0 0'}}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                              <span style={{display: 'inline-block', width:'50px', textAlign:'center'}}>1</span>

                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={1}>
                              <span><OptionSelect option={option} setOption={setOption}/></span>
                              <span><RequiredButton/></span>
                              <span style={{marginRight:'10px'}}><DeleteButton/></span>
                          </Stack>
                      </div>


                      {/*질문답변들*/}
                      <div>
                          <div style={{margin: '20px 0 0 40px', width: '500px'}}>
                              <TextField
                                  id="standard-multiline-static"
                                  variant="standard"
                                  placeholder={'제목'}
                                  sx={{width: 500}}
                              />

                          </div>
                      </div>


                        {/*옵션들 */}
                      <div>
                          <div>
                              <div style={{width: 500, marginLeft: '40px', marginTop: '20px'}}>
                                  {option ?  (
                                      <>
                                          {/* 원하는 조건에 따른 옵션을 렌더링 */}
                                          {option === 10 && <SingleChoice />}
                                          {option === 20 && <TextOption />}
                                          {option === 30 && <DateOption />}
                                          {option === 40 && <FileOption />}
                                      </>
                                  ) : (
                                      <></>
                                  ) }
                              </div>
                          </div>

                      </div>


                      {/*푸터*/}
                      <div>

                      </div>

                  </div>


              </>

    );


}