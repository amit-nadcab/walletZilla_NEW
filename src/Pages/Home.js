import React,{useEffect} from 'react'

import { startNow } from '../helper/getWeb3';
import { useDispatch} from "react-redux";
import { setUserAddress } from '../redux/reducer';

import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import { Banner } from '../Components/Banner';
import { About } from '../Components/About';
import { TokenDetails } from '../Components/TokenDetails';
import { TokenDistibution } from '../Components/TokenDistibution';
import { Faq } from '../Components/Faq';
import { Market } from '../Components/Market';
import { Steps } from '../Components/Steps';
import { BusdStake } from '../Components/BusdStake';
import { AirdropRules } from '../Components/AirdropRules';

export const Home = () => {

  const dispatch = useDispatch()

  function connectWallet() {
    startNow().then((res) => {
      dispatch(setUserAddress({ userAddress: res }));
    });
  }

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <>
      <Header />
      <Banner />
      <About />
      <BusdStake/>
      <Steps/>
      <TokenDetails/>
      <TokenDistibution/>
      <AirdropRules/>
      <Faq/>
      <Market/>
      <Footer />
    </>
  )
}
