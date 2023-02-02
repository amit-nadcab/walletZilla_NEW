import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  userAddress: "",
  userDetails: {},
  isUserExist: false,
  dailyRoi: 0,
  userBalance: 0,
  totalAvailableWithdraw: 0,
  totalTeamBusiness: 0,
  stakingDetails: {},
  isLastInvestmentActive_: false,
  isRewardClaimPending_: false,
  businessPercent: 0
};
export const dataSlice = createSlice({
  name: "walletZilla",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setUserAddress: (state, action) => {
      state.value.userAddress = action.payload.userAddress;
    },
    setUserDetails: (state, action) => {
      state.value.userDetails = action.payload.userDetails;
    },
    setIsUserExist: (state, action) => {
      state.value.isUserExist = action.payload.isUserExist;
    },
    setDailyRoi: (state, action) => {
      state.value.dailyRoi = action.payload.dailyRoi;
    },
    setUserBalance: (state, action) => {
      state.value.userBalance = action.payload.userBalance;
    },
    setTotalAvaialbeWithdraw: (state, action) => {
      state.value.totalAvailableWithdraw =
        action.payload.totalAvailableWithdraw;
    },
    setTotalTeamBusiness: (state, action) => {
      state.value.totalTeamBusiness = action.payload.totalTeamBusiness;
    },
    setStakingDetails: (state, action) => {
      state.value.stakingDetails = action.payload.stakingDetails;
    },
    setIsLastInvestmentActive: (state, action) => {
      state.value.isLastInvestmentActive_ = action.payload.isLastInvestmentActive_;
    },
    setIsRewardClaimPending: (state, action) => {
      state.value.isRewardClaimPending_ = action.payload.isRewardClaimPending_;
    },
    setBusinessPercent: (state, action) => {
      state.value.businessPercent = action.payload.businessPercent;
    },
  },
});
export const {
  setUserAddress,
  setUserDetails,
  setIsUserExist,
  setDailyRoi,
  setUserBalance,
  setTotalAvaialbeWithdraw,
  setTotalTeamBusiness,
  setStakingDetails,
  setIsLastInvestmentActive,
  setIsRewardClaimPending,
  setBusinessPercent
} = dataSlice.actions;

export default dataSlice.reducer;
