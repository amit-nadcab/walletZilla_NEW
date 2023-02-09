import React from "react";
import { TOKEN_ADDRESS } from "../helper/config";

export const TokenDetails = () => {
  return (
    <>
      <div className="about-area pt-100 pb-100 position-relative" id="about">
        <img
          className="rt-img position-absolute"
          src="assets/images/myImage/decor-3.svg"
          alt=""
        />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mb-5 banner-gradiant">
                Token Details
              </h1>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-sm-12"
             
            >
              <div className="dreamit-section-title pb-5" data-wow-delay=".5s">
                <h4>WZT Tokenomics</h4>
                <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="section-text">Token Name</td>
                      <td>WalletZilla </td>
                    </tr>
                    <tr>
                      <td>Token Symbol</td>
                      <td>WZT</td>
                    </tr>
                    <tr>
                      <td>Token Supply</td>
                      <td>5 Miiilion WZT</td>
                    </tr>
                    <tr>
                      <td>Decimal</td>
                      <td>18</td>
                    </tr>
                    <tr>
                      <td>Token Address</td>
                      <td>{"0x92c94A2658f685b6d20F7b53e613cedE78b4CEB7"}</td>
                    </tr>
                  </tbody>
                </table>
                </div>
                
                {/* <p className="section-text">
                                    This whole platform is designed to work in the
                                    finance environment with any governing parties, and
                                    project owner inputs. The platform is built on self
                                    sustain smart contract technology.
                                </p> */}
                <p className="section-text">
                  Walletzilla is one of the most transformative technologies
                  since the invention of the Smart Contracts. Walletzilla stands
                  firmly in support of financial freedom and the liberty that
                  Walletzilla provides globally for anyone to voluntarily
                  participate in a permissionless and decentralized network.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="dreamit-about-thumb" data-wow-delay=".4s">
                {/* <img className='img-fluid position-absolute about-logo-img w-25 vert-move' src="assets/images/myImage/Asset 6.png" alt="" /> */}
                <img src="assets/images/myImage/Hero2.gif" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
