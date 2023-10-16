import { useEffect, useState, useCallback } from "react";
import { Billing } from "../../pages/Paperlink/resources/Billing";
import { BASE_URL } from "../../utils/axios-util";
import axios from "axios";

const useBilling = (
  searchValue: string,
  selectedFilter: string,
  startDate?: string | number,
  endDate?: string | number
) => {
  const [users, setUsers] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDatePicked, setIsDatePicked] = useState<boolean | null>(null);

  const datefilter =
    startDate && endDate
      ? `&createdAt[$gte]=${startDate || ""}&createdAt[$lte]=${endDate || ""}`
      : "";

  const userUrl = BASE_URL + `/billings?${datefilter}`;

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
  }, [searchValue, selectedFilter, datefilter]);

  return {
    loading,
    users,
    error,
    searchValue,
    isDatePicked,
    setIsDatePicked
  };
};

export default useBilling;
