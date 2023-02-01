import React from "react";
import { Link } from "react-router-dom";

export const BusdStake = () => {
  return (
    <>
      <div className="container">
        <div className="row  busd-stake-wrapper">
          <div className="busd-stake">
            <h3 className="text-center busd-stake-gradiant">
              {" "}
              Stake BUSD and earn 1.4 % daily            </h3>
            <div className="text-center mt-3">
              <Link className="btn btn-2" to="/Dashboard">
                Stake Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
