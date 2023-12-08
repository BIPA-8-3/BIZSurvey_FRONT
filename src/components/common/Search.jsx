import style from "../../style/Search.module.css";
import "../../style/Common.css";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

function Search() {
  const [title, setTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);

    axios
      .post("http://localhost:8080/community/findPostTitle", {
        keyword: e.target.value,
      })
      .then((response) => {
        console.log("Search Result:", response.data);
        setSearchResults(response.data); // Update the search results state
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
        setSearchResults(response.data); 
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });

      navigate('/communitySearchResult', {state: searchResults})
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
    
        <SearchResult props={searchResults} />
    </div>
  );
}

export default Search;