import logo from "../../assests/logo.svg";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import { RootState } from "../../store"; // Replace with the correct path to your root reducer


const MobileHeader = () => {
  const userEmail = useSelector((state: RootState) => state.auth.userEmail); // Assuming your Redux slice is named 'auth'

  return (
    <div className="md:hidden h-auto  w-full py-5 fixed bg-white">
      <div className=" flex justify-between px-5 py-2">
        <div>
          <img src={logo} alt="Paperdaz logo" />
        </div>
        <div className="bg  font-extrabold text-white  p-2 mt-3 rounded-full h-12 w-12 flex justify-center items-center">
        {userEmail ? userEmail.charAt(0).toUpperCase() : ''}
        </div>
      </div>
    </div>
  );
};
export default MobileHeader;
