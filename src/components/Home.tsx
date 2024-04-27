import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { getDataFromToken } from "../services/authService";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      let { id } = getDataFromToken() ?? {};
      if (id == null) {
        return;
      }

      try {
        var result = await getUser(id);
        setLoading(false);
        setUserData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading.. Please wait</div>;
  }

  return <>Welcome {userData.name}</>;
};

export default Home;
