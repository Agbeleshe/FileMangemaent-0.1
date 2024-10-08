import { useEffect, useState, useCallback } from "react";
import { Infor } from "../../pages/Paperlink/resources/Infor";
import { BASE_URL } from "../../utils/axios-util";
import axios from "axios";

const useInFor = (
  searchTerms: string = "",
  selectedFilter: string,
  searchValue: string
) => {
  const [users, setUsers] = useState<Infor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paidUserUrl =
    BASE_URL +
      `/users?$sort[createdAt]=-1&role=paid_user&companyName[$like]=%${searchTerms}%` ||
    `/users?$sort[createdAt]=-1&role=paid_user&status=${selectedFilter}` ||
    `/users?$sort[createdAt]=-1&role=paid_user&email=${searchValue}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ data: Infor[] }>(paidUserUrl)
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
  }, [searchTerms, selectedFilter, searchValue]);

  return {
    loading,
    users,
    error,
    // selectedFilter,
  };
};

export default useInFor;
