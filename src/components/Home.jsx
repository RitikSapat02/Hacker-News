
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (error) {
      console.error('Error fetching search results', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (objectID) => {
    navigate(`/post/${objectID}`)
  };

  return (
    <div className={classes.container}>
      <h1>Hacker News Search</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.objectID} className={classes.listItem} onClick={() => handleItemClick(result.objectID)}>
              {result.title}
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && !loading && <p>No results found.</p>}
    </div>
  );
};

export default Home; 
