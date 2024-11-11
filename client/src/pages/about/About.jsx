import Navbar from '../navbar/Navbar'
import './about.css'

export default function About() {
  return (
    <div>
    <Navbar/>
 <div className = "about-wrapper">
      <div className = "about-left">
        <div className = "about-left-content">
          <div>
            <div className = "shadow">
              <div className = "about-img">
                <img src = "https://i.postimg.cc/Zq40HpVN/Whats-App-Image-2022-08-17-at-1-00-52-AM.jpg" alt = "" />
              </div>
            </div>

            <h2>Snehil<br />Gupta</h2>
            <h3>STUDENT</h3>
          </div>

          <ul className = "icons">
          <a href="https://www.facebook.com/profile.php?id=100076455288971"><i className="topIcon fa-brands fa-facebook"></i></a> 
   <a href="https://www.linkedin.com/in/snehil-gupta-2b416622a/"><i className="topIcon fa-brands fa-linkedin"></i></a>
   <a href="https://www.instagram.com/snehil_0603/"><i className="topIcon fa-brands fa-instagram"></i></a>
   <a href="https://github.com/Snehil0603"><i className="topIcon fa-brands fa-github"></i></a>           
          </ul>
        </div>
      </div>

      <div className = "about-right">
        <h1>hi<span>!</span></h1>
        <h2>Here's who I am & what I do</h2>
        <div className = "about-btns">
          <button type = "button" className = "btn btn-pink">Github</button>
          <a href="https://github.com/Snehil0603"> <button type = "button" className = "btn btn-white">Projects</button></a>
        </div>

        <div className = "about-para">
          <p>Hey there!! My name is Snehil. I am a sophomore at IIIT Lucknow pursuing Computer Science.My interest include web Development and programming.I am curious to explore these fields even more.. .</p>
          <p>The site is based on MERN stack.This Blog site includes basic functionalities of creating,updating,deleting posts.Posts can also be sorted based on the author.It is still under development.I am looking forward to adding more features... </p>
        </div>
      </div>
    </div>

  </div>
  )
}
