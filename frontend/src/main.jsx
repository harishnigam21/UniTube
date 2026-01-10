import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Video from "./component/Player/Video.jsx";
import SignIn from "./component/Auth_Component/SignIn.jsx";
import SignUp from "./component/Auth_Component/SignUp.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "watch", element: <Video /> },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/registration",
    element: <SignUp />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
