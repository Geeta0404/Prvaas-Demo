import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFolder,
  FaEnvelope,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const location = useLocation();
  const [username, setUsername] = useState("Admin");
  const [isHotelsOpen, setIsHotelsOpen] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  // Automatically open hotels submenu if path matches any subroute
  useEffect(() => {
    if (location.pathname.startsWith("/admin_panel/hotels")) {
      setIsHotelsOpen(true);
    }
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin_panel");
  if (!isAdminRoute) return null;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin_panel/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Hotels",
      path: "/admin_panel/hotels",
      icon: <FaFolder />,
      subMenu: [
       { name: <span style={{ fontSize: "13.8px" }}>Add New Restaurant</span>, path: "/admin_panel/hotels/New-Restaurant" },
       { name: "Restaurant List", path: "/admin_panel/restaurant-list" },
       { name: "Payment", path: "/admin_panel/payment" },
        { name: "Adventure", path: "/admin_panel/hotels/adventure" },
        { name: "Nightlife", path: "/admin_panel/hotels/nightlife" },
      ],
    },
    {
      name: "Profile",
      path: "/admin_panel/profile",
      icon: <FaEnvelope />,
    },
    {
      name: "Logout",
      path: "/admin_panel/logout",
      icon: <FaChartBar />,
    },
  ];

  return (
    <div
      className="col-lg-2 col-md-5 col-12 text-white p-3"
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        maxWidth: "100%",
        backgroundColor:"#050a24",
      }}
    >
      <div className="fs-4 fw-bold mb-4 border-bottom pb-2">Admin Panel</div>
      <h5 className="mb-4">Welcome, {username}</h5>

      {menuItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        const isParentActive = location.pathname.startsWith(item.path);

        if (item.subMenu) {
          return (
            <div key={index}>
              <div
                onClick={() => setIsHotelsOpen((prev) => !prev)}
                className={`d-flex justify-content-between align-items-center gap-2 mb-2 px-3 py-2 rounded-pill text-decoration-none ${
                  isParentActive ? "bg-white  fw-semibold" : "text-white"
                }`}
                style={{ cursor: "pointer", transition: "0.3s" , color:"#050a24"}}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-5">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {isHotelsOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
              </div>

              {isHotelsOpen && (
                <div className="ms-4 ps-2 border-start border-white">
                  {item.subMenu.map((sub, subIndex) => {
                    const isSubActive = location.pathname === sub.path;
                    return (
                      <Link
                        key={subIndex}
                        to={sub.path}
                        className={`d-block mb-2 px-2 py-1 rounded text-decoration-none ${
                          isSubActive ? "bg-light  fw-semibold" : "text-white"
                        }`}
                        style={{ fontSize: "0.9rem", transition: "0.2s" , color:"#050a24"}}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        } else {
          return (
            <Link
              to={item.path}
              key={index}
              className={`d-flex align-items-center gap-2 mb-3 px-3 py-2 rounded-pill text-decoration-none ${
                isActive ? "bg-white  fw-semibold" : "text-white"
              }`}
              style={{ transition: "0.3s" , color:"#050a24"}}
            >
              <span className="fs-5">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Sidebar;
