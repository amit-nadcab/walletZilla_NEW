import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { sidebarJS } from "../helper/helperFunctions";
import { claimReward } from "../helper/getWeb3";
import { SidebarHeader } from "../Components/SidebarHeader";
import { Footer } from "../Components/Footer";
import { roundTo } from "round-to";
import { toast } from "react-hot-toast";

export const Widthdraw = () => {
  const {
    userAddress,
    userDetails,
    dailyRoi,
    totalAvailableWithdraw,
    royalityIncome,
    
  } = useSelector((state) => state.data.value);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    sidebarJS();
  }, []);

  useEffect(() => {
    if (refresh) {
      navigate("/Dashboard");
    }
  }, [refresh]);

  useEffect(() => {}, [userAddress?.userAddress]);
  return (
    <>
      <SidebarHeader />
      <section className="siginin-section">
        <div className="signin-middle-container">
          <div className="container">
            <div className="outer-form-signin col-md-12 shadow">
              <div className="row">
                <div className="inner-form-signin col-md-12">
                  <div>
                    <span >
                      <img
                        src="assets/images/walletZilla_logo.png"
                        alt=""
                        className="signin-logo"
                      />
                    </span>
                    <div className="withdraw-heading-wrapper pt-1 mb-3 mt-3">
                      <h3 className="text-center text-white pb-2">Withdraw</h3>
                    </div>
                    <div className="IndCon">
                      <div className="envDK">
                        <div className="envNz flexC fl-bet">
                          <div className="envNH">Direct Referal Income</div>
                          <div className="envNS">
                            <span className="unfreezed">
                              {userDetails?.amountEarnedByRef
                                ? userDetails?.amountEarnedByRef / 1e18
                                : 0}
                            </span>{" "}
                            <span className="amount-unit">BUSD</span>
                          </div>
                        </div>
                        <div className="envNz flexC fl-bet">
                          <div className="envNH">Daily Reward</div>
                          <div className="envNS">
                            <span className="staticReward">
                              {dailyRoi ? roundTo(dailyRoi / 1e18, 4) : 0}
                            </span>{" "}
                            <span className="amount-unit">BUSD</span>
                          </div>
                        </div>
                        <div className="envNz flexC fl-bet">
                          <div className="envNH">Team Level Income</div>
                          <div className="envNS">
                            <span className="directReward">
                              {userDetails?.totalIncentiveEarned
                                ? roundTo(
                                    userDetails?.totalIncentiveEarned / 1e18,
                                    4
                                  )
                                : 0}
                            </span>{" "}
                            <span className="amount-unit">BUSD</span>
                          </div>
                        </div>
                        {/* <div className="envNz flexC fl-bet">
                          <div className="envNH">
                            Level Income
                          
                          </div>
                          <div className="envNS">
                            <span className="level3Reward">0.00</span> BUSD
                          </div>
                        </div> */}
                        <div className="envNz flexC fl-bet">
                          <div className="envNH">Manager Income</div>
                          <div className="envNS">
                            <span className="level4Reward">
                              {royalityIncome?.managerIncome
                                ? roundTo(
                                    royalityIncome?.managerIncome / 1e18,
                                    4
                                  )
                                : 0}
                            </span>{" "}
                            <span className="amount-unit">BUSD</span>
                          </div>
                        </div>
                        <div className="envNz flexC fl-bet">
                          <div className="envNH">Senior Manager Income</div>
                          <div className="envNS">
                            <span className="level5Reward">
                              {royalityIncome?.seniorManagerIncome
                                ? roundTo(
                                    royalityIncome?.seniorManagerIncome / 1e18,
                                    4
                                  )
                                : 0}
                            </span>{" "}
                            <span className="amount-unit">BUSD</span>
                          </div>
                        </div>
                        <div className="envNz flexC fl-bet">
                          <div className="envNH">Lucky Pool Reward</div>
                          <div className="envNS">
                            <span className="luckReward">
                              {royalityIncome?.topDepositor
                                ? roundTo(
                                    royalityIncome?.topDepositor / 1e18,
                                    4
                                  )
                                : 0}
                            </span>{" "}
                            <span className="amount-unit">BUSD</span>
                          </div>
                        </div>
                      </div>
                      <div className="envNz flexC fl-bet envDKA">
                        <div className="envNH">Available withdrawal</div>
                        <div className="envNS">
                          <span className="totalReward">
                            {totalAvailableWithdraw
                              ? roundTo(totalAvailableWithdraw, 4)
                              : 0}
                          </span>{" "}
                          <span className="amount-unit">BUSD</span>
                        </div>
                      </div>

                      <Link
                        to=""
                        className="grad_btn btn-block"
                        onClick={() => {
                          if (totalAvailableWithdraw > 0) {
                            claimReward(userAddress?.userAddress, setRefresh);
                          } else {
                            toast("No Balance for withdraw");
                          }
                        }}
                      >
                        Withdraw
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Footer/> */}
    </>
  );
};
