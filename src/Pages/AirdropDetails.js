import React, { useEffect, useState } from "react";
import { sidebarJS } from "../helper/helperFunctions";
import { SidebarHeader } from "../Components/SidebarHeader";
import { getAirdropList } from "../helper/apiFunctions";
import { useSelector } from "react-redux";
import { roundTo } from "round-to";
import { ColorRing } from "react-loader-spinner";

export const AirdropDetails = () => {
  const { userAddress } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);
  const [data, setData] = useState(true);

  useEffect(() => {
    sidebarJS();
  }, []);

  useEffect(() => {
    console.log();
    getAirdropList(userAddress?.userAddress).then((res) => {
      setTab(res?.data);
      setData(false);
    });
  }, [userAddress?.userAddress]);
  return (
    <>
      <SidebarHeader />
      <section className="pb_50 mt-5 pt-5">
        <div className="container mt-3">
          <div className=" text-center">
            <h2>
              <span className="busd-stake-gradiant">Airdrop Details</span>
            </h2>
          </div>
          <div className="table-responsive">
            <table className="table mt-3 rs-table">
              <thead className="thead-light">
                <tr>
                  {/* <th scope="col">Sr No.</th> */}
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Reward</th>
                  <th scope="col">Txn Hash</th>
                  <th scope="col">Claim Date </th>
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
                            {/* <th scope="row">1</th> */}
                            <td>{i + 1}</td>
                            <td>{roundTo(e?.amount / 1e18, 4)} WZT</td>
                            <td>
                              <a
                                style={{ color: "white" }}
                                href={`https://testnet.bscscan.com/tx/${e?.transaction_id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {" "}
                                {e?.transaction_id
                                  ? e?.transaction_id.substr(0, 10) +
                                    "......." +
                                    e?.transaction_id.substr(55)
                                  : 0}{" "}
                              </a>
                            </td>
                            <td>{test.toLocaleDateString()}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="text-white text-center"> No Data Found</div>
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
