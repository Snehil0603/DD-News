
import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./slider.css"

function Slider(){
  const [arrow,setArrow]=useState(false)
  window.addEventListener("scroll",test1);
  function test1(){
    setArrow(true);
  }
    
    useEffect(() => { 
        const body = document.body
        const slides = document.querySelectorAll('.slide')
        const leftBtn = document.getElementById('left')
        const rightBtn = document.getElementById('right')
        
        let activeSlide = 0
        
        rightBtn.addEventListener('click', () => {
          activeSlide++
        
          if (activeSlide > slides.length - 1) {
            activeSlide = 0
          }
        
          setBgToBody()
          setActiveSlide()
        })
        
        leftBtn.addEventListener('click', () => {
          activeSlide--
        
          if (activeSlide < 0) {
            activeSlide = slides.length - 1
          }
        
          setBgToBody()
          setActiveSlide()
        })
        
        setBgToBody()
        
        function setBgToBody() {
          body.style.backgroundImage = slides[activeSlide].style.backgroundImage
        }
        
        function setActiveSlide() {
          slides.forEach((slide) => slide.classList.remove('active'))
        
          slides[activeSlide].classList.add('active')
        } 
        
    });
    return (
      <div className="slider-container">
      <div
        className="slide active"
        style={{
          backgroundImage: `url("https://media.istockphoto.com/vectors/breaking-news-with-world-map-background-vector-vector-id1369150014?k=20&m=1369150014&s=612x612&w=0&h=8Zmzesd7lnHTMNCKfv9BZWCrc3BMVweDR7908TK_FtE=")`
        }}
      ></div>
      <div
        className="slide"
        style={{
          backgroundImage: `url("https://img.freepik.com/premium-photo/creative-digital-picture-gallery-blue-background-photo-album-media-technology-concept_670147-2557.jpg?w=2000")`
        }}
      ></div>

      <div
        className="slide"
        style={{
          backgroundImage: `url("https://thumbs.dreamstime.com/b/d-world-news-background-digital-breaking-studio-report-live-208423108.jpg")`
        }}
      ></div>

      <div
        className="slide"
        style={{
          backgroundImage: `url("https://c.ndtvimg.com/2022-10/l95soa1g_elon-musk-twitter_625x300_28_October_22.jpg?downsize=340:209")`
        }}
      ></div>

      <div
        className="slide"
        style={{
          backgroundImage: `url("https://s.abcnews.com/images/US/221103_abcnl_prime_rundown_hpMain_16x9_608.jpg")`
        }}
      ></div>
     {setArrow ? <div style={{position:"absolute"}}>
      <button className="arrow left-arrow" id="left">
              <i className="fas fa-arrow-left"></i>
            </button>

            <button className="arrow right-arrow" id="right">
              <i className="fas fa-arrow-right"></i>
            </button>
      </div>: 
      <div >
      <button className="arrow left-arrow" id="left">
              <i className="fas fa-arrow-left"></i>
            </button>

            <button className="arrow right-arrow" id="right">
              <i className="fas fa-arrow-right"></i>
            </button>
      </div>
      }

    </div>

    );
};
export default Slider;