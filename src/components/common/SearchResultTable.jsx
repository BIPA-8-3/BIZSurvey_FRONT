import React from 'react';
import style from"../../style/community/Table.module.css"
import IconWithText from '../common/IconWithText';
import logo from "../../assets/img/avatar.png"
import { CiMemoPad } from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';


export default function SearchResultTable(){
    const { state } = useLocation();
    console.log(state);
}