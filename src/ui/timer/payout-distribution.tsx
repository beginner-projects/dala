'use client'

// import React, { useState, useEffect } from 'react';
// import styles from './timer.module.css';

// const TimerCountdown: React.FC = () => {
//   const [timer, setTimer] = useState<number>(() => {
//     // Retrieve timer value from local storage on component mount
//     const storedTimer = localStorage.getItem('timer');
//     return storedTimer ? parseInt(storedTimer, 10) : 0;
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prevTimer) => {
//         const newTimer = prevTimer + 1;
//         // Store timer value in local storage
//         localStorage.setItem('timer', newTimer.toString());
//         return newTimer;
//       }); // Increment timer by 1 second
//     }, 1000); // Update every second

//     return () => clearInterval(interval); // Clean up interval on component unmount
//   }, []);

//   const formatTimer = (timer: number) => {
//     const hours = Math.floor(timer / 3600);
//     const minutes = Math.floor((timer % 3600) / 60);
//     const seconds = timer % 60;

//     return (
//       <div className={styles.container}>
//         <div className={styles.containerSegment}>
//           <div className={styles.segment}>
//             <div>
//               {formatDigits(hours)}
//             </div>
//           </div>
//         </div>
//         <span className={styles.colon}>:</span>
//         <div className={styles.containerSegment}>
//           <div className={styles.segment}>
//             <div>
//               {formatDigits(minutes)}
//             </div>
//           </div>
//         </div>
//         <span className={styles.colon}>:</span>
//         <div className={styles.containerSegment}>
//           <div className={styles.segment}>
//             <div>
//               {formatDigits(seconds)}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const formatDigits = (value: number) => {
//     return value < 10 ? '0' + value : value.toString();
//   };

//   return formatTimer(timer);
// };

// export default TimerCountdown;

import React, { useState, useEffect } from 'react';
import styles from './timer.module.css';

const TimerCountdown: React.FC = () => {
  const [timer, setTimer] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTimer = localStorage.getItem('timer');
      return storedTimer ? parseInt(storedTimer, 10) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          localStorage.setItem('timer', newTimer.toString());
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const formatTimer = (timer: number) => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    return (
      <div className={styles.container}>
        <div className={styles.containerSegment}>
          <div className={styles.segment}>
            <div>{formatDigits(hours)}</div>
          </div>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.containerSegment}>
          <div className={styles.segment}>
            <div>{formatDigits(minutes)}</div>
          </div>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.containerSegment}>
          <div className={styles.segment}>
            <div>{formatDigits(seconds)}</div>
          </div>
        </div>
      </div>
    );
  };

  const formatDigits = (value: number) => {
    return value < 10 ? '0' + value : value.toString();
  };

  return formatTimer(timer);
};

export default TimerCountdown;
