import './sidebar.css';
import { Storefront } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar" 
      style={{position: "sticky"}}
    >
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">

              <Link to="/products" className="link">
                  <li className="sidebarListItem">
                      <Storefront className="sidebarIcon" />
                      Products
                  </li>

                </Link>


              <Link to="/addproducts" className="link">
                  <li className="sidebarListItem">
                      <Storefront className="sidebarIcon" />
                      Add Products

                  </li>
              </Link>

            </ul>

        </div>

      </div>
    </div>
  );
}