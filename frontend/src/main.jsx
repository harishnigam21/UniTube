import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Video from "./component/Player/Video.jsx";
import SignIn from "./component/Auth_Component/SignIn.jsx";
import SignUp from "./component/Auth_Component/SignUp.jsx";
import myStore from "./store/Store";

import { Provider } from "react-redux";
import CreatePost from "./component/post/CreatePost.jsx";
import CreateChannel from "./component/channel/CreateChannel.jsx";
import ViewChannel from "./component/channel/ViewChannel.jsx";
import Post from "./component/post/Post.jsx";
import Channel from "./component/channel/Channel.jsx";
import Login from "./component/User_friendly_Error/Login.jsx";
import NotFound from "./component/User_friendly_Error/NotFound.jsx";
import BadRequest from "./component/User_friendly_Error/BadRequest.jsx";
import ServerError from "./component/User_friendly_Error/ServerError.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "watch", element: <Video /> },
      {
        path: "post",
        element: <Post />,
      },
      { path: "post/create", element: <CreatePost /> },
      {
        path: "channel/:handler",
        element: <Channel />,
      },
      { path: "channel/create", element: <CreateChannel /> },
      { path: "channel/view", element: <ViewChannel /> },
      { path: "msg/login", element: <Login /> },
      { path: "msg/not-found", element: <NotFound /> },
      { path: "msg/bad-request", element: <BadRequest /> },
      { path: "msg/server-error", element: <ServerError /> },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
