import React, { useState, useEffect, useRef } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { USER_REGEX } from "./UserReg";
import { PWD_REGEX } from "./PwdReg";
import { IpAddress } from "./api/axios";

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
    IpData: undefined
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {

    if (!name["IpData"]) {
        IpAddress({setLoading, setIpData})
    }

    setName((prevState) => {
      return { ...prevState, user: USER_REGEX.test(name["user"]) };
    });
  }, [""]);

  useEffect(() => {
    setName((prevState) => {
      return { ...prevState, pwd: PWD_REGEX.test(name["pwd"]) };
    });

    setName(name["pwd"] === name["matchPwd"]);
  }, [""]);

  useEffect(() => {
    setName(name["errMsg"]);
  }, [""]);

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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setName((values) => ({ ...values, [name]: value }));
  };

  console.log(name.IpData);

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
          
            <h1>Register with us</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={name.validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={name.validName || !name.user ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                name="user"
                onChange={handleChange}
                value={name["user"]}
                required
                aria-invalid={name.validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() =>
                  setName((e) => {
                    return {
                      ...e,
                      userFocus: true,
                    };
                  })
                }
                onBlur={() =>
                  setName((e) => {
                    return {
                      ...e,
                      userFocus: false,
                    };
                  })
                }
              />
              <p
                id="uidnote"
                className={
                  name.userFocus && name.user && !name.validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              <label htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={name["validPwd"] ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    name["validPwd"] || !name["pwd"] ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="password"
                id="password"
                name=""
                onChange={handleChange}
                value={name["pwd"]}
                required
                aria-invalid={name["validPwd"] ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() =>
                  setName((e) => {
                    return {
                      ...e,
                      userFocus: true,
                    };
                  })
                }
                onBlur={() =>
                  setName((e) => {
                    return {
                      ...e,
                      userFocus: false,
                    };
                  })
                }
              />
              <p
                id="pwdnote"
                className={
                  name["pwdFocus"] && !name["validPwd"]
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    name["validMatch"] && name["matchPwd"] ? "valid" : "hide"
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    name["validMatch"] || !name["matchPwd"] ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={handleChange}
                value={name["matchPwd"]}
                required
                aria-invalid={name["validMatch"] ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() =>
                  setName((e) => {
                    return {
                      ...e,
                      userFocus: true,
                    };
                  })
                }
                onBlur={() =>
                  setName((e) => {
                    return {
                      ...e,
                      userFocus: false,
                    };
                  })
                }
              />

              <p
                id="confirmnote"
                className={
                  name["matchFocus"] && !name["validMatch"]
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
              <button
                disabled={
                  !name["validName"] || !name["validPwd"] || !name["validMatch"]
                    ? true
                    : false
                }
              >
                Sign Up
              </button>
            </form>
         
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </React.Fragment>
  );
}
