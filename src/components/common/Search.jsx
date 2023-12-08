import style from "../../style/Search.module.css";
import "../../style/Common.css";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

function Search() {
  const [title, setTitle] = useState(""); // 검색할 데이터
  const [findTitles, setFindTitles] = useState([]); // 검색 자동 완성
  const [searchResults, setSearchResults] = useState({}); // 검색 결과 
  const navigate = useNavigate();

  // 
  const onChangeTitle = (e) => {
    setTitle(e.target.value);

    axios
      .post("http://localhost:8080/community/findPostTitle", {
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
      .get(`http://localhost:8080/community/search?keyword=${title}`)
      .then((response) => {
        console.log("검색 결과!!!!(<Search />):", response.data);
        
        console.log(response.data);
        alert(JSON.stringify(response.data))
        let data = {result:response.data}
        navigate('/communitySearchResult', {state: data}) 
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
      <div>
        <input
          value={title}
          onChange={onChangeTitle}
          type="text"
          className={style.searchInput}
          placeholder="검색어를 입력하세요"
        />
        
      </div>
      <div className={style.searchBtn} onClick={onSearchButtonClick} >
        <IoIosSearch size={35} color="#f8f8f8" />
      </div>
    </div>
    
        <SearchResult props={findTitles} />
    </div>
  );
}

export default Search;