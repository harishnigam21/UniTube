import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { changeLoginStatus, newUser } from "../../store/Slices/userSlice";
export default function SignIn() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [passwordStatus, setPasswordStatus] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    }
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    const verifyUser = async () => {
      const url = `${import.meta.env.VITE_BACKEND_HOST}/login`;
      try {
        const response = await fetch(url, {
          headers: { "content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            email: userCredentials.email,
            password: userCredentials.password,
          }),
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          errorRef.current.textContent = data.message;
          if (response.status === 403) {
            setTimeout(() => {
              navigate(`/signup`, { replace: true });
            }, 2000);
          }
          return;
        }
        errorRef.current.style.color = "green";
        errorRef.current.textContent = data.message;
        data.actk &&
          window.localStorage.setItem("acTk", JSON.stringify(data.actk));
        if (data.user) {
          dispatch(newUser({ userInfo: data.user }));
          dispatch(changeLoginStatus({ status: true }));
          window.localStorage.setItem("userInfo", JSON.stringify(data.user));
        }
        setTimeout(() => {
          navigate(`/`, { replace: true });
        }, 2000);
      } catch (error) {
        console.log(error.message);
        errorRef.current.textContent = error.message;
      } finally {
        setLoader(false);
      }
    };

    setTimeout(() => {
      errorRef.current.textContent = validateEmail(userCredentials.email);
      !validateEmail(userCredentials.email) ? verifyUser() : setLoader(false);
    }, 1000);
  };
  return (
    <section className="w-screen h-screen box-border flex flex-col justify-center items-center p-8 text-text">
      <Link to={"/"}>
        <img
          src={logo}
          alt="home"
          title="back to home"
          className="aspect-video w-36 m-4"
        />
      </Link>
      <article className="w-full md:w-[75%] lg:w-[50%] flex flex-col gap-4">
        <h1 className="text-3xl font-times text-center">Welcome back</h1>
        <p className="text-secondary1 tracking-wider text-center">
          Sign In to your uniTube account
        </p>
        <form
          action=""
          className="w-full flex flex-col items-center flex-nowrap gap-4"
        >
          <article className="whitespace-nowrap flex flex-col items-center w-full sm:w-3/4">
            <label
              htmlFor="email"
              id="emailLabel"
              className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userCredentials.email}
              className="border border-border rounded-md p-2 -mt-3 w-full"
              placeholder="you@example.com"
              aria-required
              onChange={(e) =>
                setUserCredentials((props) => ({
                  ...props,
                  email: e.target.value,
                }))
              }
            />
          </article>
          <article className="whitespace-nowrap flex flex-col items-center w-full sm:w-3/4">
            <label
              htmlFor="password"
              id="passwordLabel"
              className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
            >
              Password
            </label>
            <div className="relative w-full flex items-center -mt-3">
              <input
                type={passwordStatus ? "text" : "password"}
                name="password"
                id="password"
                value={userCredentials.password}
                className="border border-border rounded-md p-2 w-full"
                placeholder="........"
                aria-required
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    password: e.target.value,
                  }))
                }
              />
              {passwordStatus ? (
                <IoMdEyeOff
                  className="cursor-pointer text-2xl absolute right-2"
                  onMouseLeave={() => setPasswordStatus(false)}
                />
              ) : (
                <IoMdEye
                  className="cursor-pointer text-2xl absolute right-2"
                  onMouseEnter={() => setPasswordStatus(true)}
                />
              )}
            </div>
          </article>
        </form>
        <p ref={errorRef} className="text-red-500 font-bold text-center"></p>
        <button
          className="py-2 px-8 rounded-md bg-primary text-white self-center focus:shadow-[0.1rem_0.1rem_1rem_0.5rem_green_inset] w-fit gap-2 flex justify-center items-center icon"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <p>Sign In</p>
          {loader && (
            <p className="w-5 aspect-square rounded-full border-4 border-l-violet-500 border-r-green-500 border-b-orange-600 border-t-red-500 animate-[spin_0.3s_linear_infinite]"></p>
          )}
        </button>
        <Link to={"/forgot_password"} className="text-primary self-center">
          Forgot your password?
        </Link>
        <span className="text-center">
          Don't have an account?{" "}
          <Link to={"/registration"} className="text-primary font-semibold">
            Sign up
          </Link>
        </span>
      </article>
    </section>
  );
}
