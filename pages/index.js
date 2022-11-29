import React from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Form from "../components/Form";

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrapper_home}>
          <div className={styles.wrapper_home1}>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
