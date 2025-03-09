import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return { isAuthenticated };
};

export default useAuthStatus;
