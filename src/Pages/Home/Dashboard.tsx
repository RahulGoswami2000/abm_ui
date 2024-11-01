import Header from "../../Component/Header/Header";
import MotivationalPage from "../../Component/MotivationPage/MotivationPage";
import { useAuth } from "../Auth/AuthContext";

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
      <MotivationalPage />
    </>
  );
};

export default Dashboard;
