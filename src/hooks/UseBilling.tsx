import { useEffect, useState, useCallback } from "react";
import { Billing } from "../pages/Paperlink/resources/Billing";
import { BASE_URL } from "../utils/axios-util";
import axios from "axios";

const useBilling = () => {
  const [users, setUsers] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userUrl = BASE_URL + "/billings";

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ data: Billing[] }>(userUrl)
      .then((res) => {
        setUsers(res.data.data);
        setError(null);
      })
      .catch((err) => {
        setError("There was an error fetching data.");
        console.log("there was an issue: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    users,
    error,
  };
};

export default useBilling;
