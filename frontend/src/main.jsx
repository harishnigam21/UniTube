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
import ViewPost from "./component/post/ViewPost.jsx";
import Channel from "./component/channel/Channel.jsx";
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
      { path: "post/view", element: <ViewPost /> },
      {
        path: "channel/:id",
        element: <Channel />,
      },
      { path: "channel/create", element: <CreateChannel /> },
      { path: "channel/view", element: <ViewChannel /> },
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
    <Provider store={myStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
