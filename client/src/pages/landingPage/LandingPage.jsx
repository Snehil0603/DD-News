import Navbar from "../navbar/Navbar"
import Slider from '../slider/slider'; 
import React, { useState, useEffect } from 'react';
// import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import { NewsCards } from "../index";
import { Modal } from "../index";
import useStyles from '../../styles';
import NavPillsExample from '../cards';
import Footer from "../Footer";
import NewsSelect from "../newsSelect/NewsSelect"
import axios from "axios";



export default function LandingPage() {


  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([])
  const getNews = () => {
    axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=35541c85ab1f4527b6b2aed6e580c56b")
      .then((response) => {
        //  console.log(response);
        setData(response.data.articles)
      })
  }


  const classes = useStyles();

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

 

    
});

  return (
    <div>
      <Navbar/>
    {/* <NavPillsExample/> */}
    {/* <Search/> */}
    {/* <NewsSelect /> */}
    <Slider/>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          
        </div>
      ) : null}
      <div className="text-center m-10">
        <button onClick={getNews}>Fetch news</button>

      </div>
      <div className='container1' >
            <div className="row">
              {
                data.map((value) => {
                  return (
                    <div className="col-3 overflow-hidden">
                      <div className="card" style={{ width: "20rem",target:"_blank",overflow:"scroll" }}>
                        <img  src={value.urlToImage} className="card-img-top" alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="card-title">{value.title}</h5>
                          <p className="card-text">{value.description}</p>
                          <div className="row">
                          <div className="col">
                          <a href={value.url} className="btn btn-success">Main News</a>
                          </div>
                          <div className="col">
                          <a href={value.url} className="btn btn-danger w-100">Like</a>
                          </div>
                          </div>
                          <div className="row">
                          <div className="col">
                          <a href={value.url} className="btn btn-info  w-100">Comment</a>
                          </div>
                          <div className="col">
                          <a href={value.url} className="btn btn-warning  w-100">Share</a>
                          </div>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
      <Footer />
    </div>
  )
}
