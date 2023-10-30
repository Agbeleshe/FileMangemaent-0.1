import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  // Define the structure of a user object here
  // For example:
  id: number;
  firstName: string;
  // Add other properties as needed
}

const UserAxios: React.FC = () => {
  const [user, setUser] = useState<User[]>([]); // Use an array to store user data
  const userUrl = "https://dev-backend.paperlink.app/users";

  useEffect(() => {
    axios
      .get<{ data: User[] }>(userUrl)
      .then((res) => {
        console.log("API response:", res.data);

        // Log the firstName property of each object in the data array
        res.data.data.forEach((user) => {
          console.log("First Name:", user.firstName);
        });

        // Pass the data property to setUser
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("There was an error fetching data:", err);
      });
  }, []);

  return (
    <div>
      <br /> <div>Axios</div>
      <div></div>
    </div>
  );
};

export default UserAxios;
