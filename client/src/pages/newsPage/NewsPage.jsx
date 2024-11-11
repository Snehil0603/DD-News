import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import CommentsSection from "../commentSection/CommentsSection";
import { FaStar, FaThumbsUp, FaShareSquare, FaEye, FaBookReader, FaVolumeUp } from "react-icons/fa";
import "./newsPage.css";

const NewsPage = () => {
    const location = useLocation();
    const article = location.state?.article;
    const [isFavorited, setIsFavorited] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);

    const userId = localStorage.getItem("userId");
    const newsId = `${article.title.replace(/\s+/g, '-').toLowerCase()}-${article.publishedAt}`;
    const navigate = useNavigate();
    
    useEffect(() => {
        if (article) {
            checkFavoriteStatus();
            checkLikeStatus();
            fetchLikesCount();
        }
    }, [article]);

    const checkFavoriteStatus = () => {
        axios.post("http://localhost:5000/server/favorite/favorited", {
            newsId,
            userFrom: userId,
        }).then(response => {
            if (response.data.success) {
                setIsFavorited(response.data.subscribed);
            }
        }).catch(error => {
            console.error("Error fetching favorite status:", error);
        });
    };

    const toggleFavorite = () => {
        const newFavoriteStatus = !isFavorited;
        if (newFavoriteStatus) {
            axios.post("http://localhost:5000/server/favorite/addToFavorite", {
                userFrom: userId,
                newsId,
                title: article.title,
                description: article.description,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt,
                url: article.url,
            })
            .then(() => {
                setIsFavorited(true);
                checkFavoriteStatus();
            })
            .catch(error => {
                console.error("Error adding to favorites:", error);
            });
        } else {
            axios.post("http://localhost:5000/server/favorite/removeFromFavorite", {
                newsId,
                userFrom: userId,
            })
            .then(() => {
                setIsFavorited(false);
                checkFavoriteStatus();
            })
            .catch(error => {
                console.error("Error removing from favorites:", error);
            });
        }
    };

    const checkLikeStatus = () => {
        axios.post("http://localhost:5000/server/like/getLikes", { newsId, userId })
            .then(response => {
                if (response.data.success) {
                    setIsLiked(response.data.likes.some(like => like.userId === userId));
                }
            });
    };

    const fetchLikesCount = () => {
        axios.post("http://localhost:5000/server/like/getLikes", { newsId })
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length);
                }
            });
    };

    const toggleLike = () => {
        const url = isLiked ? "unLike" : "upLike";
        axios.post(`http://localhost:5000/server/like/${url}`, { newsId, userId })
            .then(() => {
                setLikes(prev => prev + (isLiked ? -1 : 1));
                setIsLiked(!isLiked);
            });
    };

    const readMore = () => {
        window.location.href = article.url;
    };

    const shareArticle = async () => {
        const shareData = {
            title: article.title,
            text: article.description,
            url: article.url || window.location.href,
        };
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(article.url);
            alert("Link copied to clipboard!");
        }
    };

    const readAloud = () => {
        if ('speechSynthesis' in window) {
            const titleUtterance = new SpeechSynthesisUtterance(article.title);
            const authorUtterance = new SpeechSynthesisUtterance(`The author is ${article.author}`);
            const descriptionUtterance = new SpeechSynthesisUtterance(article.description);
    
            titleUtterance.lang = 'en-US';
            authorUtterance.lang = 'en-US';
            descriptionUtterance.lang = 'en-US';
    
            // Speak each utterance with a 1-second pause in between
            window.speechSynthesis.speak(titleUtterance);
            titleUtterance.onend = () => {
                setTimeout(() => {
                    window.speechSynthesis.speak(authorUtterance);
                    authorUtterance.onend = () => {
                        setTimeout(() => {
                            window.speechSynthesis.speak(descriptionUtterance);
                        }, 500); // 1-second pause after the author
                    };
                }, 500); // 1-second pause after the title
            };
        } else {
            alert("Your browser does not support the text-to-speech feature.");
        }
    };
    

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    if (!article) return <p>Article not found</p>;

    return (
        <>
            <Navbar />
            <div className="news-page">
                {article.urlToImage && (
                    <img src={article.urlToImage} alt={article.title} className="article-image" />
                )}
                <div className="content-details">
                    <h2>{article.title}</h2>
                    <p className="meta-info date"><strong>Published on:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                    <p className="meta-info author"><strong>Author:</strong> {article.author || "Unknown"}</p>
                    <p>{article.description}</p>
                    <div className="all-icons">
                        <FaStar onClick={toggleFavorite} className={`icon favorite-icon ${isFavorited ? "active" : ""}`} />
                        <FaShareSquare onClick={shareArticle} className="icon share-icon" />
                        <div style={{'display':'flex','alignItems':'center'}}>
                            <FaThumbsUp onClick={toggleLike} className={`icon like-icon ${isLiked ? "active" : ""}`} />
                            <span>{likes}</span>
                        </div>
                        <div style={{'display':'flex','alignItems':'center'}}>
                            <FaEye onClick={toggleCommentsVisibility} className="icon eye-icon" />
                            <span>{commentsVisible ? "Hide Comments" : "Show Comments"}</span>
                        </div>
                        <div style={{'display':'flex','alignItems':'center'}}>
                            <FaBookReader onClick={readMore} className="icon" />
                            <span>Read more</span>
                        </div>
                        <div style={{'display':'flex','alignItems':'center'}}>
                            <FaVolumeUp onClick={readAloud} className="icon" />
                            <span>Read Aloud</span>
                        </div>
                    </div>
                    {commentsVisible && <CommentsSection newsId={newsId} userId={userId} />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewsPage;
