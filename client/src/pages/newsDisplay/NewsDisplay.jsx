// NewsDisplay.js
import React,{useState} from 'react';
import "./NewsDisplay.css"
import { useNavigate } from 'react-router-dom';

const NewsDisplay = ({ articles, loading, error }) => {
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    const articlesPerPage = 4; // Number of articles per page (to display 4 per row in a grid)
    const navigate = useNavigate();

    const handleArticleClick = (article) => {
        navigate("/article", { state: { article } }
        );
    };
    

    // Logic for pagination: fetch only a subset of articles per page
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Handle page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    return (
        <>
            {currentArticles.length !== 0 &&loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="results">
                {currentArticles.length === 0 ? (
                    <p style={{'marginLeft': '20px', 'marginBottom': '20px'}}>No articles found</p>
                ) : (
                    currentArticles.map((article, index) => (
                        <div key={index} className="article" onClick={() => handleArticleClick(article)}>
                            {article.urlToImage && (
                                <img src={article.urlToImage} alt={article.title} />
                            )}
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                Read More
                            </a>
                        </div>
                    ))
                )}
            </div>

            {/* Conditionally render pagination only if articles are found */}
            {currentArticles.length > 0 && (
                <div className="pagination">
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </>
    );
};

export default NewsDisplay;
