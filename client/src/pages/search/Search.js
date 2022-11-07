import React, { useState } from 'react'
import Navbar from "../navbar/Navbar"
import axios from "axios"


export default function Search(props) {

    const [data, setData] = useState([]);

    const query=props.message;
    const getNews = () => {
        axios.get("https://newsapi.org/v2/everything?q="+query+"?country=in&apiKey=35541c85ab1f4527b6b2aed6e580c56b")
          .then((response) => {
             console.log(response);
            setData(response.data.articles)
          })
      }

 
  return (
    <div>
    {props.news ? getNews():" "}
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
    </div>
  )
}
