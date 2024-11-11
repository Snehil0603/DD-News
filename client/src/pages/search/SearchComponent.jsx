import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchComponent.css';
import NewsPage from '../newsPage/NewsPage';
import { useNavigate } from 'react-router-dom';
import NewsDisplay from '../newsDisplay/NewsDisplay';

const SearchComponent = () => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [endpoint, setEndpoint] = useState('everything'); // State to toggle between endpoints

    // Handle the change event for select dropdown
    const handleSelectChange = (event) => {
        setEndpoint(event.target.value.toLowerCase()); // Normalize the endpoint value to lowercase
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        
        const endpointParam = endpoint === 'everything' ? 'everything' : 'top-headlines';
      
        try {
          const response = await fetch(`/api/news?endpoint=${endpointParam}&keyword=${keyword}&category=${category}`);
          if (!response.ok) {
            throw new Error('Failed to fetch articles');
          }
          const data = await response.json();
      
          setArticles(data.articles); // Directly set the filtered articles received from backend
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
    

    return (
        <>
        <div className="search">
            <span className="selection">
                <div className="container">
                    <select 
                        className="menu" 
                        id="menu-items" 
                        value={endpoint} 
                        onChange={handleSelectChange}
                    >
                        <option value="everything">Everything</option>
                        <option value="top-headlines">Top-headlines</option>
                    </select>
                </div>
                <input 
                    className="search-txt" 
                    type="text" 
                    placeholder="Search news..." 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                />
            </span>
            <span className="selection">
                <div className="container">
                    <select 
                        className="menu" 
                        id="menu-items" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Category</option>
                        <option value="business">Business</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                        <option value="sports">Sports</option>
                        <option value="technology">Technology</option>
                    </select>
                </div>
                <a className="search-btn" onClick={handleSearch}>
                    <FaSearch className="fas fa-search"/>
                </a>
            </span>
        </div>
        <NewsDisplay articles={articles}
                loading={loading}
                error={error}/>
        </>
    );
};

export default SearchComponent;
