import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import SuccessMsg from "./SuccessMsg";
import styles from "../styles/Home.module.css";

export default function Form() {
  const [states, setStates] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    axios
      .get("https://frontend-take-home.fetchrewards.com/form")
      .then((res) => {
        setStates(res.data.states);
        setOccupations(res.data.occupations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const schema = yup.object().shape({
    fullName: yup.string().required("Please enter your full name"),
    email: yup.string().email().required("Please enter a valid email"),
    password: yup
      .string()
      .min(4, "Enter password between 4-15 characters")
      .max(15, "Enter password between 4-15 characters")
      .required("Enter password between 4-15 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required("Passwords Don't Match"),
    occupation: yup.string().required("Please select occupation"),
    state: yup.string().required("Please select state"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    const formFields = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      occupation: data.occupation,
      state: data.state,
    };
    axios
      .post("https://frontend-take-home.fetchrewards.com/form", formFields)
      .then((res) => {
        setSuccess(!success);
        reset(); // Reset form fields (react-hook-form method)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.form_wrapper}>
        <div className={styles.form_wrap_txt}>
          <h1 className={styles.title}>
            {success ? "Create an Account" : "Submission Successful"}
          </h1>
          <h3 className={styles.subTitle}>
            {success
              ? "Create an account. It's totally free!"
              : "You have successfully submitted your form"}
          </h3>
        </div>
        <div className={styles.form_wrap}>
          {success ? (
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
              <input
                className={styles.input}
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                {...register("fullName")}
              />
              <p className={styles.error}>{errors.fullName?.message}</p>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                {...register("email")}
              />
              <p className={styles.error}>{errors.email?.message}</p>
              <select
                name="occupation"
                className={styles.select}
                {...register("occupation")}
              >
                <option value="" disabled selected hidden>
                  Select Occupation
                </option>
                {occupations.map((item) => (
                  <option key={item.id} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <p className={styles.error}>{errors.occupation?.message}</p>
              <select
                name="state"
                placeholder="select option"
                className={styles.select}
                {...register("state")}
              >
                <option value="" disabled selected hidden>
                  Select State
                </option>
                {states.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p className={styles.error}>{errors.state?.message}</p>
              <input
                className={styles.input}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className={styles.error}>{errors.password?.message}</p>
              <input
                className={styles.input}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <p className={styles.error}>{errors.confirmPassword?.message}</p>
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </form>
          ) : (
            <SuccessMsg success={success} setSuccess={setSuccess} />
          )}
        </div>
      </div>
    </>
  );
}
