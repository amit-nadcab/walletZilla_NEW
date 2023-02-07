import React, { useEffect } from "react";
import "../boxPrticles.css";
import Typewriter from "typewriter-effect";
import Lottie from "lottie-react";
import walletZilla from "./main.json";
import { Link, useNavigate } from "react-router-dom";
import { startNow } from "../helper/getWeb3";
import { setUserAddress } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";

export const Banner = () => {
  const { userAddress } = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function connectWallet() {
    startNow().then((res) => {
      dispatch(setUserAddress({ userAddress: res }));
    });
  }
  return (
    <>
      <div className="clearfix" style={{ clear: "both" }}></div>
      <div id="">
        <div id="webcoderskull">
          <div className="hero-section">
            {/* <Particals/> */}

            <div className="container">
              <div className="mt-5 mb-5 ">
                <div
                  className={
                    window.innerWidth < 769
                      ? "row align-items-center mt-5 mb-5 flex-column-reverse pt-3 pb-3"
                      : "row align-items-center "
                  }
                >
                  <div className="col-md-6">
                    <div className="hero-content" data-wow-delay=".4s">
                      <div className="hero-title">
                        {/* <span>
                    <img className='img-fluid' width={20} src='assets/images/myImage/wallet_zilla.gif' alt='' />
                    </span> */}

                        <h4>Safe & Secure and Decentralized</h4>
                      </div>
                      <h1 className="hero">
                        <Typewriter
                          options={{
                            strings: ["Turn Your Dreams", "Into Realty With"],
                            autoStart: true,
                            loop: true,
                          }}
                        />
                      </h1>

                      <h1 className="banner-gradiant"> Walletzilla</h1>
                      {/* <h1 className="">Turn Your Dreams </h1>
                    <h1 className="">Into Realty With Walletzilla</h1> */}

                      <div className="hero-text">
                        <p>
                          A decentralized Marketplace which makes simplifies and
                          standardizes data with blockchain technology. We
                          provides user friendly, efficient and secure crypto
                          solutions and utilizing blockchain technology.
                        </p>
                      </div>

                      <div className="hero-button">
                        {userAddress?.userAddress ? (
                          <Link to="/Dashboard">Dashboard</Link>
                        ) : (
                          <a
                            className="text-white"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              startNow().then((res) => {
                                dispatch(setUserAddress({ userAddress: res }));
                                if (res?.userAddress) {
                                  navigate("/Dashboard");
                                }
                              });
                            }}
                          >
                            Connect Wallet
                          </a>
                        )}
                        <a href="..\..\../Walletzilla.pdf" target="_blank">
                          Download Plan
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dreamit-hero-thumb" data-wow-delay=".5s">
                      {/* <img
                        className="img-fluid"
                        src="assets/images/myImage/wallet_zilla.gif"
                        alt=""
                      /> */}
                      <Lottie animationData={walletZilla} autoplay={true} />;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix" style={{ clear: "both" }}></div>
    </>
  );
};
