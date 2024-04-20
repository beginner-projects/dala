'use client'

import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import styles from './swap.module.css';
import Image from 'next/image';

function Swap() {
  const [tokenOneAmount, setTokenOneAmount] = useState<number>(0);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<number>(0);
  

  const tokenOne = {
    ticker: "USDT",
    name: "USDT Coin",
    address: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1",
    decimals: 18
  };

  const tokenTwo = {
    ticker: "MRB",
    name: "MRB Coin",
    address: "0x514910771af9ca656af840dff83e8264ecf986ca",
    decimals: 18
  };


  function changeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!isNaN(parseFloat(value))) {
      setTokenOneAmount(parseFloat(value));
      setTokenTwoAmount(parseFloat(value) / 0.001);
    } else {
      setTokenOneAmount(0);
      setTokenTwoAmount(0);
    }
  }


  return (
    <div className={styles.tradeBox}>
      <div className={styles.tradeBoxHeader}>
        <h4 className="text-white pt-5 pb-3">Swap</h4>
        <p className="text-white"><span className="text-gray-400 mr-2">Balance :</span># <span className="text-gray-400 text-sm font-lighter">USDT</span></p>
      </div>
      <div className={styles.inputs}>
        <Input
          type="number"
          step="any"
          placeholder="00"
          value={tokenOneAmount || ''}
          onChange={changeAmount}
          className={styles.antInput}
        />
        <Input placeholder="00" value={tokenTwoAmount || ''} disabled={true} className={styles.antInput} />
        <div className={styles.switchButton}>
          <ArrowDownOutlined className={styles.switchArrow} />
        </div>
        <div className={styles.assetOne}>
          <Image src="/usdt.svg" alt="usdt logo" width={22} height={22} className={styles.assetLogo} />
          {tokenOne.ticker}
        </div>
        <div className={styles.assetTwo}>
          <Image src="/flame.svg" alt="mrb logo" width={22} height={22} className={styles.assetLogo} />
          {tokenTwo.ticker}
        </div>
      </div>
      <div className={`${styles.swapButton}`}>
        Swap
      </div>
    </div>
  );
}

export default Swap;

function setMyBalance(fetchBalance: () => Promise<void>) {
  throw new Error("Function not implemented.");
}

