import { createBrowserRouter } from "react-router-dom";
import HouseCodePage from "./InitProcess/HouseCodePage";
import SelectModePage from "./InitProcess/SelectModePage";
import RegisterAddressPage from "./InitProcess/RegisterAddressPage";
import ResidentAuthenticationPage from "./InitProcess/ResidentAuthenticationPage";
import MainPage from "./MainProcess/MainPage";
import CostCheckPage from "./CostProcess/CostCheckPage";
import RepairPage from "./RepairProcess/RepairPage";
import RequestRepairPage from "./RepairProcess/RequestRepairPage";
import SuccessRequestPage from "./RepairProcess/SuccessRequestPage";
import IngRepairPage from "./RepairProcess/IngRepairPage";
import Ttokttok_MainPage from "./ttokttok/page/ttokttok_MainPage";
import Ttokttok_BoxPage from "./ttokttok/page/ttokttok_BoxPage";
import Ttokttok_ProfilePage from "./ttokttok/page/ttokttok_ProfilePage";
import Ttokttok_WritePage from "./ttokttok/page/Tttokttok_WritePage";
import My_Page from "./MyPage/page/My_Page";
import SignInPage from "./InitProcess/SignInPage";
import Tttokttok_BoxDetailPage from "./Ttokttok/page/Tttokttok_BoxDetailPage";
import SignUpPage from "./SignUpProcess/SIgnUpPage";
import SelectProposalPage from "./RepairProcess/SelectProposalPage";
import DetailedProposalPage from "./RepairProcess/DetailedProposalPage";
import DetailedRequestPage from "./RepairProcess/DetailedRequestPage";
import SuccessMatchingPage from "./RepairProcess/SuccessMatchingPage";
import DetailedProposalPage2 from "./RepairProcess/DetailedProposalPage2";
import RegisterParticularAddressPage from "./InitProcess/RegisterParticularAddressPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/signupPage",
    element: <SignUpPage />,
  },
  {
    path: "/selectMode",
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
  // 1. 홈
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/costChecking",
    element: <CostCheckPage />,
  },
  // 3. 뚝딱
  {
    path: "/repairPage",
    element: <RepairPage />,
  },
  {
    path: "/requestRepairPage",
    element: <RequestRepairPage />,
  },
  {
    path: "/successRequestPage",
    element: <SuccessRequestPage />,
  },
  {
    path: "/ingRepairPage",
    element: <IngRepairPage />,
  },
  { path: "/detailedRequest", element: <DetailedRequestPage /> },
  {
    path: "/selectProposal",
    element: <SelectProposalPage />,
  },
  { path: "/detailedProposal", element: <DetailedProposalPage /> },
  { path: "/detailedProposal2", element: <DetailedProposalPage2 /> },
  { path: "/successMatching", element: <SuccessMatchingPage /> },
  // 2. 똑똑
  {
    path: "/ttokttok",
    element: <Ttokttok_MainPage />,
  },
  {
    path: "/ttokttok/box",
    element: <Ttokttok_BoxPage />,
  },
  {
    path: "/ttokttok/box/detail/:id",
    element: <Tttokttok_BoxDetailPage />,
  },
  {
    path: "/ttokttok/write",
    element: <Ttokttok_WritePage />,
  },
  {
    path: "/ttokttok/profile",
    element: <Ttokttok_ProfilePage />,
  },
  // 4. 마이 (임시)
  {
    path: "/myPage",
    element: <My_Page />,
  },
]);

export default router;
