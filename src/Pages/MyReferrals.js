import React, { useEffect, useState } from "react";
import { sidebarJS } from "../helper/helperFunctions";
import { SidebarHeader } from "../Components/SidebarHeader";
import { getMyReferral } from "../helper/apiFunctions";
import { useSelector } from "react-redux";


export const MyReferrals = () => {

  const { userAddress} = useSelector((state) => state.data.value);   
  const [tab, setTab] = useState([])

  useEffect(() => {
    sidebarJS();
  }, []);

  useEffect(()=>{
    getMyReferral(userAddress?.userAddress).then((res) => {
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
              <span className="busd-stake-gradiant">My Referrals</span>
            </h2>
          </div>
          <div className="table-responsive">
            <table className="table mt-3 rs-table">
              <thead className="thead-light">
                <tr>
                  {/* <th scope="col">Sr No.</th> */}
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Amount</th>
                  <th scope="col">User ID</th>
                  <th scope="col">User Address</th>
                  <th scope="col">Date </th>
                </tr>
              </thead>
              <tbody>
                {
                  tab && tab.length > 0 ? (
                    tab.map((e, i) => {
                      const test = new Date(Number(e.block_timestamp) * 1000);
                      
                      return (
                       
                        <>
                        <tr key={i}>
                          {/* <th scope="row">1</th> */}
                          <td>{i + 1}</td>
                          <td>{e?.AmountInv / 1e18} BUSD</td>
                          <td>{e?.userRefferdById}</td>
                          <td>
                            <a style={{color:"white"}} href={`https://testnet.bscscan.com/address/${e?.userAddress}`} target="_blank" rel="noreferrer">{e?.userAddress
                            ? e?.userAddress.substr(0, 10) +
                            "......." +
                            e?.userAddress.substr(10)
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
