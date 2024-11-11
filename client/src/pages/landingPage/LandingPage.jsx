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
    alanBtn({
      key: '85cc0cd2b071d34ea07e06f76aa0d9ab2e956eca572e1d8b807a3e2338fdd0dc/stage',
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
