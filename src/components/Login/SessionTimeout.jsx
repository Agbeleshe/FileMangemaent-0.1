import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimeout = ({ timeoutInMs }) => {
  const navigate = useNavigate();
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    const resetTimeout = () => {
      // Clear the existing timer if it exists
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }

      const newTimer = setTimeout(() => {
        // Log the user out and redirect to the login page
        navigate("/login");
      }, timeoutInMs);

      // Set the new timer in the state
      setLogoutTimer(newTimer);
    };

    // Attach event listeners or actions that reset the timeout on user activity
    const handleUserActivity = () => {
      resetTimeout();
    };

    // Attach the initial timeout
    resetTimeout();

    // Attach listeners for user activity (e.g., mousemove, keydown)
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    // Clean up the event listeners and clear the timer when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);

      // Clear the timer to prevent memory leaks
      clearTimeout(logoutTimer);
    };
  }, [navigate, timeoutInMs, logoutTimer]);

  return null;
};

export default SessionTimeout;
