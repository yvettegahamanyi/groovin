import { NavLink } from "../Links/NavLink";
import {
  CompassOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export function Menu(): JSX.Element {
  return (
    <div className="border-2 overflow-hidden">
      <div className="flex items-end px-3 py-1 justify-between overflow-y-scroll">
        <NavLink title="Discover" path="/discover">
          <CompassOutlined />
        </NavLink>

        {/* <NavLink title="Search" path="/search">
          <SearchOutlined />
        </NavLink> */}

        <NavLink title="Design" path="/designs">
          <PlusOutlined />
        </NavLink>

        <NavLink title="Cart" path="/shop">
          <ShoppingCartOutlined />
        </NavLink>

        <NavLink title="Account" path="/profile">
          <UserOutlined />
        </NavLink>
      </div>
    </div>
  );
}
