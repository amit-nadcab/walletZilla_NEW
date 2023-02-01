import React from 'react'

export const Market = () => {
  return (
    <>
    <div className='container'>
        <div className='row'>
            <h1 className='text-center mb-5 banner-gradiant'>Acceptability</h1>
        </div>
        <div className='row g-5'>
            <div className='col-md-3 col-6'>
                <img src='assets/images/myImage/metamask.png' alt=''width={150} />
            </div>
            <div className='col-md-3 col-6'>
            <img src='assets/images/myImage/trustWallet.png' alt='' width={150}/>
            </div>
            <div className='col-md-3 col-6'>
            <img src='assets/images/myImage/binance wallet.png' alt='' width={150}/>
            </div>
            <div className='col-md-3 col-6'>
            <img src='assets/images/myImage/wallet connect.png' alt='' width={150}/>
            </div>
        </div>
    </div>
    </>
  )
}
