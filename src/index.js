import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils";
import "./index.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import reportWebVitals from "./reportWebVitals";
import ErrorPage from "./pages/ErrorPage";
import LoadingsAndErrors from "./components/LoadingsAndErrors";
import AdminsGuard from "./components/guards/AdminsGuard";
import UsersGuard from "./components/guards/UsersGuard";
import HeadlessModal from "./components/modalsAndPopUps/HeadlessModal";
import LandingPage from "./pages/LandingPage";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
//
const MainRoute = React.lazy(() => import("./routes/MainRoute"));
const AllProducts = React.lazy(() => import("./pages/AllProducts"));
const AllBrandsPage = React.lazy(() => import("./pages/AllBrandsPage"));
const OneProductPage = React.lazy(() => import("./pages/OneProductPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const LogInPage = React.lazy(() => import("./pages/LogInPage"));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));
const UserConfrimPage = React.lazy(() => import("./pages/UserConfrimPage"));
const AllCategoriesAndSubPage = React.lazy(() =>
  import("./pages/AllCategoriesAndSubPage")
);
const AllProductsBySubCategoryPage = React.lazy(() =>
  import("./pages/AllProductsBySubCategoryPage")
);
const AllProductsByBrandPage = React.lazy(() =>
  import("./pages/AllProductsByBrandPage")
);
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
//
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
  console.log = () => {};
}

const muiTheme = createTheme({
  typography: {
    fontFamily: ["Almarai"],
  },
  textField: {
    direction: "rtl",
    textAlign: "end",
  },
});
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <LoadingsAndErrors>
            <h4>Loading...</h4>
          </LoadingsAndErrors>
        }
      >
        <MainRoute />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "all-products",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <AllProducts />
          </Suspense>
        ),
      },
      {
        path: "all-brands",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <AllBrandsPage />
          </Suspense>
        ),
      },
      {
        path: "categories-and-subcategories",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <AllCategoriesAndSubPage />
          </Suspense>
        ),
      },
      {
        path: "products-sortby-subcategories",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <AllProductsBySubCategoryPage />
          </Suspense>
        ),
      },
      {
        path: "products-sortby-brand",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <AllProductsByBrandPage />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <OneProductPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <AdminsGuard>
              <AdminDashboard />
            </AdminsGuard>
          </Suspense>
        ),
      },
      {
        path: "user-profile",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <UsersGuard>
              <UserPage />
            </UsersGuard>
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <LogInPage />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: "users/email-confirmation/:confirmToken",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <UserConfrimPage />
          </Suspense>
        ),
      },
      {
        path: "users/reset-password/:confirmToken",
        element: (
          <Suspense
            fallback={
              <LoadingsAndErrors>
                <h4>Loading...</h4>
              </LoadingsAndErrors>
            }
          >
            <UserConfrimPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>

  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <HeadlessModal />
      <RouterProvider router={routes} />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
