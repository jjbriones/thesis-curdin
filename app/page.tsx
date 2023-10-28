'use client';
import { Suspense, useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  //fetch data from server
  useEffect(() => {
      fetch('http://127.0.0.1:8080/api/predict')
          .then((response) => response.json())
          .then((data) => {
                setMessage(data.prediction)
          });

        fetch('http://127.0.0.1:8080/api/score')
            .then((response) => response.json())
            .then((data) => {
                setScore(data.score)
            });
  }, []);

  return (
    <>
      <div className={'p-4'}>
        Prediction from Regression Model:
        <Suspense fallback={'Loading...'}>
            <p className={'mb-4'}>Score: {score * 100}</p>

            {message.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
        </Suspense>
      </div>
    </>
  );
}
