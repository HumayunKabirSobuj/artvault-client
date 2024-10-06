import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import CustomerDetailsPage from "../Pages/Customer/CustomerDetailsPage";
import DasHome from "../Pages/Dashboard/DasHome";
import AddProduct from "../Pages/AddProducts/AddProducts";
import ContactPage from "../Pages/Contact/ContactPage";
import PrivateRouter from "./PrivateRouter";
import ProductRequst from "../Pages/ProductRequst/ProductRequst";
import AdminProducts from "../Pages/AdminProducts";
import ClientProducts from "../Pages/ClientProducts/ClientProducts";
import EditAddProduct from "../Pages/AddProducts/EditAddProduct";
import Error from "../Pages/Error";
import AllProducts from "../Pages/AllProducts";
import ProductDetails from "../Pages/ProductRequst/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/login",
        element: <ContactPage />,
      },
      {
        path: "/editproduct/:id",
        element: (
          <PrivateRouter>
            <EditAddProduct></EditAddProduct>
          </PrivateRouter>
        ),
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/product-details/:id",
        element:<ProductDetails></ProductDetails>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,

    children: [
      {
        path: "",
        element: <DasHome />,
      },
      {
        path: "customar-details",
        element: <CustomerDetailsPage />,
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <PrivateRouter>
            <AddProduct />
          </PrivateRouter>
        ),
      },
      {
        path: "product-request",
        element: (
          <PrivateRouter>
            <ProductRequst></ProductRequst>
          </PrivateRouter>
        ),
      },
      {
        path: "admin-products",
        element: (
          <PrivateRouter>
            <AdminProducts></AdminProducts>
          </PrivateRouter>
        ),
      },
      {
        path: "client-products",
        element: <ClientProducts></ClientProducts>,
      },
    ],
  },
]);
