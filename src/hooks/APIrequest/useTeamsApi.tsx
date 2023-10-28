import { useEffect, useState } from "react";
import { UserData } from "../../pages/Paperlink/resources/TeamInfor";
import axiosInstance from "../../utils/axiosInstance";
const useTeamsApi = (searchValue: string = "", selectedFilter: string = "" ) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const teamsUserUrl =
  //  axiosInstance +
  // `/teammembers?$sort[createdAt]=-1&${ searchValue.length > 0 ? `&status=${searchValue}` : "" }`;
  //`/users?$sort[createdAt]=-1&role=paid_user&email=${searchValue}`;
  //  `/users?$sort[createdAt]=-1&role=paid_user&companyName[$like]=%${searchValue}%`
  //  .get(`/teammembers?$sort[createdAt]=-1&${ searchValue.length > 0 ? `&status=${searchValue}` : "" }`;`)


  console.log(searchValue)
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    // console.log(token);

    // Set up Axios headers with the token
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Use your Axios instance to make authenticated requests
    axiosInstance
      //  .get<{ data: UserData[] }>(teamsUserUrl)
      .get(
        `/teammembers?$or[0][companyName][$like]=${searchValue}%&$or[1][companyEmail][$like]=${searchValue}%&$or[2][teamMemberEmail][$like]=${searchValue}%&$or[3][status][$like]=${searchValue}%`
      )

      .then((res) => {
        setUsers(res.data.data as UserData[]);
        setError(null);
      })
      .catch((err) => {
        setError("There was an error fetching data.");
        console.log("there was an issue: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedFilter, searchValue]);

  return {
    loading,
    users,
    error,
    searchValue,
    // selectedFilter,
  };
};

export default useTeamsApi;



//selectedFilter is useless now but can be usefull in the future just in case she saids she need two quary at once 