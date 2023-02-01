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
  isRewardClaimPending: false
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
    setIsRewardClaimPending: (state, action) => {
      state.value.isRewardClaimPending = action.payload.isRewardClaimPending;
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
  setIsRewardClaimPending
} = dataSlice.actions;

export default dataSlice.reducer;
