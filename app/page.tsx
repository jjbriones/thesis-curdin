'use client';
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/home")
        .then((response) => response.json())
        .then((data) => console.log(data));
    }, []);

    return <div className="text-red-500">Curdin</div>;
}
