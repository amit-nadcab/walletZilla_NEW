import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { Home } from "./Pages/Home";
import { Auth } from "./Pages/Auth";
import { Signup } from "./Pages/Signup";
import { Dashboard } from "./Pages/Dashboard";
import { Deposit } from "./Pages/Deposit";
import { Widthdraw } from "./Pages/Widthdraw";
import { DepositDetails } from "./Pages/DepositDetails";
import { WithdrawDetails } from "./Pages/withdrawDetails";
import {AirdropDetails} from './Pages/AirdropDetails'
import { MyReferrals } from "./Pages/MyReferrals";
import { MyTeam } from "./Pages/MyTeam";
import {DailyTopDepositor} from './Pages/DailyTopDepositor'

function App() {
  const { userAddress } = useSelector((state) => state.data.value);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          {/* <Route path="/Auth" element={<Auth />} /> */}
          {/* <Route path="/Signup" element={<Signup />} /> */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Deposit" element={<Deposit />} />
          <Route path="/DepositDetails" element={<DepositDetails />} />
          <Route path="/widthdraw" element={<Widthdraw />} />
          <Route path="/WithdrawDetails" element={<WithdrawDetails />} />
          <Route path="/AirdropDetails" element={<AirdropDetails />} />
          <Route path="/MyReferrals" element={<MyReferrals />} />
          <Route path="/MyTeam" element={<MyTeam />} />
          <Route path="/DailyTopDepositorIncome" element={<DailyTopDepositor />} />
        </Routes>
        <Toaster
          position="top-center mt-5"
          toastOptions={{
            style: {
              border: "1px solid #713200",

              color: "#713200",
            },
          }}
          // toastOptions={{
          //   style: {
          //     background: '#363636',
          //     color: '#fff',
          //   },
          // }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
