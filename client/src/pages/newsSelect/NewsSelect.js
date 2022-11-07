import React from 'react'
import "./newsCSS.css"

export default function NewsSelect() {
    const handleClick=function(){
        
        window.location.replace("/landingPage")
        }
  return (

    
    
    <div>
          
          <div className="allWrapper">
          <section className="quiz_section" id="quizeSection">
    <div className="container">
    <div className="row">
    <div className="col-sm-12">
    <div className="quiz_area ">
    <div className="quiz_backBtn_progressBar">
    <a href="/register" className="quiz_backBtn "><i className="fa fa-arrow-left " aria-hidden="true"></i></a>
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "70%"}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col-sm-12">
                <div className="quiz_content_area">
                    <h1 className="quiz_title">SELECT YOUR FAVORITE CHANNELS</h1>

                    <div className="row">
                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="1" value="1"  />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                            <div className="quiz_icon quiz_icon1"></div>
                                        </div>

                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i>BREAKING NEWS</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="2" value="2" />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                            <div className="quiz_icon quiz_icon2"></div>
                                        </div>

                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i>INDIA TV</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="2" value="2" />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                            <div className="quiz_icon quiz_icon3"></div>
                                        </div>

                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i>ALWAYS LIVE</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="2" value="2" />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                            <div className="quiz_icon quiz_icon4"></div>
                                        </div>

                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i> INDIA TODAY</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="2" value="2" />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                        <div className="quiz_icon quiz_icon5"></div>
                                        
                                        </div>

                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i> AAJTAK</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="2" value="2" />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                        <div className="quiz_icon quiz_icon6"></div>
                                        </div>

                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i> NONSTOP 100</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="2" value="2" />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                        <div className="quiz_icon quiz_icon7"></div>
                                        </div>
                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i>BBC NEWS</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="quiz_card_area">
                                <input className="quiz_checkbox" type="checkbox" id="2" value="2" />
                                <div className="single_quiz_card">
                                    <div className="quiz_card_content">
                                        <div className="quiz_card_icon">
                                        <div className="quiz_icon quiz_icon8"></div>
                                        </div>

                                        <div className="quiz_card_title">
                                                <h3><i className="fa fa-check" aria-hidden="true"></i>LIVE NEWS</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="quiz_next">
                                <button className="quiz_continueBtn" onClick={handleClick}>Continue</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

        </div>

    </div>
  )
}
