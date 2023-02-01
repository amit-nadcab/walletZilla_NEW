import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { startNow } from '../helper/getWeb3'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAddress } from '../redux/reducer'
import { useNavigate } from "react-router-dom";

export const Auth = () => {

  const { userAddress } = useSelector((state) => state.data.value)
  const dispatch = useDispatch()
  const navigate = useNavigate();



  function connectWallet(){
    startNow().then((res)=>{
      console.log(res,"address");
    dispatch(setUserAddress({userAddress: res}))
    })
    
  }

  // useEffect(()=>{
  //   connectWallet()
  // },[])

//  console.log(userAddress,"userAddress");

  return (
    <>
      <section className="siginin-section">
        <div className="signin-middle-container">
          <div className="container">
            <div className="outer-form-signin col-md-12 shadow">
              <div className="row">
                <div className="inner-form-signin col-md-12">
                  <div>
                    <Link to="/">
                      <img src='assets/images/walletZilla_logo.png' alt="" className="signin-logo" />
                    </Link>
                    <h1 className="text-center fw-bolder text-primary">
                      Sign In
                    </h1>
                    <div className="mb-3 ps-4 pe-4">
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        readOnly
                        placeholder="Address*"
                      value={userAddress && userAddress?.userAddress}
                      />
                      {userAddress == '' || userAddress === undefined ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg mt-4 connect-wallet-btn"
                          onClick={() => connectWallet()}
                        >
                          Connect Wallet
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-lg mt-4 connect-wallet-btn"
                          // onClick={() => verifyUser(walletDetails?.userAddress)}
                          onClick={()=>   navigate("/Dashboard")}
                        >
                          Dashboard
                        </button>
                      )}
                      <h3 className="pt-4 pb-3 fw-bold text-white">
                        If you haven't joined yet!
                      </h3>
                      <Link to="/Signup">
                        
                        <button
                          type="button"
                          className="btn btn-primary join-here-btn connect-wallet-btn"
                          // onClick={navigate("/Signup")}
                        >
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
