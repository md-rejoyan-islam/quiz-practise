import { Outlet } from "react-router-dom";
import Footer from "../components/shared/footer";
import Header from "../components/shared/header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
