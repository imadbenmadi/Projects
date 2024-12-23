
import { Outlet } from "react-router";
import { useState } from "react";

function User() {
    const [user, setUser] = useState(null);  
    return <Outlet context={[user, setUser]} />;
}

export default User;
