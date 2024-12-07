import { createBrowserRouter } from "react-router-dom";
import HouseCodePage from "./InitProcess/HouseCodePage";
import SelectModePage from "./InitProcess/SelectModePage";
import RegisterAddressPage from "./InitProcess/RegisterAddressPage";
import RegisterParticularAddressPage from "./InitProcess/RegisterParticularAddressPage";
import ResidentAuthenticationPage from "./InitProcess/ResidentAuthenticationPage";
import MainPage from "./MainProcess/MainPage";
import CostCheckPage from "./CostProcess/CostCheckPage";
import RepairPage from "./RepairProcess/RepairPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectModePage />,
  },
  {
    path: "/houseCode",
    element: <HouseCodePage />,
  },
  {
    path: "/registerAddress",
    element: <RegisterAddressPage />,
  },
  {
    path: "/registerParticularAddress",
    element: <RegisterParticularAddressPage />,
  },
  {
    path: "/residentAuthentication",
    element: <ResidentAuthenticationPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/costChecking",
    element: <CostCheckPage />,
  },
  {
    path: "/RepairPage",
    element: <RepairPage />,
  },
]);

export default router;
