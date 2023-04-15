import React, { useState, useEffect, useRef, useInsertionEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_REGEX } from "./UserReg";
import { PWD_REGEX } from "./PwdReg";

import axios from "axios";
import { REGISTER_URL } from "./RegisterUrl";

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState({
    user: "",
    validName: "",
    userFocus: "",
    pwd: "",
    validPwd: false,
    pwdFocus: false,
    matchPwd: "",
    validMatch: false,
    matchFocus: false,
    errMsg: "",
    success: false,
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setName((prevState) => {
      return { ...prevState, user: USER_REGEX.test(name.user) };
    });
  }, [name.user]);

  useEffect(() => {
    setName((prevState) => {
      return { ...prevState, user: PWD_REGEX.test(name.pwd) };
    });

    setName(name.pwd === name.matchPwd);
  }, [name.pwd, name.matchPwd]);

  useEffect(() => {
    setName(name.errMsg);
  }, [name.user, name.pwd, name.matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const btn1 = USER_REGEX.test(name.user);
    const btn2 = PWD_REGEX.test(name.pwd);

    if (btn1 || btn2) {
      setName((prev) => {
        return { ...prev, errMsg: "Invalid Entry" };
      });
      return;
    }

    try {
      const resp = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user: name.user, pwd: name.pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(resp?.data);
      console.log(resp?.accessToken);
      console.log(JSON.stringify(resp));

      setName((prev) => {
        return { ...prev, success: true, user: "", pwd: "", matchPwd: "" };
      });
    } catch (error) {
      if (!error?.resp) {
        setName((prev) => {
          return { ...prev, errMsg: "No Server Response" };
        });
      } else if (err.resp?.status === 409) {
        setName((prev) => {
          return { ...prev, errMsg: "Username Token " };
        });
      } else {
        setName((prev) => {
          return { ...prev, errMsg: "Registration failed" };
        });
      }

      errRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      {name.success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={name.errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {name.errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
                
            </label>
          </form>
        </section>
      )}
    </React.Fragment>
  );
}
