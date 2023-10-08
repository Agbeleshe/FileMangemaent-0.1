import { useLocation } from "react-router-dom";

export default function Download() {
  const location = useLocation();
  const active = location.pathname === "/AccountRecieve";

  // Define the stroke color based on the active variable
  const strokeColor = active ? "#ffffff" : "#707070";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
    >
      <path
        d="M10.1223 13.4361L10.1223 1.3951"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0383 10.5084L10.1223 13.4364L7.20633 10.5084"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7551 6.12801H15.6881C17.7231 6.12801 19.3721 7.77701 19.3721 9.81301V14.697C19.3721 16.727 17.7271 18.372 15.6971 18.372L4.55707 18.372C2.52207 18.372 0.87207 16.722 0.87207 14.687V9.80201C0.87207 7.77301 2.51807 6.12801 4.54707 6.12801H5.48907"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
