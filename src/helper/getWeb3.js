import Web3 from "web3";
import {
  CONTRACT_ADDRESS,
  TOKEN_ADDRESS,
  CONTRACT_ABI,
  TOKEN_ABI,
  adminId,
} from "./config";
import { toast } from "react-hot-toast";

const web3 = new Web3(Web3.givenProvider);

const contract_instance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
const token_instance = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);

export async function startNow() {
  web3.eth.getChainId().then((res) => {
    // console.log(res, "chain ID", typeof res);
    if (res !== 97) {
      SwitchNetwork();
    }
  });

  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async function (address) {
            const userAddress = address[0];
            resolve({
              userAddress,
            });
            window.ethereum.on("accountsChanged", function (accounts) {
              window.location.reload();
            });
          });
      } catch (error) {
        if (error.code === 4001) {
        }
        console.log(error);
        reject(error);
      }
    }
  });
}
export async function SwitchNetwork() {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      try {
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                name: "Binance Testnet",
                symbol: "BNB",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
              blockExplorerUrls: ["https://testnet.bscscan.com"],
            },
          ],
        });
        window.ethereum.on("networkChanged", function (networkId) {
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
}
export const isUserExist = async (id) => {
  const data = await contract_instance.methods.IsExist(id).call();
  return data;
};
export const idToAddress = async (id) => {
  const data = await contract_instance.methods.IdToAddress(id).call();
  console.log(data);
};
export const getUserDetails = async (userAddress) => {
  try {
    const data = await contract_instance.methods.UserDetail(userAddress).call();
    const obj = {
      userId: data?.userId,
      userAddress: data?.userAddress,
      userRefferdBy: data?.userRefferdBy,
      refralAddress: data?.refralAddress,
      totalDirects: data?.totalDirects,
      userLastAmountInvested: data?.userLastAmountInvested,
      totalReward: data?.TotalReward,
      amountEarnedByRef: data?.amountEarnedByRef,
      airdropReward: data?.airdropReward,
      totalIncentiveEarned: data?.totalIncentiveEarned,
      totalTeamBusiness: data?.totalTeamBusiness,
      totalWithdraw: data?.Totalwithdrwal,
    };
    return obj;
  } catch (error) {
    console.log(error, "userDetails Error");
  }
};
export const getUserBalance = async (userAddress) => {
  try {
    const data = await token_instance.methods.balanceOf(userAddress).call();
    return data;
  } catch (error) {
    console.log(error, " userBalance Error");
  }
};
export const allowance = async (userAddress, contractAddress) => {
  const data = await token_instance.methods
    .allowance(userAddress, contractAddress)
    .call();
  console.log(data);
};
export const claimAirdrop = (userAddress, setRefresh) => {
  const data = contract_instance.methods
    .claimAirdrop()
    .send({ from: userAddress, value: 0 });
  toast.promise(data, {
    loading: "Transaction Pending...",
    success: () => {
      setRefresh(true);
      return <b>Transaction Successful</b>;
    },
    error: <b>Transaction Canceld.</b>,
  });
};
export const claimReward = (userAddress, setRefresh) => {
  try {
    const data = contract_instance.methods
      .ClaimReward()
      .send({ from: userAddress, value: 0 });
    toast.promise(data, {
      loading: "Withdrawl Pending...",
      success: () => {
        setRefresh(true);
        return <b>Withdrawl Successful</b>;
      },
      error: <b>Withdrawl Canceld.</b>,
    });
  } catch (error) {
    console.log(error, "claimReward Error");
  }
};
export const getRoi = async (userAddress) => {
  try {
    const data = await contract_instance.methods
      .calculateWithdrawlAmount(userAddress)
      .call();
    // console.log(data, "ROI");
    return data;
  } catch (error) {
    console.log(error, "calculateWithdrawlAmount Error");
  }
};
export const deployedTime = async () => {
  try {
    const data = await contract_instance.methods.deployedTime().call();
    return data;
  } catch (error) {
    console.log(error, "deployedTime Error");
  }
};
export const getTotalTeamBusiness = async (userAddress) => {
  try {
    const data = await contract_instance.methods
      .totalTeamBusiness(userAddress)
      .call();
    return data;
  } catch (error) {
    console.log(error, "totalTeamBusiness Error");
  }
};
export const getStakingDetails = async (userAddress) => {
  try {
    const data = await contract_instance.methods
      .UserStakingDetail(userAddress)
      .call();
    return data;
  } catch (error) {
    console.log(error, "UserStakingDetail Error");
  }
};  
export const isLastInvestmentActive = async(userAddress)=>{
  try {
    const data = await contract_instance.methods.isLastInvestmentActive(userAddress).call()
    return data
  } catch (error) {
    console.log(error,"isLastInvestmentActive Error");
  }
}
export const isRewardClaimPending = async(userAddress)=>{
  try {
    const data = await contract_instance.methods.IsRewardClaimPending(userAddress).call()
    return data
  } catch (error) {
    console.log(error,"IsRewardClaimPending Error");
  }
}
export async function buy(userAddress, amount, ref, setRefresh) {
  console.table([
    [userAddress, "userAddress"],
    [amount, "amount"],
    [ref, "ref"],
  ]);
  try {
    console.log("1");
    token_instance.methods
      .balanceOf(userAddress)
      .call()
      .then((res) => {
        console.log("2");
        const userBalance = res / 1e18;
        console.log(userBalance, "userBalance", res);
        if (userBalance >= amount) {
          console.log("3");
          token_instance.methods
            .allowance(userAddress, CONTRACT_ADDRESS)
            .call()
            .then((res) => {
              console.log("4");
              const allowance = res / 1e18;
              console.log(allowance, "allowance", amount);
              if (allowance >= amount) {
                try {
                  console.log("5");
                  console.log((amount * 1e18).toString(), "amount*1e18 2");
                  const data = contract_instance.methods
                    .InvestBusd((amount * 1e18).toString(), ref)
                    .send({ from: userAddress, value: 0 });
                  toast.promise(data, {
                    loading: "Transaction Pending...",
                    success: () => {
                      setRefresh(true);
                      return <b>Transaction Successful</b>;
                    },
                    error: <b>Transaction Canceld.</b>,
                  });
                  console.log("DIRECT BUY");
                } catch (error) {
                  console.log(error, "Error");
                }
              } else if (allowance < amount) {
                console.log("6");
                console.log((amount * 1e18).toString(), "amount*1e18 3");
                try {
                  console.log((amount * 1e18).toString(), "amount*1e18 4");
                  const approveData = token_instance.methods
                    .approve(CONTRACT_ADDRESS, (amount * 1e18).toString())
                    .send({
                      from: userAddress,
                      value: 0,
                    });
                  console.log(approveData, "approveData");
                  toast
                    .promise(approveData, {
                      loading: "Approval Pending...",
                      success: <b>Approval Successful</b>,
                      error: <b>Approval request failed.</b>,
                    })
                    .then(() => {
                      console.log("7");
                      console.log((amount * 1e18).toString(), "amount*1e18 1");
                      const data = contract_instance.methods
                        .InvestBusd((amount * 1e18).toString(), ref)
                        .send({
                          from: userAddress,
                          value: 0,
                        });
                      toast.promise(data, {
                        loading: "Transaction Pending...",
                        success: () => {
                          setRefresh(true);
                          return <b>Transaction Successful</b>;
                        },
                        error: <b>Transaction Canceld.</b>,
                      });
                      console.log("Buy with admin");
                    })
                    .catch((err) => {
                      console.log(err, "Err-4");
                    });
                } catch (error) {
                  console.log(error, "approval Error");
                }
              }
            })
            .catch((err) => {
              console.log(err, "Err-2");
            });
        } else {
          toast("Insufficaint Wallet Balance");
          console.log("Low Balance");
        }
      })
      .catch((err) => {
        console.log(err, "Err -1");
      });
  } catch (error) {
    console.log(error);
  }
}
