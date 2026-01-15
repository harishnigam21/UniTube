import { Link } from "react-router-dom";
import pic from "../../assets/images/please_signin.png";
export default function Login() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <Link to={"/login"}>
        <img
          className="object-cover object-center"
          src={pic}
          alt="Please LogIn to move forward"
        />
      </Link>
    </section>
  );
}
