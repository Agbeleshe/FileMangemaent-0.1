import { useEffect, useState, useCallback } from "react";
import { UsersInfo } from "../pages/Paperlink/resources/UsersInfo";
import { BASE_URL } from "../utils/axios-util";
import axios from "axios";

const useFetchUsers = (searchValue: string, selectedFilter: string, startDate?: string|number , endDate?: string|number) => {
  const [users, setUsers] = useState<UsersInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const datefilter = startDate && endDate ? `&createdAt[$gte]=${startDate || ''}&createdAt[$lte]=${endDate || ''}` : ""

  const userUrl =
    BASE_URL +
      `/files?$sort[createdAt]=-1&filePrivacy=public&fileName[$like]=%${searchValue}%${datefilter}` ||
    `/files?$sort[createdAt]=-1&filePrivacy=public&fileAction=${selectedFilter}&${datefilter}`;
  //{{base_url}}/files?$sort[createdAt]=-1&filePrivacy=public
  //&fileAction=confirm for the filter status
  //&fileName[$like]=%acc% to search for files
  useEffect(() => {
    setLoading(true);
    axios
      .get<{ data: UsersInfo[] }>(userUrl)
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
    userUrl,
    searchValue,
  };
};

export default useFetchUsers;
