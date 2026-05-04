import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";

export const CommitteeContext = createContext();

export const CommitteeProvider = ({ children }) => {
  const [members, setMembers] = useState(null);
  const { isLogin, token } = useContext(UserContext);

  const getAllMembers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/committee/get-members",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMembers(res.data.members); // based on your backend response
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    if (isLogin) {
      getAllMembers();
    }
  }, [isLogin]);

  return (
    <CommitteeContext.Provider value={{ members, getAllMembers }}>
      {children}
    </CommitteeContext.Provider>
  );
};
