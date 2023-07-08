import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedOut } from "../utils/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HiBars3, HiBell, HiXMark } from "react-icons/hi2";
import { BsCart } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import { useUserLogoutMutation } from "../utils/api/apiSlice";
import Button from "@mui/material/Button";
//

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { cart } = useSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLogout, { isSuccess, data: log }] = useUserLogoutMutation();
  const logOut = async (e) => {
    localStorage.clear();
    await userLogout();

    dispatch(isLoggedOut());
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };
  //
  const loggedIn = localStorage.getItem("isLoggedIn");
  const admin = localStorage.getItem("admin");
  const userImage = localStorage.getItem("userImage");
  const navigation = [
    { name: "التواصل", to: "contact", current: false },
    { name: "جميع المنتجات", to: "all-products", current: false },
    { name: "جميع الماركات", to: "all-brands", current: false },
    {
      name: "جميع التصنيفات",
      to: "categories-and-subcategories",
      current: false,
    },
    { name: "الرئيسية", to: "/", current: true },
    {
      name: "تسجيل الدخول",
      to: "login",
      current: false,
    },
  ];
  //

  //
  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-tr from-mainColor to-green-700 z-30 sticky top-0"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-start flex-row-reverse">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden ">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-start rounded-md p-2 text-white  active:text-yellow-500  ">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiXMark className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiBars3 className="block h-6 w-6 " aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start flex-row-reverse">
                <div
                  className={` ${
                    loggedIn === "true" && admin === "true"
                      ? "hidden"
                      : "sm:items-center me-2 ms-auto sm:m-1"
                  } flex flex-shrink-0 place-items-center  `}
                >
                  <Link to={`cart`}>
                    <Badge
                      className={`${cart.length > 0 ? "" : "hidden"}`}
                      badgeContent={cart.length}
                      color={`warning`}
                    >
                      <BsCart color="white" size={"20px"} />
                    </Badge>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex space-x-1 me-4">
                    {navigation.map((item, idx) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        end
                        className={({ isActive, isPending }) =>
                          isActive
                            ? "bg-slate-300/90 text-black  rounded-md px-3 py-2 text-sm font-medium "
                            : loggedIn && item.name === "تسجيل الدخول"
                            ? "hidden"
                            : "text-gray-300 hover:bg-slate-300/50 hover:text-black rounded-md px-3 py-2 text-sm font-medium transition-all"
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    <Link to={`/signup`}>
                      <Button
                        sx={{
                          backgroundColor: "limegreen",
                          ":hover": { backgroundColor: "green" },
                          marginX: "0.50rem",
                          paddingX: "0.50rem",
                        }}
                        className={`duration-150 `}
                        variant={`contained`}
                      >
                        signup
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className={` ${
                  loggedIn === "true" ? "" : "hidden"
                } absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}
              >
                {/* notifications */}
                {/* <button */}
                {/*   type="button" */}
                {/*   className="rounded-full bg-mainColor p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" */}
                {/* > */}
                {/*   <span className="sr-only">View notifications</span> */}
                {/*   <HiBell className="h-6 w-6" aria-hidden="true" /> */}
                {/* </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-mainColor text-sm focus:outline-none ">
                      <span className={` sr-only`}>Open user menu</span>
                      <img
                        className={` ${
                          userImage ? "" : "hidden"
                        } h-8 w-8 rounded-full object-cover ring-yellow-700 ring-1`}
                        src={userImage}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 sm:left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="user-profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item
                        className={`${loggedIn === "true" ? "" : "hidden"}`}
                      >
                        {({ active }) => (
                          <Link
                            onClick={(e) => logOut(e)}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            log out
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item
                        className={`${
                          loggedIn === "true" && admin === "true"
                            ? ""
                            : "hidden"
                        }`}
                      >
                        {({ active }) => (
                          <Link
                            to={`admin-dashboard`}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  as="a"
                  to={item.to}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "bg-slate-300/90 text-black block rounded-md px-3 py-2 text-pase font-medium "
                      : loggedIn && item.name === "تسجيل الدخول"
                      ? "hidden"
                      : " block text-gray-300 hover:bg-slate-300/50 hover:text-black rounded-md px-3 py-2 text-pase font-medium"
                  }
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
              <Link to={`/signup`}>
                <Button
                  sx={{
                    backgroundColor: "limegreen",
                    ":hover": { backgroundColor: "green" },
                    marginY: "0.75rem",
                    paddingX: "0.50rem",
                  }}
                  className={`duration-150 `}
                  variant={`contained`}
                >
                  signup
                </Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;

// classNames(
//   item.current
//     ? "bg-gray-900 text-white"
//     : "text-gray-300 hover:bg-gray-700 hover:text-white",
//   "rounded-md px-3 py-2 text-sm font-medium"
// );
