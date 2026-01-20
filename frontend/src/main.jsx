import { StrictMode, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";
import myStore from "./store/Store";
import Loading from "./component/other/Loading.jsx";
//Making all unused component at page loading lazy so that they don't effect performance like more time to load initial page
const Video = lazy(() => import("./component/Player/Video.jsx"));
const SignIn = lazy(() => import("./component/Auth_Component/SignIn.jsx"));
const SignUp = lazy(() => import("./component/Auth_Component/SignUp.jsx"));
const CreatePost = lazy(() => import("./component/post/CreatePost.jsx"));
const CreateChannel = lazy(
  () => import("./component/channel/CreateChannel.jsx"),
);
const ViewChannel = lazy(() => import("./component/channel/ViewChannel.jsx"));
const Post = lazy(() => import("./component/post/Post.jsx"));
const Channel = lazy(() => import("./component/channel/Channel.jsx"));
const Login = lazy(() => import("./component/User_friendly_Error/Login.jsx"));
const NotFound = lazy(
  () => import("./component/User_friendly_Error/NotFound.jsx"),
);
const BadRequest = lazy(
  () => import("./component/User_friendly_Error/BadRequest.jsx"),
);
const ServerError = lazy(
  () => import("./component/User_friendly_Error/ServerError.jsx"),
);

//creating Routes array, where every lazy component is wrapped on Suspense with fallback component so that this component appear until the respective component is coming in network
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //children of '/' route
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "watch",
        element: (
          <Suspense fallback={Loading}>
            <Video />
          </Suspense>
        ),
      },
      {
        path: "post",
        element: (
          <Suspense fallback={Loading}>
            <Post />
          </Suspense>
        ),
      },
      {
        path: "post/create",
        element: (
          <Suspense fallback={Loading}>
            <CreatePost />
          </Suspense>
        ),
      },
      {
        path: "channel/:handler",
        element: (
          <Suspense fallback={Loading}>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: "channel/create",
        element: (
          <Suspense fallback={Loading}>
            <CreateChannel />
          </Suspense>
        ),
      },
      {
        path: "channel/view",
        element: (
          <Suspense fallback={Loading}>
            <ViewChannel />
          </Suspense>
        ),
      },
      {
        path: "msg/login",
        element: (
          <Suspense fallback={Loading}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "msg/not-found",
        element: (
          <Suspense fallback={Loading}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: "msg/bad-request",
        element: (
          <Suspense fallback={Loading}>
            <BadRequest />
          </Suspense>
        ),
      },
      {
        path: "msg/server-error",
        element: (
          <Suspense fallback={Loading}>
            <ServerError />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={Loading}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    path: "/register",

    element: (
      <Suspense fallback={Loading}>
        <SignUp />
      </Suspense>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* //providing store here so that all component in app can use redux store */}
    <Provider store={myStore}>
      {/* // wrapping up our route array in RouterProvider*/}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
