import style from"../../style/Search.module.css"
import '../../style/Common.css'
import { IoIosSearch } from "react-icons/io";



function Search(){
    return(
        <div className={style.searchWrap}>
            <div>
                <input type="text" className={style.searchInput} placeholder="검색어를 입력하세요"/>
            </div>
            <div className={style.searchBtn}>
                <IoIosSearch size={35} color="#f8f8f8"/>
            </div>
        </div>
    )
}

export default Search;