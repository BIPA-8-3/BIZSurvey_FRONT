import style from "../../style/Search.module.css";
import "../../style/Common.css";
import { IoIosSearch } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useNavigate, Link } from "react-router-dom";
import call from "../../pages/workspace/api";

function Search() {
  const [title, setTitle] = useState(""); // 검색할 데이터
  const [findTitles, setFindTitles] = useState([]); // 검색 자동 완성
  const [searchResults, setSearchResults] = useState({}); // 검색 결과 
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);


  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      if (findTitles.length > 0) {
        const currentIndex = findTitles.findIndex(
          (item) => item.result === selectedItem
        );
        const nextIndex = (currentIndex + 1) % findTitles.length;
        setSelectedItem(findTitles[nextIndex].result);
        
      }
    } else if (e.keyCode === 38) {
      if (findTitles.length > 0) {
        const currentIndex = findTitles.findIndex(
          (item) => item.result === selectedItem
        );
        const prevIndex =
          currentIndex === 0 ? findTitles.length - 1 : currentIndex - 1;
        setSelectedItem(findTitles[prevIndex].result);
        
      }
    }else if (e.keyCode === 13) {
      if (selectedItem) {
        clickSearchPosts(selectedItem)
        setFindTitles([]);
      }
    }
  };


  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setTimeout(() => {
        setFindTitles([]);
      }, 200);
    }
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);

      call("/community/findPostTitle", "POST", {
        keyword: e.target.value,
      })
      .then((data) => {
        
        setFindTitles(data); 
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });

  };
 

  const searchPosts = () => {

    const encodedKeyword = encodeURIComponent(title);
    
    call(`/community/search?keyword=${encodedKeyword}`, "GET")
      .then((data) => {
        let newData = { keyword: encodedKeyword, result: data };
        navigate("/communitySearchResult", { state: newData });
      })
      .catch((error) => {
        console.error("게시물 검색 중 오류 발생:", error);
      })
      .finally(() => {
        
      });
  };

  const clickSearchPosts = (e) => {
    setTitle(e)
    const encodedKeyword = encodeURIComponent(e);

      call(`/community/search?keyword=${encodedKeyword}`, "GET")
      .then((data) => {
        let newData = { keyword: encodedKeyword, result: data };
        setTitle(e)
        navigate('/communitySearchResult', { state: newData });
      })
      .catch((error) => {
        console.error("Error searching posts:", error);
      });
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
        <div className={style.searchInputWrapDiv}>
          <input
            value={title}
            onChange={onChangeTitle}
            type="text"
            className={`${style.searchInput} ${findTitles.length > 0 ? style.hasResults : ''}`}
            onBlur={handleBlur}
            onClick={onChangeTitle}
            placeholder="검색어를 입력하세요"
            onKeyDown={handleKeyDown}
            tabIndex="0" // 요소가 포커스를 받을 수 있도록 함
          />
          
        </div>
        <div className={style.searchBtn} onClick={onSearchButtonClick} >
          <IoIosSearch size={35} color="#f8f8f8" />
        </div>
      </div>
      <div className={`${style.autocomplete} ${findTitles.length > 0 ? style.hasResultsAutocomplete : ''}`}>
        {Array.isArray(findTitles) && findTitles.map((item) => 
            <div 
              key={item.id} 
              className={`${style.comItem} ${
                item.result === selectedItem ? style.selectedItem : ''
              }`}
              onClick={() => clickSearchPosts(item.result)}
              tabIndex="0">{item.result}</div>
        )}
      </div>
    </div>
          
        {/* <SearchResult props={findTitles} /> */}
    </div>
  );
}

export default Search;