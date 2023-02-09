import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { sidebarJS } from "../helper/helperFunctions";
import { buy, startNow, isUserExist, getUserDetails } from "../helper/getWeb3";
import { setUserAddress } from "../redux/reducer";
import { SidebarHeader } from "../Components/SidebarHeader";
import { UserAddress } from "../Components/UserAddress";
import { toast } from "react-hot-toast";
import { roundTo } from "round-to";

export const Deposit = () => {
  const { userAddress, userBalance } = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [stakeAmount, setStaleAmount] = useState(0);
  const [sponsorId, setSponsorId] = useState(0);
  const [haveSponsorId, setHaveSponsorId] = useState(false);
  const [ref, setRef] = useState("");
  const [showLink, setShowLink] = useState(true)
  const [referredBy, setReferredBy] = useState('')
  const [refresh, setRefresh] = useState(false)

  const [userExist, setUserExist] = useState(true);
  const [isSponsorIdBlank, setIsSponsorId] = useState(false);

  useEffect(() => {
    setRef(location?.search.slice(11));
    if (location?.search.slice(11)) {
      setShowLink(false)
    }
    if (refresh) (
      navigate('/Dashboard')
    )
  }, []);

  useEffect(() => {
    getUserDetails(userAddress?.userAddress).then((res) => {
      setReferredBy(res?.userRefferdBy)
      if (res?.userId === '0') {
        setUserExist(false)
      }
    })
  }, [userAddress])


  useEffect(() => {
    if (refresh) (
      navigate('/Dashboard')
    )
  }, [refresh])

useEffect(()=>{
  console.log(window.ethereum,"aa mask");
},[])
  // console.log(stakeAmount, "stakeAmount", typeof stakeAmount);
  function connectWallet() {
    startNow().then((res) => {
      console.log(res, "address");
      dispatch(setUserAddress({ userAddress: res }));
    });
  }

  useEffect(() => {
    connectWallet();
    sidebarJS();
  }, []);

  return (
    <>
      <SidebarHeader />

      <section className="siginin-section">
        <div className="signin-middle-container">

          <div className="container">

            <div className="outer-form-signin col-md-12 ">

              <div className="row">
                <div className="inner-form-signin col-md-12">
                  <div>
                    <Link to="/">
                      <img
                        src="assets/images/walletZilla_logo.png"
                        alt=""
                        className="signin-logo"
                      />
                    </Link>

                    {/* <h1 className="text-center fw-bolder text-primary">
                      Sign Up
                    </h1> */}
                    {/* <p className="pt-4 fw-bold text-light">
                      Buy Price: 1 Matic ~ 1407 MFI
                    </p> */}



                    <div className="mb-3 ps-4 pe-4">

                      <div className="row pt-2 pb-3">

                        <div className="col-6 text-white text-start">

                          <span className="text-white " style={{ fontSize: '12px' }}> Wallet Balance : <span style={{ color: "#00f700" }} className="fw-bold mob-align"> {userBalance ? roundTo((userBalance / 1e18), 4) : 0}</span></span>


                        </div>
                        <div className="col-6 pb-0 text-end">
                          <p class="mb-0" style={{ fontSize: '12px', color: "#ffff" }}>Wallet Address: <span style={{ color: "#00f700" }} className="fw-bold mob-align">{userAddress && userAddress.userAddress.substr(0, 7) +
                            "......." +
                            userAddress.userAddress.substr(34)}</span> </p>

                        </div>
                      </div>
                      {haveSponsorId || ref ? (
                        <>
                        <div className="form-group">
                          <label className="">
                            Sponsor Id
                          </label>
                          <input
                            type="text"
                            className="form-control px-2"
                            placeholder="Enter Sponsor Id"
                            name="sponserId"
                            required
                            value={ref ? ref : sponsorId}
                            autoComplete="off"
                            onChange={(e) => {
                              setSponsorId(
                                e.target.value
                                  ?.replace(/[^0-9.]/, "")
                                  .replace(/(\..?)\../g, "$1")
                              );
                              console.log(e.target.value
                                ?.replace(/[^0-9.]/, "")
                                .replace(/(\..?)\../g, "$1"));
                            }}
                          />
                          {isSponsorIdBlank ? (
                            <div
                              className="text-danger signup-label mt-2 fw-bold"
                              id="ider"
                            >
                              Enter Sponsor Id
                            </div>
                          ) : null}
                          <div
                            className="text-danger signup-label mt-2 fw-bold"
                            id="ider"
                            style={{ display: "none" }}
                          ></div>
                          </div>
                        </>
                      ) : null}


                      <div class="form-group mb-2">
                        <label class="">Enter BUSD Amount*</label>
                        <input
                          type="text"
                          className="form-control px-2"
                          placeholder="Enter BUSD Amount"
                          value={stakeAmount}
                          autoComplete="off"
                          onChange={(e) => {

                            setStaleAmount(Number(
                              e.target.value
                                ?.replace(/[^0-9.]/, "")
                                .replace(/(\..?)\../g, "$1"))
                            );


                          }}
                        />
                        <small className="form-text text-info" style={{ fontSize: '12px' }}> Minimum deposit 50 BUSD to max 10000 BUSD</small>

                      </div>

                      {!userExist ? (showLink ?
                        <p className="text-end text-white">
                          Have a Sponsor ID?{" "}
                          <span
                            className="have-sponsor-link"
                            onClick={() => {
                              setShowLink(false)
                              setHaveSponsorId(true)
                            }}
                          >
                            {" "}
                            <ins>Click Here</ins>{" "}
                          </span>
                        </p> : null
                      ) : ("")}



                      <div className="d-flex flex-direction-row justify-content-between mx-auto mt-3 width80">
                        <div className="text-white deposit-calculator btn btn-sm"> you invest <br />{stakeAmount}</div>
                        <div className="text-white deposit-calculator btn btn-sm d-flex align-items-center justify-content-center"> 1.4 % daily</div>
                        <div className="text-white deposit-calculator btn btn-sm">you get <br />{stakeAmount * 300 / 100}</div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary join-here-btn connect-wallet-btn mt-3"
                        onClick={() => {
                          if (userExist) {
                            if (stakeAmount >= 50 && stakeAmount <= 10000) {
                              console.log(referredBy, "referredBy - 1");
                              buy(userAddress?.userAddress, stakeAmount, referredBy, setRefresh);
                            } else {
                              toast.error("BUSD Amount should be min 50 max 10000")
                            }
                          } else if (!userExist) {
                            if (ref ? ref : sponsorId) {
                              isUserExist(ref ? ref : sponsorId).then((res) => {
                                if (res) {
                                  if (stakeAmount >= 50 && stakeAmount <= 10000) {
                                    console.log(ref, "referredBy", sponsorId, " - 2");
                                    buy(userAddress?.userAddress, stakeAmount, ref ? ref : sponsorId, setRefresh);
                                  } else {
                                    toast.error("BUSD Amount should be min 50 max 10000")
                                  }
                                } else {
                                  toast.error("Enter Valid Sponsor ID")
                                }
                              })
                            } else {
                              if (stakeAmount >= 50 && stakeAmount <= 10000) {
                                buy(userAddress?.userAddress, stakeAmount, 3999, setRefresh);
                              } else {
                                toast.error("BUSD Amount should be min 50 max 10000")
                              }
                            }

                          }
                        }}
                      >
                        Deposit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
