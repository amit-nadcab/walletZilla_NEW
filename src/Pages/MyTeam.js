import React, { useEffect, useState } from "react";
import { sidebarJS } from "../helper/helperFunctions";
import { SidebarHeader } from "../Components/SidebarHeader";
import { getMyTeam } from "../helper/apiFunctions";
import { useSelector } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ColorRing } from "react-loader-spinner";
import { roundTo } from "round-to";
export const MyTeam = () => {
  const { userAddress } = useSelector((state) => state.data.value);
  
  const [tab, setTab] = useState([]);
  const [teamTab, setTeamTab] = useState({});
  const [data, setData] = useState(true);

  const options = [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    "Level 6",
    "Level 7",
    "Level 8",
    "Level 9",
    "Level 10",
  ];
  const defaultOption = options[0];
  useEffect(() => {
    sidebarJS();
  }, []);

  useEffect(() => {
    getMyTeam(userAddress?.userAddress).then((res) => {
      console.log(res?.data,"table data");
      setTeamTab(res?.data);
      setTab(res?.data?.level_1);
      setData(false);
    });
  }, [userAddress?.userAddress]);

  const setTeamLevel = (i) => {
    if (i?.value === "Level 1") {
      setTab(teamTab?.level_1);
    }
    if (i?.value === "Level 2") {
      setTab(teamTab?.level_2);
    }
    if (i?.value === "Level 3") {
      setTab(teamTab?.level_3);
    }
    if (i?.value === "Level 4") {
      setTab(teamTab?.level_4);
    }
    if (i?.value === "Level 2") {
      setTab(teamTab?.level_2);
    }
    if (i?.value === "Level 5") {
      setTab(teamTab?.level_5);
    }
    if (i?.value === "Level 6") {
      setTab(teamTab?.level_6);
    }
    if (i?.value === "Level 2") {
      setTab(teamTab?.level_2);
    }
    if (i?.value === "Level 7") {
      setTab(teamTab?.level_7);
    }
    if (i?.value === "Level 8") {
      setTab(teamTab?.level_8);
    }
    if (i?.value === "Level 9") {
      setTab(teamTab?.level_9);
    }
    if (i?.value === "Level 10") {
      setTab(teamTab?.level_10);
    }
  };
  return (
    <>
      <SidebarHeader />
      <section className="pb_50 mt-5 pt-5">
        <div className="container mt-3">
          <div className=" text-center">
            <h2>
              <span className="busd-stake-gradiant">My Team</span>
            </h2>
          </div>
          <div className="">
            <Dropdown
              options={options}
              value={defaultOption}
              placeholder="Select an option"
              onChange={(i) => setTeamLevel(i)}
            />
            ;
          </div>
          <div className="table-responsive">
            <table className="table mt-3 rs-table">
              <thead className="thead-light">
                <tr>
                  {/* <th scope="col">Sr No.</th> */}
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Invested</th>
                  <th scope="col">Income</th>
                  <th scope="col">User ID</th>
                  <th scope="col">User Address</th>
                  <th scope="col">Date</th>
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
                  {tab?.length > 0 ? (
                    tab?.map((e, i) => {
                      const test = new Date(Number(e.block_timestamp) * 1000);
                      return (
                        <>
                          <tr key={i} className="tab-back">
                            <td className="text-center" style={{marginLeft: "5px"}}>{i + 1}</td>
                            <td>{e?.AmtInv / 1e18} BUSD</td>
                            <td>{ e?.amount ? roundTo((e?.amount / 1e18),4) : 0} BUSD</td>
                            <td>{e?.userRefferdById}</td>
                            <td>
                              <a
                                style={{ color: "white" }}
                                href={`https://testnet.bscscan.com/address/${e?.userAddress}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {e?.userAddress}
                              </a>
                            </td>
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
