import React from "react";

export const TokenDistibution = () => {
  return (
    <>
      <div className="about-area pt-100 pb-100" id="about">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mb-5 banner-gradiant">
                Token Distribution
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="dreamit-about-thumb  me-5" data-wow-delay=".4s">
                {/* <img className='img-fluid position-absolute about-logo-img w-25 vert-move' src="assets/images/myImage/Asset 6.png" alt="" /> */}
                <img
                  className="img-fluid"
                  src="assets/images/myImage/allocation .png"
                  alt=""
                />
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6 col-sm-12"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="dreamit-section-title pb-5" data-wow-delay=".5s">
                <h4>Token Distribution</h4>
                <p className="section-text">
                  We are mined 5 Million WZT Token and it will be distributed in
                  WZT Token holder during various systems.
                </p>
                {/* <p className="section-text">
                                    <div className='d-flex m-5'>
                                    <ul>
                                        <li>Staking</li>
                                        <li>liquidity</li>
                                        <li>Airdrop</li>
                                        <li>Creator</li>
                                        <li>Marketing</li>
                                        
                                    </ul>
                                    <ul>
                                        <li>50 %</li>
                                        <li>20%</li>
                                        <li>10%</li>
                                        <li>10%</li>
                                        <li>10%</li>
                                    </ul>
                                    </div>
                                   
                                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
