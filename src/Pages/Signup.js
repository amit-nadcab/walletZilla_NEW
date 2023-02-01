import React from 'react'
import { Link } from 'react-router-dom';

export const Signup = () => {
  return (
    <>
    <section className="siginin-section">
        <div className="signin-middle-container">
          <div className="container">
            <div className="outer-form-signin col-md-12 shadow ">
              <div className="row">
                <div className="inner-form-signin col-md-12">
                  <div>
                    <Link to="/">
                      <img src="assets/images/walletZilla_logo.png" alt="" className="signin-logo" />
                    </Link>
                    <h1 className="text-center fw-bolder text-primary">
                      Sign Up
                    </h1>
                    {/* <p className="pt-4 fw-bold text-light">
                      Buy Price: 1 Matic ~ 1407 MFI
                    </p> */}
                    <div className="mb-3 ps-4 pe-4">
                      <p className="mt-3 mb-2 text-start ps-2  text-white">
                        Sponser Id
                      </p>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Sponser Id *"
                        name="sponserId"
                        required
                        // value={0x0000000000000000}
                        autoComplete="off"
                        // onChange={(e) => {
                        //   setSponserAddress(
                        //     e.target.value
                        //       ?.replace(/[^0-9.]/, "")
                        //       .replace(/(\..?)\../g, "$1")
                        //   );
                        // }}
                      />
                      {1< 0 && 0<1 ? (
                        <div
                          className="text-danger signup-label mt-2 fw-bold"
                          id="ider"
                        >
                          Enter Sponser Id
                        </div>
                      ) : null}
                      <div
                        className="text-danger signup-label mt-2 fw-bold"
                        id="ider"
                        style={{ display: "none" }}
                      ></div>
                      <p className="mt-3 mb-2 text-start ps-2  text-white">
                        Enter BUSD Amount
                      </p>
                      <input
                        type="text"
                        className="form-control pt-3 mt-3"
                        placeholder="Enter Matic Amount *"
                        value={500}
                        autoComplete="off"
                        // onChange={(e) => {
                        //   setCakeAmount(
                        //     e.target.value
                        //       ?.replace(/[^0-9.]/, "")
                        //       .replace(/(\..?)\../g, "$1")
                        //   );
                        // }}
                      />

                      {/* {!(cakeAmount % 3 == 0 && cakeAmount % 5 == 0) ? (
                        <div className="text-danger text-start fw-bold">
                          {" "}
                          Matic Amount Must be Multiple of 15{" "}
                        </div>
                      ) : null} */}
                      {/* <div className="row">
                        <div className="col-4 pt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => increment(15)}
                          >
                            + 15 Matic
                          </button>
                        </div>
                        <div className="col-4 pt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => increment(30)}
                          >
                            + 30 Matic
                          </button>
                        </div>
                        <div className="col-4 pt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => increment(45)}
                          >
                            + 45 Matic
                          </button>
                        </div>
                        <div className="col-4 pt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => increment(60)}
                          >
                            + 60 Matic
                          </button>
                        </div>
                        <div className="col-4 pt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => increment(75)}
                          >
                            + 75 Matic
                          </button>
                        </div>
                        <div className="col-4 pt-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => increment(90)}
                          >
                            + 90 Matic
                          </button>
                        </div>
                      </div> */}

                      <button className='header-buttons'
                        // onClick={async () => {
                        //   const res = await idToaddress(address);
                        //   if (res) {
                        //     if (
                        //       cakeAmount % 3 == 0 &&
                        //       cakeAmount % 5 == 0 &&
                        //       cakeAmount > 0 &&
                        //       address > 0
                        //     ) {
                        //       var data = await Instance.web3.utils.toWei(
                        //         cakeAmount?.toString(),
                        //         "ether"
                        //       );
                        //       var amount = await Instance.web3.eth.getBalance(
                        //         Instance.userAddress
                        //       );
                        //       //Investment(data, data, address);

                        //       if (amount / 1e18 > cakeAmount) {
                        //         Investment(data, data, address);
                        //       } else {
                        //         NotificationManager.error(
                        //           "Insufficient balance! !!.. "
                        //         );
                        //       }
                        //     } else {
                        //       NotificationManager.error(
                        //         "amount must be multiple of 15!"
                        //       );
                        //     }
                        //   } else {
                        //     NotificationManager.error("Wrong Sponser Id !");
                        //   }
                        // }}
                        // type="button"
                        // className="btn btn-primary btn-lg mt-4 connect-wallet-btn"
                        // style={{
                        //   opacity: address == 0 || cakeAmount == 0 ? 0.6 : 1,
                        // }}
                      >
                        Buy
                      </button>

                      <h3 className="pt-4 pb-3 fw-bold text-white">
                        Already joined?
                      </h3>
                      <Link to="/signin">
                        <button
                          type="button"
                          className="btn btn-primary join-here-btn connect-wallet-btn"
                        >
                          Sign In
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
