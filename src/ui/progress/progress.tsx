import React from 'react';
import styles from './progress.module.css';
import Link from 'next/link';
import { FiArrowUpRight } from "react-icons/fi";

interface ProgressProps {
  percentages: number[];
}

const Progress: React.FC<ProgressProps> = ({ percentages }) => {

  return (
   
      <div>
        <h3 className='text-2xl flex justify-center'>About <span className="text-red-500 font-semibold text-2xl ml-2 tracking-lighter">MRB Token</span></h3>
        <div className={styles.wrapper}>
          <div className={`${styles.divider} ${styles.divTransparent}`}></div>
        </div>
        <div className="flex items-center justify-center">
          <div className='flex'>
            <ul>
              <li>Price</li>
              <li>Network</li>
              <li>Contract</li>
              <li>Holder</li>
            </ul>
            <ul className='ml-2'>
              <li>:</li>
              <li>:</li>
              <li>:</li>
              <li>:</li>
            </ul>
            <ul className='ml-3'>
              <li><span className='flex  items-center text-green-300'>$100 <FiArrowUpRight className='ml-1' /></span></li>
              <li><span className='text-gray-400'>BNB CHAIN</span></li>
              <li> <Link className="flex items-center hover:text-green-400" href="https://bscscan.com/token/0x6624519e5948CdfAb871f4D13a0557F036ee2782"><span className=' mr-1'>Address</span> <FiArrowUpRight /></Link></li>
              <li><span className='text-white-300 tracking-lighter font-semibold'>1000 000</span></li>
            </ul>
          </div>
          <div className="flex ml-7">
            <div className="flex-col justify-center m-5">
              <div className={styles.progress} style={{ '--percent': `${percentages[0]}%` } as React.CSSProperties}>
                <span className="flex items-center text-md font-semibold -mb-16">30B</span>
                <p className="flex items-center just text-sm -mt-20 text-gray-400">Total Supply</p>
              </div>
            </div>
            <div className="flex-col justify-center m-5">
              <div className={styles.progress} style={{ '--percent': `${percentages[1]}%` } as React.CSSProperties}>
                <span className="flex items-center text-md font-semibold -mb-16">12B</span>
                <p className="flex items-center just text-sm -mt-20 text-gray-400">Circulation</p>
              </div>
            </div>
            <div className="flex-col justify-center m-5">
              <div className={styles.progress} style={{ '--percent': `${percentages[2]}%` } as React.CSSProperties}>
                <span className="flex items-center text-md font-semibold -mb-16">0B</span>
                <p className="flex items-center just text-sm -mt-20 text-gray-400">Total Burnt</p>
              </div>
            </div>
          </div>
        </div>
        <p className='flex justify-center font-light hover:text-white text-gray-300 text-xl mt-10'>HODL<span className="text-white font-semibold text-xl tracking-lighter ml-1 mr-1">MRB Token</span> & be the the part of all the businesses of mrab club.</p>
      </div>

  );
};

export default Progress;

