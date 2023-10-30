
import { useEffect, useState, useCallback } from "react";
import { UsersInfo } from "../../pages/Paperlink/resources/UsersInfo";
import { BASE_URL } from "../../utils/axios-util";
import axios from "axios";

const useFetchUsers = (
  searchValue: string,
  selectedFilter: string,
  startDate?: string | number,
  endDate?: string | number
) => {
  const [users, setUsers] = useState<UsersInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDatePicked, setIsDatePicked] = useState<boolean | null>(null);

  const datefilter =
    startDate && endDate
      ? `&createdAt[$gte]=${startDate || ""}&createdAt[$lte]=${endDate || ""}`
      : "";

  const userUrl =
    BASE_URL +
      `/files?$sort[createdAt]=-1&filePrivacy=public&fileName[$like]=%${searchValue}% ${datefilter}` ||
    `/files?$sort[createdAt]=-1&filePrivacy=public&fileAction=${selectedFilter}&${datefilter}`;
  // `/files?$or[0][userId]=${selectedFilter}&$or[1][uploadedBy]=${searchValue}$or[2][user.email][$like]=${searchValue}%$or[3][fileName][$like]=${searchValue}%&${datefilter}`;
  //      &userEmail[$like]=%${searchValue}% this is for the new email own its not working because no information it yet

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
  // console.log(searchValue, "aaaakkkeeee");

  return {
    loading,
    users,
    error,
    userUrl,
    searchValue,
    isDatePicked,
    setIsDatePicked,
  };
};

export default useFetchUsers;
