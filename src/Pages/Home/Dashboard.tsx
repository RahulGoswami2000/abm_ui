import Header from "../../Component/Header/Header";
import { useAuth } from "../Auth/AuthContext";

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={logout} />
    </>
  );
};

export default Dashboard;
