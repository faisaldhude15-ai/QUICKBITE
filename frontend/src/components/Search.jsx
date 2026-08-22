import { useState } from "react";

function Search({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search food..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default Search;