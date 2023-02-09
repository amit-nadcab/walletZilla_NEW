import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SidebarHeader } from "../Components/SidebarHeader";

import {
  startNow,
  deployedTime,
  claimAirdrop,
  getUserDetails,
} from "../helper/getWeb3";
import { sidebarJS, calculatePercentage } from "../helper/helperFunctions";
import { setUserAddress, setUserDetails } from "../redux/reducer";
import { CONTRACT_ADDRESS } from "../helper/config";
import { Footer } from "../Components/Footer";

import { AiOutlineCopy } from "react-icons/ai";
import ReactSpeedometer from "react-d3-speedometer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { roundTo } from "round-to";
import { toast } from "react-hot-toast";
import { getTotalTeamBusiness, getManagerIncome, getTodaysTopDepositor } from "../helper/apiFunctions";

export const Dashboard = () => {
  const {
    userAddress,
    userDetails,
    dailyRoi,
    userBalance,
    isUserExist,
    totalAvailableWithdraw,
    totalTeamBusiness,
    stakingDetails,
    isLastInvestmentActive_,
    isRewardClaimPending_,
    businessPercent,
    royalityIncome,
  } = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [busnessPercent, setBusinessPercent] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [teamBusiness, setTeamBusiness] = useState(0);
  const [tab, setTab] = useState([]);


  useEffect(() => {
    getTodaysTopDepositor().then((res)=>{
      setTab(res?.data)
      // console.log(res?.data,"new Data");
    })
  }, []);

  const [d, setD] = useState(0);

  const [dd, setDD] = useState(0);

  function connectWallet() {
    startNow().then((res) => {
      dispatch(setUserAddress({ userAddress: res }));
    });
  }

  setTimeout(() => {
    setCopied(false);
  }, 2000);

  useEffect(() => {
    connectWallet();
    sidebarJS();
  }, []);

  useEffect(() => {
    getTotalTeamBusiness(userAddress?.userAddress).then((res) => {
      setTeamBusiness(res?.data[0]?.teamBusiness);
    });
  }, [userAddress?.userAddress]);

  useEffect(() => {
    if (refresh) {
      getUserDetails(userAddress?.userAddress).then((uDetails) => {
        dispatch(setUserDetails({ userDetails: uDetails }));
      });
    }
  }, [refresh, userAddress?.userAddress]);

  useEffect(() => {
    const a = calculatePercentage(
      businessPercent,
      userDetails?.userLastAmountInvested / 1e18
    );
    setBusinessPercent(a);
    // console.log(a, "sum");
  }, [totalAvailableWithdraw, userDetails?.userLastAmountInvested]);

  useEffect(() => {
    deployedTime().then((dt) => {
      let interval = setInterval(function () {
        let currentTime = new Date();
        // console.log(Number(dt) * 1000,"Time");
        let elapsedTime = currentTime - Number(dt) * 1000;

        let days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor(
          (elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        // console.log(days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s");
        setD(days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s");
      }, 1000);
    });
  }, []);
  function countDown(endDate) {
    let timer = setInterval(function () {
      let now = new Date().getTime();
      let distance = endDate - now;

      if (distance < 0) {
        clearInterval(timer);
        console.log("Countdown finished.");
        setDD("You can Withdraw");
        setCanWithdraw(true);
      } else {
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setDD(
          days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s "
        );
      }
    }, 1000);
  }
  useEffect(() => {
    if (userAddress?.userAddress) {
      // console.log(isUserExist, "isUserExist 1");
      if (isUserExist && stakingDetails?.timeofLastWithdrwal == 0) {
        // console.log((stakingDetails?.timeOfLastAmountstakede)*1000,"Last Withdrwa");
        // countDown((Number(stakingDetails?.timeOfLastAmountstakede)*1000) +(7*24*60*60*1000))
        countDown(
          Number(stakingDetails?.timeOfLastAmountstakede) * 1000 +
            7 * 24 * 60 * 60 * 1000
        );
      } else if (isUserExist && stakingDetails?.timeofLastWithdrwal != 0) {
        // console.log((Number(stakingDetails?.timeOfLastAmountstakede)*1000) +(7*24*60*60*1000),"Last Deposit");
        // countDown((Number(stakingDetails?.timeofLastWithdrwal)*1000) +(7*24*60*60*1000))
        countDown(
          Number(stakingDetails?.timeofLastWithdrwal) * 1000 + 7 * 24 * 60 * 60 * 1000
        );
      }
    } else {
      setDD(0);
    }
    // countDown(1675147148058)
  }, [userAddress?.userAddress, stakingDetails]);

  return (
    <>
      <SidebarHeader canWithdraw={canWithdraw} />
      {/* userAddress-card-start */}
      <section className="pb_50 mt-5 pt-5">
        <div className="container mt-3">
          <div className="row d-none d-md-block d-lg-block d-sm-block">
            <div className="col-12 mx-auto" style={{ width: "90%" }}>
              <div className="withdraw-card d-flex flex-row">
                <div className="col-6">
                  <p>
                    {/* <AiFillRightCircle color="pink" /> */}
                    <span className="dashboard-header-list-li-heading">
                      Contract Address :{" "}
                    </span>
                  </p>
                  <p>
                    {/* <AiFillRightCircle color="pink" /> */}
                    <span className="dashboard-header-list-li-heading">
                      Platform Running Time:
                    </span>
                  </p>
                  <p>
                    {/* <AiFillRightCircle color="pink" /> */}
                    <span className="dashboard-header-list-li-heading">
                      Income :
                    </span>
                  </p>
                  <p>
                    {/* <AiFillRightCircle color="pink" /> */}
                    <span className="dashboard-header-list-li-heading">
                      Next Withdraw :
                    </span>
                  </p>
                  <p>
                    {/* <AiFillRightCircle color="pink" /> */}
                    <span className="dashboard-header-list-li-heading">
                      Wallet Address :
                    </span>
                  </p>
                  <p>
                    {/* <AiFillRightCircle color="pink" /> */}
                    <span className="dashboard-header-list-li-heading">
                      Wallet Balance :
                    </span>
                  </p>
                  <p>
                    {/* <AiFillRightCircle color="pink" /> */}
                    <span className="dashboard-header-list-li-heading">
                      UpLine ID :
                    </span>
                  </p>
                  <p>
                    <span className="dashboard-header-list-li-heading">
                      Referral Link :
                    </span>
                  </p>
                </div>
                <div className="col-6">
                  <p>
                    {CONTRACT_ADDRESS
                      ? CONTRACT_ADDRESS.substr(0, 10) +
                        "......." +
                        CONTRACT_ADDRESS.substr(35)
                      : 0}
                  </p>
                  <p>{d ? d : 0}</p>
                  <p>1.4 % daily</p>
                  <p>{dd ? dd : 0}</p>
                  <p>
                    {userAddress.userAddress
                      ? userAddress.userAddress.substr(0, 10) +
                        "......." +
                        userAddress.userAddress.substr(35)
                      : "0x0000"}
                  </p>
                  <p>{userBalance ? roundTo(userBalance / 1e18, 4) : 0} BUSD</p>
                  <p>
                    {userDetails?.userRefferdBy
                      ? userDetails?.userRefferdBy
                      : 0}
                  </p>
                  {isUserExist ? (
                    <p>
                      <span className="ref-link">
                        {`http://localhost:3000/Deposit?sponsorid=${userDetails?.userId}`}
                      </span>{" "}
                      <CopyToClipboard
                        text={`http://localhost:3000/Deposit?sponsorid=${userDetails?.userId}`}
                        onCopy={() => setCopied(true)}
                      >
                        <AiOutlineCopy color="pink" />
                      </CopyToClipboard>
                      {copied ? (
                        <span className="text-white p-2">Copied</span>
                      ) : null}
                    </p>
                  ) : (
                    "Stake BUSD to get Referral Link"
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row d-block d-sm-none d-md-none d-lg-none">
            <div className="col-12 mx-auto" style={{ width: "100%" }}>
              <div className="withdraw-card text-center">
                <div className="d-flex flex-row">
                  <div className="col-6">
                    <p>
                      {/* <AiFillRightCircle color="pink" /> */}
                      <span className="dashboard-header-list-li-heading">
                        <b>Contract Address :</b>{" "}
                      </span>
                    </p>
                    <p>
                      {/* <AiFillRightCircle color="pink" /> */}
                      <span className="dashboard-header-list-li-heading">
                        <b> Platform Running Time:</b>
                      </span>
                    </p>
                    <p>
                      {/* <AiFillRightCircle color="pink" /> */}
                      <span className="dashboard-header-list-li-heading">
                        <b> Income : </b>
                      </span>
                    </p>
                    <p>
                      {/* <AiFillRightCircle color="pink" /> */}
                      <span className="dashboard-header-list-li-heading">
                        <b> Next Withdraw : </b>
                      </span>
                    </p>
                    <p>
                      {/* <AiFillRightCircle color="pink" /> */}
                      <span className="dashboard-header-list-li-heading">
                        <b> Wallet Address : </b>
                      </span>
                    </p>
                    <p>
                      {/* <AiFillRightCircle color="pink" /> */}
                      <span className="dashboard-header-list-li-heading">
                        <b> Wallet Balance : </b>
                      </span>
                    </p>
                    <p>
                      {/* <AiFillRightCircle color="pink" /> */}
                      <span className="dashboard-header-list-li-heading">
                        <b> Upline ID : </b>
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="card-value-size">
                      {CONTRACT_ADDRESS
                        ? CONTRACT_ADDRESS.substr(0, 5) +
                          "......." +
                          CONTRACT_ADDRESS.substr(35)
                        : 0}
                    </p>
                    <p className="card-value-size">
                      <p>{d ? d : 0}</p>
                    </p>
                    <p className="card-value-size">1.4 % daily</p>
                    <p className="card-value-size">{dd ? dd : 0}</p>
                    <p className="card-value-size">
                      {userAddress.userAddress
                        ? userAddress.userAddress.substr(0, 5) +
                          "......." +
                          userAddress.userAddress.substr(35)
                        : "0x0000"}
                    </p>
                    <p className="card-value-size">
                      {userBalance ? roundTo(userBalance / 1e18, 4) : 0} BUSD
                    </p>
                    <p className="card-value-size">
                      {userDetails?.userRefferdBy
                        ? userDetails?.userRefferdBy
                        : 0}
                    </p>
                  </div>
                </div>
                <p className="card-value-size">
                  <span className="dashboard-header-list-li-heading">
                    <u>Referal Link :</u>
                  </span>
                </p>
                {isUserExist ? (
                  <p>
                    <span className="ref-link">
                      {`http://localhost:3000/Deposit?sponsorid=${userDetails?.userId}`}
                    </span>{" "}
                    <CopyToClipboard
                      text={`http://localhost:3000/Deposit?sponsorid=${userDetails?.userId}`}
                      onCopy={() => setCopied(true)}
                    >
                      <AiOutlineCopy color="pink" />
                    </CopyToClipboard>
                    {copied ? (
                      <span className="text-white p-2">Copied</span>
                    ) : null}
                  </p>
                ) : (
                  "Stake BUSD to get Referral Link"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* userAddress-card-End */}

      {/* Referal Link Start */}
      {/* <div className="d-flex justify-content-center mt-5">
        <div className="col-lg-4">
          <div className="cardBgInner">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <h5 className="text-center my-2 text-warning">
                      Referal Link
                    </h5>
                  </div>
                  <div className="input-group address">
                    <input
                      id="copy"
                      type="text"
                      readOnly
                      className="form-control"
                      //placeholder={UserReferal}
                      // value={}
                      aria-label="referal"
                      aria-describedby="basic-addon2"
                    />
                    <span
                      className="input-group-text"
                      id="basic-addon2"
                    // onClick={}
                    >
                      Copy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Referal Link Ends */}

      {/* UserAddress Start*/}
      {!userAddress.userAddress ? (
        <section className="pb_50">
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          ></div>
          <div className="container">
            <div className="all_heading text-center">
              <h2>
                <span className="busd-stake-gradiant">Join Us now</span>&nbsp;
              </h2>
              <div
                className="small_heading my-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {true ? (
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      connectWallet();
                    }}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pt_50 pb_50">
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          ></div>

          <div className="container">
            <div className="all_heading text-center">
              {/* <h2>
                <span></span>&nbsp;
              </h2> */}
              <div
                className="small_heading my-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {0 > 5 ? (
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* UserAddress End*/}

      {/*Global section 1 start */}
      <section className="mt-3">
        <div className="container mt-3">
          <div className="row cus_row">
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4> Active Investment Amount </h4>
                <h5>
                  <a
                    href="#"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <span className="amount-number">
                      <b>
                        {" "}
                        {!isLastInvestmentActive_
                          ? 0
                          : userDetails?.userLastAmountInvested &&
                            userDetails?.userLastAmountInvested / 1e18}
                      </b>
                    </span>{" "}
                    BUSD
                    {/* <FiExternalLink
                      size={18}
                      className="mx-1 pb-1"
                      color="white"
                    /> */}
                  </a>
                </h5>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Total Profit</h4>
                <p>
                  <b>
                    <span className="amount-number">{0}</span>
                  </b>{" "}
                  BUSD
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Direct Member </h4>
                <p>
                  {" "}
                  <span className="amount-number">
                    {" "}
                    {userDetails?.totalDirects ? userDetails?.totalDirects : 0}
                  </span>{" "}
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Total Team Business</h4>
                <p>
                  {" "}
                  <span className="amount-number">
                    {" "}
                    <b>{teamBusiness ? teamBusiness : 0}</b>{" "}
                  </span>{" "}
                  BUSD
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4> Total Direct Referral income</h4>
                <p>
                  {" "}
                  <span className="amount-number">
                    {" "}
                    <b>
                      {userDetails?.amountEarnedByRef
                        ? roundTo(userDetails?.amountEarnedByRef / 1e18, 4)
                        : 0}
                    </b>
                  </span>{" "}
                  BUSD
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Total Level Income</h4>
                <p>
                  <span className="amount-number">
                    {" "}
                    <b>
                      {userDetails?.totalIncentiveEarned
                        ? roundTo(userDetails?.totalIncentiveEarned / 1e18, 4)
                        : 0}
                    </b>{" "}
                  </span>{" "}
                  BUSD
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Total Daily Divident</h4>
                <p>
                  <span className="amount-number">
                    {" "}
                    <b>{dailyRoi ? roundTo(dailyRoi / 1e18, 4) : 0}</b>{" "}
                  </span>{" "}
                  BUSD
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Manager Income</h4>
                <p>
                  <span className="amount-number">
                    {" "}
                    <b>
                      {royalityIncome?.managerIncome
                        ? roundTo(royalityIncome?.managerIncome / 1e18, 4)
                        : 0}
                    </b>{" "}
                  </span>{" "}
                  BUSD
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Senior Manager Income</h4>
                <p>
                  <span className="amount-number">
                    {" "}
                    <b>
                      {royalityIncome?.seniorManagerIncome
                        ? roundTo(royalityIncome?.seniorManagerIncome / 1e18, 4)
                        : 0}
                    </b>{" "}
                  </span>{" "}
                  BUSD
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Global section 1 Ends */}

      {/* UserAddress Deposit Withdrwa Start*/}

      <section className="pb_50">
        <div className="container">
          <div className="row">
            <div className=" col-md-4 mb-3">
              <div className="withdraw-card">
                {/* <img
                  className="img-fluid"
                  src="assets/images/myImage/deposit.png"
                  alt="deposit-logo"
                  width={200}
                /> */}
                <div className="text-center">
                  <ReactSpeedometer
                    maxValue={300}
                    value={busnessPercent ? roundTo(busnessPercent, 2) : 0}
                    currentValueText={`${
                      busnessPercent ? roundTo(busnessPercent, 2) : 0
                    } %`}
                    needleColor="pink"
                    startColor="Purple"
                    segments={10}
                    endColor="blue"
                    height={195}
                    textColor="white"
                  />
                </div>
                <div className="text-center">
                  <button
                    className="grad_btn btn-block mx-4 "
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      if (userAddress?.userAddress) {
                        if (isLastInvestmentActive_) {
                          toast("Your Staking is Active");
                        } else {
                          if (isRewardClaimPending_) {
                            toast("Withdraw Balance Reward First");
                          } else {
                            navigate("/Deposit");
                          }
                        }
                      } else {
                        toast("Connect Wallet to Deposit");
                      }
                    }}
                  >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-md-4 mb-3">
              <div className="withdraw-card">
                <div className="text-center">
                  <p>
                    <b>BUSD Withdraw Balance</b>{" "}
                  </p>
                  <div className="d-flex flex-row justify-content-evenly">
                    <div className="me-5">
                      <img
                        className="img-fluid"
                        src="assets/images/myImage/withdraw.png"
                        alt="deposit-logo"
                        width={185}
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <h3 className="mx-auto">
                        <span className="amount-number">
                          {totalAvailableWithdraw
                            ? roundTo(totalAvailableWithdraw, 4)
                            : 0}
                        </span>{" "}
                        BUSD
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      if (userAddress?.userAddress) {
                        if (canWithdraw) {
                          navigate("/widthdraw");
                        } else {
                          toast("Waith for next withdraw cycle");
                        }
                      } else {
                        toast("Connect Wallet to Withdraw");
                      }
                    }}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
            <div className=" col-md-4">
              <div className="withdraw-card">
                <div className="text-center">
                  <p>
                    <b> WZT Airdrop Balance</b>{" "}
                  </p>
                  <div className="d-flex flex-row justify-content-evenly">
                    <div className="me-5">
                      <img
                        className="img-fluid"
                        src="assets/images/myImage/withdraw.png"
                        alt="deposit-logo"
                        width={185}
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <h3 className="mx-auto">
                        {" "}
                        <span className="amount-number">
                          {userDetails?.airdropReward
                            ? roundTo(userDetails?.airdropReward / 1e18, 4)
                            : 0}
                        </span>{" "}
                        WZT
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      if (userAddress?.userAddress) {
                        if (userDetails?.airdropReward > 0) {
                          claimAirdrop(userAddress?.userAddress, setRefresh);
                        } else {
                          toast("Airdrop not avaialbe");
                        }
                      } else {
                        toast("Connect Wallet to Claim Airdrop");
                      }
                    }}
                  >
                    Claim Airdrop
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UserAddress Deposit Withdrwa Ends*/}
      <section className="pb_50">
        <div className="container">
          <div className="row cus_row">
            <div className="col-md-6 col-12">
              <div className="Personal_Details_inner Personal_bg">
                <h4 className="text-center">Top Depositor Income</h4>
                <p className="amount-number">
                  <b>
                    {" "}
                    {royalityIncome?.topDepositor
                      ? roundTo(royalityIncome?.topDepositor / 1e18, 4)
                      : 0}
                  </b>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="Personal_Details_inner Personal_bg">
                <h4 className="text-center">Total Widthdraw</h4>
                <p className="amount-number">
                  <b>
                    {userDetails?.totalWithdraw
                      ? userDetails?.totalWithdraw / 1e18
                      : 0}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Start*/}
      <section className="pb_50">
        <div className="container">
          <div className=" text-center">
            <h2>
              <span className="busd-stake-gradiant">Current Top Depositors</span>
            </h2>
          </div>
          <div className="row cus_row">
            <div className=" col-12">
              <div className="Personal_Details_inner_">
                <div className="table-responsive">
                  <table className="table mt-3 rs-table">
                    <thead className="thead-light">
                      <tr>
                        {/* <th scope="col">Sr No.</th> */}
                        <th scope="col">Sr. No.</th>
                        <th scope="col">User ID</th>
                        <th scope="col">Amount</th>
                        <th scope="col">User Address</th>
                        <th scope="col">Date </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tab && tab.length > 0 ? (
                        tab.map((e, i) => {
                          const test = new Date(
                            Number(e.block_timestamp) * 1000
                          );

                          return (
                            <>
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{e?.uiserId}</td>
                                <td>{e?.AmountInv ? roundTo((e?.AmountInv / 1e18),4) : 0} BUSD</td>
                                <td>
                                  {" "}
                                  {e?.userAddress.substr(0, 10) +
                                    "......." +
                                    e?.userAddress.substr(35)}
                                </td>
                                <td>{test?.toLocaleString('en-US', {hour12: true })}</td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <div className="text-white text-center">
                          No Data Found
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* second row */}
          {/* <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>Direct Sponsor Income</h4>
                <h5>5</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>Stair Income</h4>
                <h5>5</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div className="Personal_Details_inner">
                <h4>Total Available Income</h4>
                <h5>5</h5>
              </div>
            </div>
          </div> */}
          {/* Third row */}
          {/* <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Total Income</h4>
                <h5>5</h5>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner">
                <h4>Total Withdrawal</h4>
                <h5>5</h5>
              </div>
            </div>
          </div> */}
          {/* fourth row*/}
          {/* <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Roi Income</h4>
                <h5>5</h5>
                <button
                  className="grad_btn my-2"
                // onClick={onWithdraw}
                >
                  Withdraw Roi
                </button>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Royalty Income</h4>
                <h5> Royalty Wallet</h5>
                <button
                  className="grad_btn my-2"
                // onClick={onRoyaltyWithdraw}
                >
                  Withdraw Royalty
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      {/* Footer Start */}
      <Footer />
      {/* Footer Ends */}
    </>
  );
};
