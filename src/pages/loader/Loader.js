import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../../style/Common.css'


const Loader = () => (
  <div className='customLoadingWrap'>
      <CircularProgress size='100px'/>
  </div>
);
export default Loader;
