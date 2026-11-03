import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nac>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
    </nac>
  );
}

export default PageNav;
