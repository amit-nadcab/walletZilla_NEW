import React from 'react'
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
