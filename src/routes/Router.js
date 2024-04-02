import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const PrivateRoute = lazy(() => import("./PrivateRoute.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

const Account = lazy(() => import("../components/User/Account.js"));

const Product = lazy(() => import("../views/ui/Product"));
const Files = lazy(() => import("../views/ui/Files"));
const FileUpload = lazy(() => import("../views/ui/FileUpload"));

const Login = lazy(() => import("../auth/Login.js"));
const Register = lazy(() => import("../auth/Register.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <FullLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/account", exact: true, element: <Account /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/product", exact: true, element: <Product /> },
      { path: "/fileupload", exact: true, element: <FileUpload /> },
      { path: "/files", exact: true, element: <Files /> },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default ThemeRoutes;
