import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  startNow,
  getUserDetails,
  getUserBalance,
  getRoi,
  getTotalTeamBusiness,
  getStakingDetails,
  isRewardPending
} from "../helper/getWeb3";
import {
  setUserAddress,
  setUserBalance,
  setIsUserExist,
  setUserDetails,
  setDailyRoi,
  setTotalAvaialbeWithdraw,
  setTotalTeamBusiness,
  setStakingDetails,
  setIsRewardClaimPending
} from "../redux/reducer";

export const SidebarHeader = ({canWithdraw}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    startNow().then((res) => {
      dispatch(setUserAddress({ userAddress: res }));
      getUserBalance(res?.userAddress).then((balance) => {
        dispatch(setUserBalance({ userBalance: balance }));
      });
      getUserDetails(res?.userAddress).then((uDetails) => {
        dispatch(setUserDetails({ userDetails: uDetails }));
        if (uDetails?.userId !== "0") {
          dispatch(setIsUserExist({ isUserExist: true }));
        }
        getRoi(res?.userAddress).then((roi) => {
          dispatch(setDailyRoi({ dailyRoi: roi }));
          console.log(
            uDetails?.amountEarnedByRef / 1e18 +
              uDetails?.totalIncentiveEarned / 1e18 +
              roi / 1e18
          );
          dispatch(
            setTotalAvaialbeWithdraw({
              totalAvailableWithdraw:
                uDetails?.amountEarnedByRef / 1e18 +
                uDetails?.totalIncentiveEarned / 1e18 +
                roi / 1e18,
            })
          );
          setDailyRoi(roi);
        });
      });
      getTotalTeamBusiness(res?.userAddress).then((ttb) => {
        dispatch(setTotalTeamBusiness({ totalTeamBusiness: ttb }));
      });
      getStakingDetails(res?.userAddress).then((sd) => {
        const obj = {
          expTime: sd?.expTime,
          isStakingActive: sd?.isStakingActive,
          timeOfLastAmountstakede: sd?.timeOfLastAmountstakede,
          timeofLastWithdrwal: sd?.timeofLastWithdrwal,
          userLastTimeAmountTotalRewardClaimed:
            sd?.userLastTimeAmountTotalRewardClaimed,
        };
        dispatch(setStakingDetails({ stakingDetails: obj }));
      });
      isRewardPending(res?.userAddress).then((isp)=>{
        dispatch(setIsRewardClaimPending({isRewardClaimPending: isp}))
      })
    });
  }, []);

  return (
    <>
      {/* Header Start */}
      <header className="header">
        <div className="header_in d-flex align-items-center container">
          <div>
            <a href="/">
              <img
                src="assets/images/walletZilla_logo.png"
                alt="logo"
                className="img img-fluid"
                style={{ width: "80px" }}
              />
            </a>
          </div>
          <div className="ms-auto">
            <button type="button" className="toggle sidebar-button" id="toggle">
              <span></span>
            </button>
          </div>
        </div>
      </header>
      {/* Header Ends */}

      {/* Sidebar Start */}
      <div className="sidebar" id="sidebar">
        <ul>
          <li>
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/DepositDetails">Deposit Details</Link>
          </li>
          <li>
            <Link to={ "/WithdrawDetails"}>Withdraw Details</Link>
          </li>
          <li>
            <Link to="/AirdropDetails">Airdrop Details</Link>
          </li>
          <li>
            <Link to="/MyReferrals">My Referrals</Link>
          </li>
          <li>
            <Link to="/MyTeam">My Team</Link>
          </li>
          {/* <li>
            <a href="">Referral Income</a>
          </li>
         
          <li>
            <a href="">Royalty Income</a>
          </li> */}
          <li className="menu-button">
            <Link to="/Deposit">Deposit</Link>
          </li>
          <li className="menu-button">
            <Link to="/widthdraw">Widthdraw</Link>
          </li>
        </ul>
      </div>
      {/* Sidebar Ends */}
    </>
  );
};
