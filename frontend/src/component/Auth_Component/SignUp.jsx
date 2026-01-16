import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import useApi from "../../hooks/Api";
export default function SignUp() {
  const { sendRequest, loading } = useApi();
  const [userCredentials, setUserCredentials] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    dob: "",
    email: "",
    mobileno: "",
    password: "",
    cnfPassword: "",
  });
  const [showInfo, setShowInfo] = useState({
    status: false,
    message: "",
    color: "white",
  });
  const navigate = useNavigate();

  const showInfoFunc = (color, message) => {
    setShowInfo({ status: true, message, color });
    setTimeout(() => {
      setShowInfo({ status: false, message: "", color: "" });
    }, 4000);
  };
  const validate = () => {
    //  Names: Only alphabets allowed
    const nameRegex = /^[A-Za-z]+$/;
    if (
      !userCredentials.firstname.trim() ||
      !nameRegex.test(userCredentials.firstname)
    ) {
      showInfoFunc(
        "red",
        "First name is required and should contain only letters."
      );
      return false;
    }
    if (
      userCredentials.middlename.trim() &&
      !nameRegex.test(userCredentials.middlename)
    ) {
      showInfoFunc(
        "red",
        "If entered middlename then it should contain only letters."
      );
      return false;
    }
    if (
      !userCredentials.lastname.trim() ||
      !nameRegex.test(userCredentials.lastname)
    ) {
      showInfoFunc(
        "red",
        "Last name is required and should contain only letters."
      );
      return false;
    }

    //  Gender
    if (!userCredentials.gender) {
      showInfoFunc("red", "Please select a gender.");
      return false;
    }

    //  Mobile: Exactly 10 digits, starts with 6-9 (Indian Standard)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(userCredentials.mobileno)) {
      showInfoFunc(
        "red",
        "Enter a valid 10-digit mobile number starting with 6-9."
      );
      return false;
    }

    //  Email: Standard RFC format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userCredentials.email)) {
      showInfoFunc(
        "red",
        "Please enter a valid email address (e.g., name@domain.com)."
      );
      return false;
    }

    // DOB Specific Validation
    const dobRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!dobRegex.test(userCredentials.dob)) {
      showInfoFunc("red", "Date of Birth must be in DD-MM-YYYY format.");
      return false;
    }
    const [day, month, year] = userCredentials.dob.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    if (
      dateObj.getFullYear() !== year ||
      dateObj.getMonth() !== month - 1 ||
      dateObj.getDate() !== day
    ) {
      showInfoFunc(
        "red",
        "The date you entered does not exist (e.g., Feb 30)."
      );
      return false;
    }
    const today = new Date();
    if (dateObj > today) {
      showInfoFunc("red", "Date of Birth cannot be in the future.");
      return false;
    }
    const age = today.getFullYear() - year;
    if (age < 13) {
      showInfoFunc("red", "You must be at least 13 years old to register.");
      return false;
    }

    // Password Specific Validation
    if (userCredentials.password.length < 8) {
      showInfoFunc("red", "Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(userCredentials.password)) {
      showInfoFunc(
        "red",
        "Password must contain at least one uppercase letter (A-Z)."
      );
      return false;
    }
    if (!/[a-z]/.test(userCredentials.password)) {
      showInfoFunc(
        "red",
        "Password must contain at least one lowercase letter (a-z)."
      );
      return false;
    }
    if (!/[0-9]/.test(userCredentials.password)) {
      showInfoFunc("red", "Password must contain at least one number (0-9).");
      return false;
    }
    if (!/[@$!%*?&]/.test(userCredentials.password)) {
      showInfoFunc(
        "red",
        "Password must contain at least one special character (e.g., @, $, !, %, *, ?, &)."
      );
      return false;
    }
    if (userCredentials.password !== userCredentials.cnfPassword) {
      showInfoFunc("red", "Password does not match with original one.");
      return false;
    }

    return true;
  };
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    await sendRequest("register", "POST", userCredentials, {}, false).then(
      (result) => {
        const data = result?.data;
        if (result && result.success) {
          showInfoFunc("green", data?.message || "Successfully Registered");
          setUserCredentials({
            firstname: "",
            middlename: "",
            lastname: "",
            gender: "",
            dob: "",
            email: "",
            mobileno: "",
            password: "",
            cnfPassword: "",
          });
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        } else {
          const errorMessage =
            result?.error || data?.message || "An error occurred";
          showInfoFunc("red", errorMessage);
          if (result.status === 409) {
            setTimeout(() => {
              navigate(`/signin`, { replace: true });
            }, 2000);
          }
        }
      }
    );
  };
  return (
    <section className="w-screen h-screen box-border flex flex-col min-[480px]:justify-center items-center p-8 overflow-y-scroll text-text">
      <Link to={"/"}>
        <img
          src={isDark ? logoDark : logoLight}
          alt="home"
          title="back to home"
          className="aspect-video w-36 m-4"
        />
      </Link>
      <article className="w-full md:w-[75%] lg:w-[50%] flex flex-col gap-4">
        <h1 className="text-3xl font-times text-center">Welcome to UniTube</h1>
        <p className="text-secondary1 tracking-wider text-center">
          Sign Up to your UniTube account
        </p>
        <form
          action=""
          className="w-full flex flex-col items-center flex-nowrap gap-4"
        >
          {/* name section */}
          <article className="whitespace-nowrap w-full flex flex-col items-center min-[480px]:flex-row min-[480px]:flex-nowrap min-[480px]:justify-between min-[480px]:items-center gap-4">
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="first_name"
                id="first_name_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                First Name
              </label>
              <input
                type="first_name"
                name="first_name"
                id="first_name"
                value={userCredentials.firstname}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                placeholder="Harish"
                aria-required
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    firstname: e.target.value,
                  }))
                }
              />
            </article>
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="middle_name"
                id="middle_name_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start"
              >
                Middle Name
              </label>
              <input
                type="middle_name"
                name="middle_name"
                id="middle_name"
                value={userCredentials.middlename}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    middlename: e.target.value,
                  }))
                }
              />
            </article>
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="last_name"
                id="last_name_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                Last Name
              </label>
              <input
                type="last_name"
                name="last_name"
                id="last_name"
                value={userCredentials.lastname}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                placeholder="Nigam"
                aria-required
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    lastname: e.target.value,
                  }))
                }
              />
            </article>
          </article>
          {/* gender,dob, & mobile number */}
          <article className="whitespace-nowrap w-full flex flex-col items-center min-[480px]:flex-row min-[480px]:flex-nowrap min-[480px]:justify-between min-[480px]:items-center gap-4">
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="gender"
                id="gender_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={userCredentials.gender}
                className="border border-border bg-bgprimary rounded-md p-2 -mt-3 w-full"
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    gender: e.target.value,
                  }))
                }
                aria-required
              >
                <option value="other">Other</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </article>
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="dob"
                id="dob_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600"
              >
                DOB
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="border border-border rounded-md p-2 -mt-3 w-full"
                aria-required
                onChange={(e) => {
                  const dateValue = e.target.value; // Format: "YYYY-MM-DD"
                  if (!dateValue) return;
                  // Reformat to DD-MM-YYYY for your state/backend requirements
                  const [year, month, day] = dateValue.split("-");
                  const formattedDate = `${day}-${month}-${year}`;
                  setUserCredentials((props) => ({
                    ...props,
                    dob: formattedDate,
                  }));
                }}
              />
            </article>
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="mobile_no"
                id="mobile_no_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600"
              >
                Mobile No.
              </label>
              <input
                type="mobile_no"
                name="mobile_no"
                id="mobile_no"
                value={userCredentials.mobileno}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                placeholder="7894561230"
                aria-required
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    mobileno: e.target.value,
                  }))
                }
              />
            </article>
          </article>
          {/* email & password section */}
          <article className="whitespace-nowrap w-full flex flex-col items-center min-[480px]:flex-row min-[480px]:flex-nowrap min-[480px]:justify-between min-[480px]:items-center gap-4">
            {/* email */}
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="email"
                id="email_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userCredentials.email}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                placeholder="abc@gmail.com"
                aria-required
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    email: e.target.value,
                  }))
                }
              />
            </article>
            {/* password */}
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="password"
                id="password_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={userCredentials.password}
                className="border border-border rounded-md p-2 -mt-3 w-full"
                aria-required
                onChange={(e) =>
                  setUserCredentials((props) => ({
                    ...props,
                    password: e.target.value,
                  }))
                }
              />
            </article>
            {/* cnf password */}
            <article className="whitespace-nowrap w-full flex flex-col items-center grow">
              <label
                htmlFor="cnf_password"
                id="cnf_password_Label"
                className="bg-bgprimary ml-4 z-2 w-fit self-start after:content-['*'] after:text-red-600 after:ml-1"
              >
                Confirm Password
              </label>
              <div className="relative flex flex-nowrap -mt-3 w-full items-center">
                <input
                  type="text"
                  name="cnf_password"
                  id="cnf_password"
                  value={userCredentials.cnfPassword}
                  className="border border-border rounded-md p-2 w-full"
                  aria-required
                  onChange={(e) =>
                    setUserCredentials((props) => ({
                      ...props,
                      cnfPassword: e.target.value,
                    }))
                  }
                />
                {userCredentials.cnfPassword.length > 1 &&
                userCredentials.password === userCredentials.cnfPassword ? (
                  <small className="absolute flex items-center right-2 text-white font-extrabold bg-green-400 p-2 w-6 h-6 rounded-full z-3">
                    ✔
                  </small>
                ) : (
                  <small className="absolute flex items-center justify-center right-2 text-white font-extrabold bg-red-400 p-2 w-6 h-6 rounded-full z-3">
                    ✖
                  </small>
                )}
              </div>
            </article>
          </article>
        </form>
        {showInfo.status && (
          <p className={`text-center font-bold text-${showInfo.color}-500`}>
            {showInfo.message}
          </p>
        )}
        <button
          className="py-2 px-8 rounded-md bg-primary text-white self-center focus:shadow-[0.1rem_0.1rem_1rem_0.5rem_green_inset] w-fit gap-2 flex justify-center items-center icon"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          <p>Sign Up</p>
          {loading && <p className="spinner"></p>}
        </button>
        <span className="text-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-primary font-semibold">
            Sign In
          </Link>
        </span>
      </article>
    </section>
  );
}
