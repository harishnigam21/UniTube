import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoginStatus } from "../store/Slices/userSlice";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGlobalStatus = useCallback(
    (statusCode) => {
      switch (statusCode) {
        case 401:
        case 403:
          dispatch(changeLoginStatus(false));
          navigate("/login");
          break;
        case 404:
          navigate("/not-found");
          break;
        case 500:
          navigate("/server-error");
          break;
        default:
          break;
      }
    },
    [navigate, dispatch]
  );

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, customHeaders = {}) => {
      setLoading(true);
      setError(null);
      setStatus(null);
      const updateUrl = `${import.meta.env.VITE_BACKEND_HOST}/${url}`;
      try {
        const options = {
          method,
          headers: {
            "Content-Type": "application/json",
            // Automatically pull token if it exists in localStorage
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("acTk"))}`,
            ...customHeaders,
          },
          // Don't send a body for GET or DELETE requests
          body:
            body && ["POST", "PUT", "PATCH"].includes(method)
              ? JSON.stringify(body)
              : null,
        };

        const response = await fetch(updateUrl, options);
        setStatus(response.status);

        // 1. Handle critical redirects
        handleGlobalStatus(response.status);

        // 2. Parse the JSON
        const result = await response.json();

        // 3. Handle non-ok responses (400, 401, etc.)
        if (!response.ok) {
          throw new Error(result.message || "API request failed");
        }

        setData(result);
        return { success: true, data: result, status: response.status };
      } catch (err) {
        console.error("API Error Caught:", err.message);
        const internalErrorStatus = 500;
        setStatus(internalErrorStatus);
        setError("Something went wrong on our end. Redirecting...");
        // Force navigation to server-error page so the UI doesn't look "broken"
        handleGlobalStatus(internalErrorStatus);
        return {
          success: false,
          error: err.message,
          status: internalErrorStatus,
        };
      } finally {
        setLoading(false);
      }
    },
    [handleGlobalStatus]
  );

  return { data, loading, error, status, sendRequest };
};

export default useApi;
