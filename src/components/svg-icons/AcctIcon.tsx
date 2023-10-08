import { useLocation } from "react-router-dom";

export default function AcctIcon() {
  const location = useLocation();
  const active = location.pathname === "/Accounts";
  const strokeColor = active ? "#ffffff" : "#707070";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="22"
      viewBox="0 0 17 22"
      fill="none"
    >
      <circle
        cx="8.57906"
        cy="6.27803"
        r="4.77803"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.00002 17.7014C0.998732 17.3655 1.07385 17.0337 1.2197 16.7311C1.67736 15.8158 2.96798 15.3307 4.03892 15.111C4.81128 14.9462 5.59431 14.836 6.38217 14.7815C7.84084 14.6533 9.30793 14.6533 10.7666 14.7815C11.5544 14.8367 12.3374 14.9468 13.1099 15.111C14.1808 15.3307 15.4714 15.77 15.9291 16.7311C16.2224 17.3479 16.2224 18.064 15.9291 18.6808C15.4714 19.6419 14.1808 20.0812 13.1099 20.2918C12.3384 20.4634 11.5551 20.5766 10.7666 20.6304C9.57937 20.7311 8.38659 20.7494 7.19681 20.6854C6.92221 20.6854 6.65677 20.6854 6.38217 20.6304C5.59663 20.5773 4.81632 20.4641 4.04807 20.2918C2.96798 20.0812 1.68652 19.6419 1.2197 18.6808C1.0746 18.3747 0.999552 18.0401 1.00002 17.7014Z"
        stroke={strokeColor} // Set stroke color based on the active variable
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
