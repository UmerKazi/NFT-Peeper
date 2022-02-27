import type { NextPage } from 'next'
import { useState } from 'react'
import Web3 from 'web3'
import { NftGallery } from 'react-nft-gallery'
import styles from '../styles/Landing.module.css'

const Landing: NextPage = () => {
  // stored wallet inputted by user
  const [wallet, setWallet] = useState('');
  // input in text field
  const [input, setInput] = useState<string>('');
  // outcome message
  const [invalidWallet, setInvalidWallet] = useState(false);
  // handle text field input
  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInput(e.target.value);
  };
  // validate that entered wallet is a real wallet
  const validateWallet = (input: string) => {
    if (Web3.utils.isAddress(input) == true) {
      return true;
    } else {
      return false;
    }
  }
  // submit validation / state change
  const submit = () => {
    if (validateWallet(input) == true) {
      setInvalidWallet(false);
      setWallet(input);
      setInput('');
    } else {
      setInvalidWallet(true);
    }
  }
  return (
    <main className={styles.page}>
      {!wallet && (
        <>
          {invalidWallet && (
            <a onClick={() => setInvalidWallet(false)}>
              <div className="alert shadow-lg alert-error max-w-xl middle mt-5">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Error! Invalid Wallet Address</span>
                </div>
              </div>
            </a>
          )}
          <div className="card lg:card-side bg-base-100 shadow-xl center">
            <div className="card-body pr-24 pl-24">
              <h2 className="card-title justify-center lg:text-4xl md:text-3xl sm:text-2xl xs: text-4xl text-violet-600 mt-6 font-bold text-center">NFT Peeper</h2>
              <p className="text-center mt-2 xs: text-md">
                Want to see other people's NFT collections?
                <br />
                Look no further, NFT Peeper is the tool for you!
                <br />
                To get started, please enter a <a className="link-secondary">wallet address</a>
              </p>
              <div className="justify-center card-actions mt-6 mb-6">
                <input value={input} onChange={handleChange} type="text" placeholder="0x..." className="input w-full max-w-xl bg-white input-primary text-black" />
                <button className="btn btn-primary w-full max-w-xl mt-2" onClick={submit}>Submit</button>
              </div>
            </div>
          </div>
        </>
      )}
      {wallet && (
        <>
          <p className="text-center text-4xl mt-5 mb-5 text-primary">{wallet}'s NFT Collection</p>
          <NftGallery ownerAddress={wallet} />
          <div>
            <button className="btn btn-primary w-full" onClick={() => setWallet('')}>Peep Another Wallet</button>
          </div>
        </>
      )}
    </main >
  )
}

export default Landing
