import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  startNow,
  getUserDetails,
  getUserBalance,
  getRoi,
  getStakingDetails,
  isLastInvestmentActive,
  isRewardClaimPending,
  getManagerIncome
} from "../helper/getWeb3";
import {
  setUserAddress,
  setUserBalance,
  setIsUserExist,
  setUserDetails,
  setDailyRoi,
  setTotalAvaialbeWithdraw,
  setStakingDetails,
  setIsLastInvestmentActive,
  setIsRewardClaimPending,
  setBusinessPercent,
  setRoyalityIncome
} from "../redux/reducer";

export const SidebarHeader = ({ canWithdraw }) => {
  const { isLastInvestmentActive_, isRewardClaimPending_ } = useSelector((state) => state.data.value);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
          getStakingDetails(res?.userAddress).then((sd) => {
            const obj = {
              expTime: sd?.expTime,
              isStakingActive: sd?.isStakingActive,
              timeOfLastAmountstakede: sd?.timeOfLastAmountstakede,
              timeofLastWithdrwal: sd?.timeofLastWithdrwal,
              userLastTimeAmountTotalRewardClaimed:
                sd?.userLastTimeAmountTotalRewardClaimed,
            };
            getManagerIncome(res?.userAddress).then((managerIncome)=>{
              dispatch(setRoyalityIncome({royalityIncome: managerIncome}))
            
            dispatch(setStakingDetails({ stakingDetails: obj }));
            dispatch(setDailyRoi({ dailyRoi: roi }));
            console.log(((managerIncome?.topDepositor)),"1");
            console.log(((managerIncome?.seniorManagerIncome)/1e18),"2");
            console.log(((managerIncome?.managerIncome)/1e18),"3");
            dispatch(setTotalAvaialbeWithdraw({ totalAvailableWithdraw: uDetails?.amountEarnedByRef / 1e18 + uDetails?.totalIncentiveEarned / 1e18 + (roi / 1e18) +((managerIncome?.topDepositor)/1e18) + ((managerIncome?.seniorManagerIncome)/1e18) + ((managerIncome?.managerIncome)/1e18)}));
            dispatch(setBusinessPercent({ businessPercent: uDetails?.amountEarnedByRef / 1e18 + uDetails?.totalIncentiveEarned / 1e18 + roi / 1e18 + sd?.userLastTimeAmountTotalRewardClaimed/1e18 +
            ((managerIncome?.topDepositor)/1e18) + ((managerIncome?.seniorManagerIncome)/1e18) + ((managerIncome?.managerIncome)/1e18)}))
            setDailyRoi(roi);
          });
        })

        });
      });
      isLastInvestmentActive(res?.userAddress).then((isp) => {
        dispatch(setIsLastInvestmentActive({ isLastInvestmentActive_: isp }))
      })
      isRewardClaimPending(res?.userAddress).then((cp) => {
        dispatch(setIsRewardClaimPending({ isRewardClaimPending_: cp }))
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
            <Link to={"/WithdrawDetails"}>Withdraw Details</Link>
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
          <li>
            <Link to="/DailyTopDepositorIncome">Daily Top Depositor</Link>
          </li>
          <li>
            <Link to="/MyTeam">Manager Income</Link>
          </li>
          <li>
            <Link to="/MyTeam">Senior Manager Income</Link>
          </li>
          
      
          <li className="menu-button">
            <a href="" onClick={() => {
              if (isRewardClaimPending_) {
                toast("Withdraw Balance Reward First")
              } else {
                navigate("/Deposit");
              }
            }}>Deposit</a>
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
