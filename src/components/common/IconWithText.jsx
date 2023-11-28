import {FaListOl} from "react-icons/fa";
import * as React from "react";


export default function IconWithText({children, text, fontsize, fontweight, fontcolor}){

    return(
        <>

            <div style={{display : "inline-flex", alignItems: "center", justifyContent:"center",
                fontSize: fontsize ? fontsize : '14px',
                fontWeight: fontweight ? fontweight : 'normal',
                color : fontcolor ? fontcolor : 'black'}}>
                {children}
                <span style={{margin: "0 5px 0 5px"}}>{text}</span>
            </div>

        </>



    );


}