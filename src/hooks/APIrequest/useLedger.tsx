import { useEffect, useState } from "react";
import { Ledger } from "../../pages/Paperlink/resources/Ledger";
import axiosInstance from "../../utils/axiosInstance"; // Import your Axios instance

const useLedger = (
  searchString: string,
  selectedFilter: string,
  startDate?: string | number,
  endDate?: string | number
) => {
  const [users, setUsers] = useState<Ledger[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDatePicked, setIsDatePicked] = useState<boolean | null>(null);

  //logic to filer a range of users
  const datefilter =
    startDate && endDate
      ? `&createdAt[$gte]=${startDate || ""}&createdAt[$lte]=${endDate || ""}`
      : "";

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(token);
    // Set up Axios headers with the token
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Use your Axios instance to make authenticated requests
    axiosInstance
      .get(
        `/ledger?fileName[$like]=%${searchString}%${datefilter}`)
      .then((res) => {
        // console.log(res.data)
        setUsers(res.data.data as Ledger[]);
        // setUsers((user) => [...user, res.data]);
        setError(null);
        //  console.log(res.data);c
        console.log("Success fetching your data", searchString);
      })
      .catch((err) => {
        setError("There was an error fetching data.");
        console.log("There was an issue: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchString, selectedFilter, datefilter]);

  // console.log(loading);
  // console.log(error);
  // console.log(users);
  return {
    loading,
    users,
    error,
    searchString,
    isDatePicked,
    setIsDatePicked,
  };
};

export default useLedger;
