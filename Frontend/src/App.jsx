import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import AddListing from "./Components/Listings/AddListing/AddListing";
import Listings from "./Components/Listings/Listings";
import ShowListing from "./Components/Listings/ShowListing/ShowListing";
import EditListing from "./Components/Listings/EditListing/EditListing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar></Navbar>
          <Listings></Listings>
          <Footer></Footer>
        </div>
      ),
    },
    {
      path: "/user/login",
      element: (
        <div>
          <Navbar></Navbar>
          <Login></Login>
          <Footer></Footer>
        </div>
      ),
    },
    {
      path: "/user/signup",
      element: (
        <div>
          <Navbar></Navbar>
          <Signup></Signup>
          <Footer></Footer>
        </div>
      ),
    },
    {
      path: "/listings/new",
      element: (
        <div>
          <Navbar></Navbar>
          <AddListing></AddListing>
          <Footer></Footer>
        </div>
      ),
    },
    {
      path: "/listings/edit/:id",
      element: (
        <div>
          <Navbar></Navbar>
          <EditListing></EditListing>
          <Footer></Footer>
        </div>
      ),
    },
    {
      path: "/listings/:id",
      element: (
        <div>
          <Navbar></Navbar>
          <ShowListing></ShowListing>
          <Footer></Footer>
        </div>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
