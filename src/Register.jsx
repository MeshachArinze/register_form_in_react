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
        setName(prev => {
            return {...prev, errMsg: "Invalid Entry"}
        });
        return;
    }

    try {
        const resp = await axios.post(Register)
    } catch (error) {
        
    }
  }

  return <div>Register</div>;
}
