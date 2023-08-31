'use client';
import { Suspense, useEffect, useState } from "react";

export default function Home() {
    const [values, setValues] = useState({
        message: ""
    });

    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/home")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setValues({
                message: data.message
            });
        });
    }, []);

    return (
        <>
            <div className={"font-bold"}>
                Message from server: 
                <Suspense fallback={"Loading..."}>
                    {values.message}
                </Suspense>
            </div>
        </>
    );
}
