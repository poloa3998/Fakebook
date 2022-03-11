import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import { IoMdClose } from "react-icons/io";
import RegisterInput from "./RegisterInput";
import axios from "axios";
import { useNavigate } from "react-router";
function Register({ active, setActive }) {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  });

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage: "Enter a valid first name",
      label: "First Name",
      pattern: "^[a-zA-Z]+$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "Enter a valid last name",
      label: "Last Name",
      pattern: "^[a-zA-Z]+$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Enter a valid email",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "New password",
      errorMessage:
        "Password should be at least 4 characters and include at least 1 letter, 1 number, and 1 special character",
      label: "Password",
      pattern: "^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$",
      required: true,
    },
  ]);

  const [birthday, setBirthday] = useState({
    month: "January",
    day: "",
    year: "",
  });

  const [validDays, setValidDays] = useState("[1-9]|[12][0-9]|3[01]");
  const [dayFocused, setDayFocused] = useState(false);
  const [yearFocused, setYearFocused] = useState(false);
  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const birthdayMonthCheck = () => {
    const { month } = birthday;
    if (
      month === "April" ||
      month === "June" ||
      month === "September" ||
      month === "November"
    ) {
      setValidDays("[1-9]|[12][0-9]|3[00]");
    } else if (month === "February") {
      setValidDays("[1-9]|[12][0-8]");
    } else {
      setValidDays("[1-9]|[12][0-9]|3[01]");
    }
  };
  const handleBirthDayChange = (e) => {
    setBirthday({ ...birthday, [e.target.name]: e.target.value });
    birthdayMonthCheck();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const b = `${birthday.month} ${birthday.day} ${birthday.year}`;
    const { firstName, lastName, gender, email, password } = inputValues;

    try {
      setDisableButton(true);
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthday: b,
        gender: gender,
      };
      const res = await axios.post(`/api/users/register`, newUser);

      setLoggedInUser(res.data.user);
      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("authenticated", true);
      setInputValues({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
      });
      setBirthday({
        month: "January",
        day: "",
        year: "",
      });
      setRegisterError("");
      navigate("/");
    } catch (error) {
      setRegisterError("Email already exists");
      setDisableButton(false);
    }
  };

  return (
    <div className="fixed flex flex-col justify-center items-center w-full h-full top-0 bg-white/60">
      <form
        className="container max-w-[30rem] shadow-2xl rounded-lg bg-white p-3 "
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between border-b border-gray-300">
          <div>
            <h1 className="text-4xl font-bold text-black mb-1">Sign Up</h1>
            <p className="text-gray-500 mb-2">It's quick and easy.</p>
          </div>
          <IoMdClose
            className="w-7 h-8 text-gray-500 cursor-pointer"
            onClick={() => setActive(!active)}
          />
        </div>
        {registerError !== "" ? (
          <p className="text-center text-red-500 pt-2"> {registerError}</p>
        ) : null}
        <div className="flex flex-col space-y-3 py-4 px-2">
          <div className="flex justify-around space-x-3">
            <div className="flex flex-col w-full gap-2">
              <div className="flex items-center space-x-3 ">
                {inputs.slice(0, 2).map((input) => {
                  return (
                    <RegisterInput
                      key={input.id}
                      {...input}
                      value={inputValues[input.name]}
                      onChange={handleChange}
                    />
                  );
                })}
              </div>
              {inputs.slice(2, 4).map((input) => {
                return (
                  <RegisterInput
                    key={input.id}
                    {...input}
                    value={inputValues[input.name]}
                    onChange={handleChange}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <p>Birthday</p>
            <div className="flex space-x-3">
              <select
                className="border border-gray-300 rounded-md w-1/2 px-2"
                name="month"
                value={birthday.month}
                onChange={handleBirthDayChange}
              >
                <option name="month" value="January">
                  January
                </option>
                <option name="month" value="February">
                  February
                </option>
                <option name="month" value="March">
                  March
                </option>
                <option name="month" value="April">
                  April
                </option>
                <option name="month" value="May">
                  May
                </option>
                <option name="month" value="June">
                  June
                </option>
                <option name="month" value="July">
                  July
                </option>
                <option name="month" value="August">
                  August
                </option>
                <option name="month" value="September">
                  September
                </option>
                <option name="month" value="October">
                  October
                </option>
                <option name="month" value="November">
                  November
                </option>
                <option name="month" value="December">
                  December
                </option>
              </select>
              <input
                type="text"
                placeholder="Day"
                name="day"
                maxLength="2"
                value={birthday.day}
                onChange={handleBirthDayChange}
                className={
                  !dayFocused
                    ? "registerInput w-1/3"
                    : "registerInput outline-none required:invalid:border-red-500 invalid:visited:text-red-500 w-1/3 "
                }
                pattern={validDays}
                required
                onBlur={() => setDayFocused(true)}
              />
              <input
                type="text"
                placeholder="Year"
                name="year"
                maxLength="4"
                value={birthday.year}
                onChange={handleBirthDayChange}
                className={
                  !yearFocused
                    ? "registerInput w-2/5"
                    : "registerInput outline-none required:invalid:border-red-500 invalid:visited:text-red-500 w-2/5 "
                }
                required
                onBlur={() => setYearFocused(true)}
              />
            </div>
          </div>
          <div>
            <p>Gender</p>
            <div className="flex space-x-3">
              <span className="flex justify-center items-center border border-gray-300 rounded-md space-x-14 p-2 w-[35%] ">
                <label className="" htmlFor="female">
                  Female
                </label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  required
                />
              </span>
              <span className="flex justify-center items-center border border-gray-300 rounded-md space-x-10 w-1/4 ">
                <label htmlFor="male"> Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  required
                />
              </span>
              <span className="flex justify-center items-center border border-gray-300 rounded-md space-x-14 w-[35%]">
                <label htmlFor="custom">Custom</label>
                <input
                  type="radio"
                  name="gender"
                  value="custom"
                  onChange={handleChange}
                  required
                />
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <button
            disabled={disableButton}
            className=" bg-green-600 w-1/2 text-white text-xl font-semibold p-1 rounded-lg mt-2"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
