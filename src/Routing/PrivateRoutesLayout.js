import { Outlet, useLocation, Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Layout from "../components/PaperlinkShared/Layout";

const PrivateRoutesLayout = () => {
const location = useLocation();
const token = localStorage.getItem(
"token"
)
// Assuming your axiosInstance makes a request and you want to check if it was successful
// const axiosResponse = axiosInstance.response;

return token ? (
<Layout />
) : (
// Keep the previous navigation stack
<Navigate to="/authentication" state={{ from: location }} replace />
);
};

export default PrivateRoutesLayout;