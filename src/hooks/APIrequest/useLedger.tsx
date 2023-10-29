import { useEffect, useState } from "react";
import { Ledger } from "../../pages/Paperlink/resources/Ledger";
import axiosInstance from "../../utils/axiosInstance"; // Import your Axios instance

const useLedger = (
  searchValue: string,
  selectedFilter: string,
  startDate?: string | number,
  endDate?: string | number
) => {
  const [users, setUsers] = useState<Ledger[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDatePicked, setIsDatePicked] = useState<boolean | null>(null);

  //logic to filer a range of users
  // const datefilter =
  //   startDate && endDate
  //     ? `&createdAt[$gte]=${startDate || ""}&createdAt[$lte]=${endDate || ""}`
  //     : "";

  const datefilter =
    startDate && endDate
      ? `&createdAt[$gte]=${startDate || ""}&createdAt[$lte]=${endDate || ""}`
      : "";

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    //  console.log(token);

    // Set up Axios headers with the token
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Use your Axios instance to make authenticated requests
    axiosInstance
      .get(`/ledger?fileName[$like]=%${searchValue}%${datefilter}`)
      .then((res) => {
        setUsers(res.data.data as Ledger[]);
        setError(null);
        console.log("Success fetching your data", searchValue);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Handle the 401 Unauthorized error here
          setError(
            "Your session has timed out, and you are unauthorized. Try logging in again."
          );
        } else {
          setError(
            "There was an error fetching data. Try refreshing this page."
          );
        }
        console.log(
          "There was an issue: ",
          error,
          "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchValue, selectedFilter, datefilter]);

  // console.log(loading);
  // console.log(error);
 // console.log(users,"checking");
  return {
    loading,
    users,
    error,
    searchValue,
    isDatePicked,
    setIsDatePicked,
  };
};

export default useLedger;
