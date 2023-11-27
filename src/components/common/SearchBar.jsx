import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const car_brands = [""];
  const [data] = useState(car_brands);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <TextField
        id="search"
        type="search"
        label="게시물 검색"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: 600 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm ? (
                <ClearIcon onClick={handleClear} />
              ) : (
                <SearchIcon />
              )}
            </InputAdornment>
          ),
          style: { color: "#242424" },
        }}
      />

      {/* Render the filtered results */}
      <ul style={{ listStyleType: "none", color: "#242424" }}>
        {filteredData.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Container>
  );
}

export default SearchBar;