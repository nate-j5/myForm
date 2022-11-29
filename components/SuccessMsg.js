import React from "react";
import Image from "next/image";
import checkImg from "../public/check.png";
import styles from "../styles/Home.module.css";

export default function SuccessMsg({ success, setSuccess }) {
  const handleClick = () => {
    setSuccess(!success);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.card_wrapper}>
          <Image
            className={styles.card_img}
            src={checkImg}
            alt="Picture of checkmark"
            width={160}
            height={160}
          />
          <button
            type="button"
            onClick={handleClick}
            className={styles.card_btn}
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
}
