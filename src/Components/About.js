import React from "react";

export const About = () => {
  return (
    <>
      <div className="about-area pt-50 pb-50" id="about">
        <div className="container">
          {/* <div className='row'>
                        <div className='col-12'>
                            <h1 className='text-center mb-5 banner-gradiant'>About</h1>
                        </div>
                    </div> */}
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div
                className="dreamit-about-thumb wow fadeInLeft position-relative"
                data-wow-delay=".4s"
              >
                <img
                  className="img-fluid position-absolute about-logo-img w-25 vert-move"
                  src="assets/images/myImage/Asset 6.png"
                  alt=""
                />
                <img
                  className="img-fluid"
                  src="assets/images/myImage/Asset 5.png"
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
              <div
                className="dreamit-section-title pb-5 wow fadeInLeft"
                data-wow-delay=".5s"
              >
                <h1 className="banner-gradiant mb-5">
                  {" "}
                  <b>About</b>{" "}
                </h1>
                <h4>About WalletZilla</h4>
                <p className="section-text">
                  This whole platform is designed to work in the finance
                  environment with any governing parties, and project owner
                  inputs. The platform is built on self sustain smart contract
                  technology.
                </p>
                <p className="section-text">
                  This makes WalletZilla a different approach concept and
                  utilizing the power of AI to fulfill the trust factors,
                  enables users to perform conversions between WalletZilla
                  directly with avoiding the need for counter parties. This
                  mechanism solves the liquidity issues experienced by
                  WalletZilla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
