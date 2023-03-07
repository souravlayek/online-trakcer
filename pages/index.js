import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [ping, setPing] = useState(() => new Array(60).fill(null));
  const checkOnline = async () => {
    try {
      const res = await axios.get("/api/health-check");
      if (res.status === 200) {
        const updatedPing = [...ping]
        updatedPing.shift()
        updatedPing.push(true)
        setPing(updatedPing);
      } else {
        const updatedPing = [...ping]
        updatedPing.shift()
        updatedPing.push(false)
        setPing(updatedPing);
      }
    } catch (error) {
      const updatedPing = [...ping]
      updatedPing.shift()
      updatedPing.push(false)
      setPing(updatedPing);
      // console.log(error)
    }
  };
  useEffect(() => {
    const _timer = setInterval(() => {
      checkOnline();
    }, 1000);
    return () => clearInterval(_timer);
  }, [ping]);

  return (
    <>
      <Head>
        <title>Online Tracker</title>
        <meta name="description" content="Track Whether it is online or not" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.card}>
            <h2 className="name">Home Server</h2>
            <Link href="https://tracker.codevizon.com" className="link">
              <p>https://tracker.codevizon.com</p>
            </Link>
            <div className={styles.pingContainer}>
              {ping.map((item, index) => (
                <div
                key={Math.random()}
                  className={`${styles.block} ${
                    item != null ? (item ? styles.green : styles.red) : ""
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
