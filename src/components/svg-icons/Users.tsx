import { useLocation } from "react-router-dom";

export default function Users() {
  const location = useLocation();
  const active =location.pathname==="/User"
  const strokeColor = active ? "#ffffff" : "#707070";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="18"
      viewBox="0 0 23 18"
      fill="none"
    >
      <path
        d="M17.595 7.93188C19.1973 7.93188 20.4971 6.63296 20.4971 5.03063C20.4971 3.4283 19.1973 2.12938 17.595 2.12938"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.9292 11.0847C19.4077 11.1177 19.8834 11.1856 20.3519 11.291C21.0027 11.4184 21.7855 11.6852 22.0642 12.2691C22.242 12.6431 22.242 13.0785 22.0642 13.4534C21.7864 14.0373 21.0027 14.3032 20.3519 14.437"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.29011 7.93188C4.68777 7.93188 3.38794 6.63296 3.38794 5.03063C3.38794 3.4283 4.68777 2.12938 6.29011 2.12938"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.95589 11.0847C4.47739 11.1177 4.00164 11.1856 3.53322 11.291C2.88239 11.4184 2.09956 11.6852 1.82181 12.2691C1.64306 12.6431 1.64306 13.0785 1.82181 13.4534C2.09864 14.0373 2.88239 14.3032 3.53322 14.437"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9379 11.7095C15.1847 11.7095 17.9586 12.2009 17.9586 14.1671C17.9586 16.1325 15.2031 16.6421 11.9379 16.6421C8.69015 16.6421 5.91724 16.1508 5.91724 14.1845C5.91724 12.2183 8.67274 11.7095 11.9379 11.7095Z"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        d="M11.9378 8.90492C9.79651 8.90492 8.07959 7.188 8.07959 5.04575C8.07959 2.90442 9.79651 1.1875 11.9378 1.1875C14.0792 1.1875 15.7961 2.90442 15.7961 5.04575C15.7961 7.188 14.0792 8.90492 11.9378 8.90492Z"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
