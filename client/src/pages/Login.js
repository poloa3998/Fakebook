import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import Register from "../components/Register";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [registerActive, setRegisterActive] = useState(false);
  const { login, error } = useContext(AuthContext);
  const [disableButton, setDisableButton] = useState(false);

  const handleSearch = (e) => {
    if (disableButton) {
      setDisableButton(false);
    }
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableButton(true);
    login(input.email, input.password);
    setInput({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <div className=" flex flex-col space-y-4 lg:flex-row justify-center items-center h-screen w-screen bg-gray-100 p-8 lg:space-x-28">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center space-y-4 lg:pb-52 lg:justify-start lg:items-start">
          <h1 className="text-6xl text-blue-500 font-bold">fakebook</h1>
          <p className="text-2xl text-center  w-96 lg:text-left">
            Connect with friends and the world around you on Fakebook.
          </p>
        </div>
        <div>
          <div className="bg-white flex flex-col h-fit w-96 p-5 shadow-xl rounded-xl space-y-3">
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              {error === "" ? null : (
                <p className="text-center text-red-500">{error}</p>
              )}
              <input
                type="email"
                className="border border-gray-300 rounded-md h-1/6 p-4"
                name="email"
                value={input.email}
                placeholder="Email"
                onChange={handleSearch}
              />

              <input
                type="password"
                className="border border-gray-300 rounded-md h-1/6 p-4"
                name="password"
                value={input.password}
                placeholder="Password"
                onChange={handleSearch}
              />
              <button className="bg-blue-500 text-white text-xl font-medium rounded-md h-12 ">
                Log In
              </button>
              <p className="text-center text-blue-500 text-sm font-medium border-b pb-1">
                Forgot password?
              </p>
            </form>
            <div className="flex justify-center">
              <button
                className="bg-green-600 text-white p-3 text-lg rounded-lg font-medium "
                onClick={() => setRegisterActive(!registerActive)}
              >
                Create new account
              </button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="w-1/2 border-b border-gray-300"> </p>
              <p className="text-center text-gray-500">or </p>
              <p className="w-1/2 border-b border-gray-300"> </p>
            </div>
            <div className="flex justify-center">
              <a
                href="/api/users/auth/facebook"
                className="bg-blue-500 text-white font-medium rounded-md p-3 w-64 h-12"
              >
                Login with the Real Facebook
              </a>
            </div>
          </div>
          <p className="text-center text-sm mt-8">
            <strong>Create a page </strong>
            for a celebrity, brand or business.
          </p>
        </div>
      </div>
      {!registerActive ? null : (
        <Register active={registerActive} setActive={setRegisterActive} />
      )}
    </>
  );
}

export default Login;
