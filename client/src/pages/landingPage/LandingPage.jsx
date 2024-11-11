import Navbar from "../navbar/Navbar";
import React, { useState, useEffect } from 'react';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import { NewsCards } from "../index";
// import { Modal } from "../index";
// import NavPillsExample from '../cards';
import Footer from "../footer/Footer";
import axios from "axios";
import ImageCarousel from "../slider/slider";
import SearchComponent from "../search/SearchComponent";

export default function LandingPage() {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_ALAN_API_KEY) {
      alanBtn({
        key: process.env.REACT_APP_ALAN_API_KEY,  // Initializes the Alan button with your API key
        onCommand: ({ command, articles, number }) => {
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === 'instructions') {
            setIsOpen(true);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
        },
      });
    } else {
      console.error("Alan AI key is missing.");
    }
  }, []);
  
  return (
    <div>
      <Navbar />
      <ImageCarousel/>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <SearchComponent/>
      <Footer/>
    </div>
  );
}
