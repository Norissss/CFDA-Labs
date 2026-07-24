import { NavLink } from "react-router";

function NavBar() {
  function getNavLinkClass({ isActive }) {
    return isActive
      ? "nav-link nav-link-active"
      : "nav-link";
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink className="navbar-brand" to="/">
          React Task Manager
        </NavLink>

        <div className="navbar-links">
          <NavLink
            className={getNavLinkClass}
            end
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getNavLinkClass}
            to="/tasks"
          >
            Tasks
          </NavLink>

          <NavLink
            className={getNavLinkClass}
            to="/about"
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;