import React from "react";

export const AirdropRules = () => {
  return (
    <>
      <div className="container">
        {/* <div className='row'>
                    <div className='col-12'> */}
        <h1 className="text-center mb-5 banner-gradiant">Airdrop Rules</h1>
        {/* </div>
                </div> */}
        <div className="row d-flex justify-content-center ">
          <div className="col-sm-12 col-md-4">
            <div className="airdrop-rule-card m-1 d-flex align-items-center">
              <div>
                <img
                  className="img-fluid"
                  src="assets/images/myImage/AIRDROP.png"
                  alt="logo"
                  width={100}
                />
              </div>
              <div className="ms-3 text-white fw-bold  fs-4">
                10 % of total Supply is allocated for airdrop
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="airdrop-rule-card m-1 d-flex align-items-center">
              <div>
                <img
                  className="img-fluid"
                  src="assets/images/myImage/AIRDROP.png"
                  alt="logo"
                  width={100}
                />
                {/* <img className='img-fluid' src='assets/images/myImage/AIRDROP.png' alt='logo' width={100} /> */}
                {/* <img className='img-fluid' src='assets/images/walletZilla_logo.png' alt='logo' width={100}/> */}
              </div>
              <div className="ms-3 text-white fw-bold fs-4">
                Earn 3/1 of your investment as Airdrop
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
