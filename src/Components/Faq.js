import React, { useEffect } from "react";

export const Faq = () => {

  const arr = [{
    heading: "Is WalletZilla safe?",
    para: "WalletZilla website is just an interface for aconvenient use of the smart-contract. All your data isrecorded in the blockchain and completely secure. Youcan also interact with the smart contract directly,without a website interface. But in order to avoidphishing websites, we always recommend double checkingthe website address spelling — walletzilla.io"
  },
  {
    heading: "What are Dapps?",
    para: `Decentralized applications (dApps) are digital
    applications or programs that exist and run on a
    blockchain or peer-to-peer (P2P) network of computers
    instead of a single computer. DApps - (also called
    "dapps') are outside the preview and control of a single
    authority. DApps—which are often built on the Ethereum
    platform—can be developed for a varity of purposes
    including gaming,finance, and social media.`
  },
  {
    heading: "How dApps Work?",
    para: "WalletZilla website is just an interface for aconvenient use of the smart-contract. All your data isrecorded in the blockchain and completely secure. Youcan also interact with the smart contract directly,without a website interface. But in order to avoidphishing websites, we always recommend double checkingthe website address spelling — walletzilla.io"
  },
  {
    heading: "What are crypto wallets?",
    para: `Cryptocurrency wallets are the same as your regular
    wallets. The only difference is that they are used for
    storing digital currency. From a technical perspective,
    crypto wallets are basically application software
    intended for storing and retrieving your crypto assets.
    A cryptocurrency wallet is a software program, which
    stores the public and private keys of an individual. The
    wallets also help users in interfacing with different
    blockchains for monitoring their assets and trading with
    them. Public and private keys serve as the foundation of
    crypto wallets.`
  },
  {
    heading: "What is Defi",
    para: "Next Big Revolution in Crypto World. Decentralized Finance (DeFi) is fast disrupting the traditional financial sector. It's called DeFi, shortfordecentralized finance-it's the notion that crypto entrepreneurs can recreate traditional financial instruments in a decentralized architectur outside of companies' and governments' control."
  }]

  const addClass = (i)=>{
    document.getElementById(`${i}a`).classList.toggle('active')
    document.getElementById(`${i}b`).classList.toggle('d-block')
  }

 
  return (
    <>
      <div className="faq-area pt-100 pb-50 position-relative" id="faq">
        <img
          className="lft-img position-absolute"
          src="assets/images/myImage/decor-3.svg"
          alt=""
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dreamit-section-title up text-center pb-35">
                <h4>FAQ</h4>
                <h1 className="banner-gradiant">
                  Freaquently Asked & <span>Questions</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-8">
              <div className="tab_container" data-wow-delay=".4">
                <h3 className="d_active tab_drawer_heading" rel="tab1">
                  Tab 1
                </h3>
                <div id="tab1" className="tab_content">
                  <ul className="accordion">
                    {
                      arr.map((e, i)=>{
                        return(
                          <>
                          <li onClick={()=>{
                              addClass(i)
                          }}>
                      <a className="" id={`${i}a`}>{e.heading}</a>
                      <p className="" id={`${i}b`}>{e.para}</p>
                    </li>
                          </>
                        )
                      })
                    }
                    {/* <li>
                      <a className="active">Is WalletZilla safe? </a>
                      <p className="d-block">
                        WalletZilla website is just an interface for a
                        convenient use of the smart-contract. All your data is
                        recorded in the blockchain and completely secure. You
                        can also interact with the smart contract directly,
                        without a website interface. But in order to avoid
                        phishing websites, we always recommend double checking
                        the website address spelling — walletzilla.io
                      </p>
                    </li>
                    <li>
                      <a>What are Dapps?</a>
                      <p>
                        Decentralized applications (dApps) are digital
                        applications or programs that exist and run on a
                        blockchain or peer-to-peer (P2P) network of computers
                        instead of a single computer. DApps - (also called
                        "dapps') are outside the preview and control of a single
                        authority. DApps—which are often built on the Ethereum
                        platform—can be developed for a varity of purposes
                        including gaming,finance, and social media.
                      </p>
                    </li>
                    <li>
                      <a>How dApps Work?</a>
                      <p>
                        In the context of cryptocurrencies, dApps run on a
                        blockchain network in a public, opensource,
                        decentralised environment and are free from control and
                        interference by any single authority. For example, a
                        developer can create a Twitter-like dApp and put it on a
                        blockchain where any user can publish messages. Once
                        posted, no one-including the app creators-can delete the
                        messages.
                      </p>
                    </li>
                    <li>
                      <a>What are crypto wallets?</a>
                      <p>
                        Cryptocurrency wallets are the same as your regular
                        wallets. The only difference is that they are used for
                        storing digital currency. From a technical perspective,
                        crypto wallets are basically application software
                        intended for storing and retrieving your crypto assets.
                        A cryptocurrency wallet is a software program, which
                        stores the public and private keys of an individual. The
                        wallets also help users in interfacing with different
                        blockchains for monitoring their assets and trading with
                        them. Public and private keys serve as the foundation of
                        crypto wallets.
                      </p>
                    </li>
                    <li>
                      <a>What is Defi</a>
                      <p>
                        Next Big Revolution in Crypto World. Decentralized
                        Finance (DeFi) is fast disrupting the traditional
                        financial sector. It's called DeFi, short for
                        decentralized finance-it's the notion that crypto
                        entrepreneurs can recreate traditional financial
                        instruments in a decentralized architecture, outside of
                        companies' and governments' control.
                      </p>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
