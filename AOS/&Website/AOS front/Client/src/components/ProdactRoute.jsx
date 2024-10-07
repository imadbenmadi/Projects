import { Outlet, useNavigate } from "react-router-dom";
function ProductRoute() {
  const navigate = useNavigate();
  const isAuthenticated = true;
  if (!isAuthenticated) {
    navigate("/sign-in");
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default ProductRoute;
