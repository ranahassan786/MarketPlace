import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, protectedRoute }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (protectedRoute) {
    
      if (!user) {
        navigate("/Login", { replace: true });
      } else {
        setLoading(false);
      }
    } else {
      
      if (user) {
        navigate("/Home", { replace: true });
      } else {
        setLoading(false);
      }
    }
  }, [navigate, protectedRoute]);

  if (loading) return <h2>Loading...</h2>;

  return children;
};

export default AuthLayout;