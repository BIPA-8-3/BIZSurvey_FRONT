import style from "../../style/Search.module.css";
import "../../style/Common.css";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

function SCommunitySearch() {
  const [title, setTitle] = useState(""); // 검색할 데이터
  const [findTitles, setFindTitles] = useState([]); // 검색 자동 완성
  const [searchResults, setSearchResults] = useState({}); // 검색 결과 
  const navigate = useNavigate();

  // 
  const onChangeTitle = (e) => {
    setTitle(e.target.value);

    axios
      .post("http://localhost:8080/s-community/findSurveyPostTitle", {
        keyword: e.target.value,
      })
      .then((response) => {
        console.log("Search Result:", response.data);
        setFindTitles(response.data); // Update the search results state
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });

  };

  const searchPosts = () => {

    axios
      .get(`http://localhost:8080/s-community/search?keyword=${title}`)
      .then((response) => {
        console.log("설문 게시물 검색 결과!!!!(<Search />):", response.data);
        
        console.log(response.data);
        
        let data = {keyword:title, result:response.data}

        console.log( "보내는 데이터(설)(설)(문)(문) : "+JSON.stringify(data))
        
        navigate('/surveyCommunitySearchResult', {state: data}) 
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });
      console.log('--------------------------------------------------')
      console.log(searchResults.data)
      
  };


  const onSearchButtonClick = () => {
    if(title === "" || title === null){
      alert('검색어를 입력하셔야합니다.')
      
    }else{
      searchPosts();
    }
  };


  return (
    <div>
    <div className={style.searchWrap}>
      <div className={style.searchInputWrap}>
        <div>
          <input
            value={title}
            onChange={onChangeTitle}
            type="text"
            className={`${style.searchInput} ${findTitles.length > 0 ? style.hasResults : ''}`}
            // onBlur={handleBlur}
            // onClick={onClickTitle}
            placeholder="검색어를 입력하세요"
          />
          
        </div>
        <div className={style.searchBtn} onClick={onSearchButtonClick} >
          <IoIosSearch size={35} color="#f8f8f8" />
        </div>
      </div>
      {/* <div className={`${style.autocomplete} ${findTitles.length > 0 ? style.hasResultsAutocomplete : ''}`}>
        {Array.isArray(findTitles) && findTitles.map((item) => 
          <div key={item.id} className={style.comItem}>{item.result}</div>
        )}
      </div> */}
      {/*  자동완성 css적용 코드  */}
    </div>
        {/* <SearchResult props={findTitles} />       */}  
        {/* 이전 코드 잠시 주석했습니다 */}
    </div>
  );
}

export default SCommunitySearch;