import { useEffect, useState } from "react";
import { Ledger } from "../../pages/Paperlink/resources/Ledger";
import axiosInstance from "../../utils/axiosInstance"; // Import your Axios instance

const useLedger = (searchString: string = "") => {
  const [users, setUsers] = useState<Ledger[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(token);
    // Set up Axios headers with the token
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Use your Axios instance to make authenticated requests
    axiosInstance
      .get(`/ledger?fileName[$like]=%${searchString}%`)
      .then((res) => {
        // console.log(res.data)
        setUsers(res.data.data as Ledger[]);
        // setUsers((user) => [...user, res.data]);
        setError(null);
        //  console.log(res.data);c
        console.log("Success fetching your data");
      })
      .catch((err) => {
        setError("There was an error fetching data.");
        console.log("There was an issue: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchString]);
  console.log(loading);
  console.log(error);
  // console.log(users);
  return {
    loading,
    users,
    error,
  };
};

export default useLedger;
