import React, { useEffect, useState } from "react";
import { sidebarJS } from "../helper/helperFunctions";
import { SidebarHeader } from "../Components/SidebarHeader";
import { getDepositDetisl } from "../helper/apiFunctions";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
// import {isLastInvestmentActive} from '../helper/getWeb3'
export const DepositDetails = () => {
  const { userAddress } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);
  const [data, setData] = useState(true);

  useEffect(() => {
    sidebarJS(); 
  }, []);

  useEffect(() => {
    getDepositDetisl(userAddress?.userAddress).then((res) => {
      setTab(res?.data);
      setData(false);
    });

    // const a =  isLastInvestmentActive(userAddress?.userAddress)
  }, [userAddress?.userAddress]);
  return (
    <>
      <SidebarHeader />
      <section className="pb_50 mt-5 pt-5">
        <div className="container mt-3">
          <div className=" text-center">
            <h2>
              <span className="busd-stake-gradiant">Deposit Details</span>
            </h2>
          </div>
          <div className="table-responsive">
            <table className="table mt-3 rs-table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Txn Hash</th>
                  <th scope="col">Status</th>
                  <th scope="col">Deposit Date </th>
                </tr>
              </thead>
              {data ? (
                <div className="text-center">
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                <tbody>
                  {tab && tab.length > 0 ? (
                    tab.map((e, i) => {
                      const test = new Date(Number(e.block_timestamp) * 1000);
                      return (
                        <>
                          <tr key={i} className="tab-back">
                            <td>{i + 1}</td>
                            <td>{e?.AmountInv / 1e18} BUSD</td>
                            <td>
                              <a
                                style={{ color: "white" }}
                                href={`https://bscscan.com/tx/${e?.transaction_id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {e?.transaction_id
                                  ? e?.transaction_id.substr(0, 10) +
                                    "......." +
                                    e?.transaction_id.substr(55)
                                  : 0}
                              </a>
                            </td>
                            <td>{i == 0 ? "active" : "expired"}</td>
                            <td>{test.toLocaleDateString()}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="text-white text-center">No Data Found</div>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
