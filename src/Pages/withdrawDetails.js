import React, { useEffect, useState } from "react";
import { sidebarJS } from "../helper/helperFunctions";
import { SidebarHeader } from "../Components/SidebarHeader";
import { getWithdrawList } from "../helper/apiFunctions";
import { useSelector } from "react-redux";

export const WithdrawDetails = () => {

  const { userAddress } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([])

  useEffect(() => {
    sidebarJS();
  }, []);

  useEffect(()=>{
    getWithdrawList(userAddress?.userAddress).then((res) => {
      setTab(res?.data)
    })
  },[userAddress?.userAddress])
  return (
    <>
      <SidebarHeader />
      <section className="pb_50 mt-5 pt-5">
        <div className="container mt-3">
          <div className=" text-center">
            <h2>
              <span className="busd-stake-gradiant">Withdraw Details</span>
            </h2>
          </div>
          <div className="table-responsive">
            <table className="table mt-3 rs-table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Txn Hash</th>
                  <th scope="col">Withdraw Date </th>
                </tr>
              </thead>
              <tbody>
                {
                  tab && tab.length > 0 ? (
                    tab.map((e, i) => {
                      const test = new Date(Number(e.block_timestamp) * 1000);
                      return (
                        <>
                        <tr key={i} className="tab-back">
                          <td>{i + 1}</td>
                          <td>{e?.rewardClaimed / 1e18} BUSD</td>
                          <td>
                            <a style={{color:"white"}} href={`https://testnet.bscscan.com/tx/${e?.transaction_id}`} target="_blank" rel="noreferrer">{e?.transaction_id
                            ? e?.transaction_id.substr(0, 10) +
                            "......." +
                            e?.transaction_id.substr(55)
                            : 0}</a>
                            </td>
                          <td>{test.toLocaleDateString()}</td>
                        </tr>
                        </>
                      )
                    })
                  ) : <div className="text-white text-center">No Data Found</div>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};
