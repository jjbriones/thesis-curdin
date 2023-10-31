'use client';
import { Suspense, useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState({
    predictions: [],
    actualPrice: 0,
  });

  //fetch data from server
  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/predict')
      .then((response) => response.json())
      .then((data) => {
        setMessage({
          predictions: data.predictions,
          actualPrice: data.actualPrice,
        });
      });
  }, []);

  return (
    <div>
      <div className={'p-4'}>
        Prediction from Regression Model:
        <Suspense fallback={'Loading...'}></Suspense>
      </div>
    </div>
  );
}
