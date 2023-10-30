import { useEffect, useState, useCallback } from "react";
import { Infor } from "../../pages/Paperlink/resources/Infor";
import { BASE_URL } from "../../utils/axios-util";
import axios from "axios";

const useAccApi = (
  selectedFilter: string,
  searchValue: string,
  startDate?: string | number,
  endDate?: string | number
) => {
  const [users, setUsers] = useState<Infor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDatePicked, setIsDatePicked] = useState<boolean | null>(null);

  const datefilter =
    startDate && endDate
      ? `&createdAt[$gte]=${startDate || ""}&createdAt[$lte]=${endDate || ""}`
      : "";

  const paidUserUrl =
    BASE_URL +
    `/users?$sort[createdAt]=-1&role=paid_user&$or[0][companyName][$like]=${selectedFilter}%&$or[1][email][$like]=${selectedFilter}%&$or[2][status][$like]=${selectedFilter}%${datefilter}`;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(paidUserUrl);
        setUsers(response.data.data);
        setError(null);
      } catch (err) {
        setError("There was an error fetching data.");
        console.log("there was an issue: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedFilter, searchValue, datefilter]);

  console.log(users);
  console.log(startDate, endDate);
  console.log(selectedFilter, "heree");
  return {
    loading,
    users,
    error,
    // selectedFilter,
    searchValue,
    isDatePicked,
    setIsDatePicked,
  };
};

export default useAccApi;
