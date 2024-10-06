import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Banner from "../../Components/Banner";


const Home = () => {
  const { user } = useContext(AuthContext)
  // console.log(user)
  return (
    <div>
      <Banner />
      {/* https://artvault-puce.vercel.app/ */}

    </div>
  );
};

export default Home;