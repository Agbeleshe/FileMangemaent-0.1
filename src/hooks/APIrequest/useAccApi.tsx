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

let queryParams = [];

if (selectedFilter) {
  queryParams.push(`status=${selectedFilter}`);
}

if (searchValue) {
  queryParams.push(`companyName[$like]=%${searchValue}`);
}

// Combine the query parameters into a single string
const queryString = queryParams.join("&");

// Construct the complete URL
const paidUserUrl = `${BASE_URL}/users?$sort[createdAt]=-1&role=paid_user${datefilter}${queryString}`;

  // `/users?$sort[createdAt]=-1&role=paid_user&status=${selectedFilter}`;
  //`/users?$sort[createdAt]=-1&role=paid_user&email=${searchValue}`;
  //  `/users?$sort[createdAt]=-1&role=paid_user&companyName[$like]=%${searchValue}%`
  // `/users?$sort[createdAt]=-1&role=paid_user&status=${selectedFilter}`;

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
