import { Container } from "../common/CommonComponents";
import styled from "styled-components";
import TTookTTakBox from "./TTookTTakBox";
import NoticeBox from "./NoticeBox";
import InformationBox from "./InformationBox";
import NavBar from "../common/NavBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authToken } from "../store/authToken";
import axios from "axios";
import { useEffect } from "react";
import { userAddress } from "../store/userAddress";

const ViewContainer = styled(Container)`
  padding-right: 6px;
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
  height: 88%;
  display: flex;
  align-items: flex-start;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #1d1d1d; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background-color: #716e6e;
  }
`;

const GreenBox = styled.div`
  width: 388px;
  height: 210px;
  background: var(--Color-Primary, #01d281);
`;

const MyHouse = styled.div`
  color: var(--Basic-White, #fff);
  text-align: center;

  /* H3 */

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const RowGroupWrapper = styled.div`
  display: flex;
  width: 342px;
  align-items: center;
  margin-left: 20px;
`;

const MainPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);
  const setAddress = useSetRecoilState(userAddress);

  const getAddress = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get-address`, {
        headers: { Authorization: token },
      });
      if (res.data) setAddress(res.data.address + " " + res.data.unitNumber);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  console.log("메인에서 토큰값: ", token);
  return (
    <ViewContainer>
      <ScrollWrapper>
        <GreenBox>
          <div style={{ margin: "62px 20px" }} />
          <RowGroupWrapper style={{ gap: "6px" }}>
            <img src="/RepairIcon.png" width="35px" height="35px" />
            <MyHouse>우리집</MyHouse>
            <img src="/ListButton.png" width="8px" />
            <img
              src="/WhiteNotiButton.png"
              width="14px"
              height="18px"
              style={{ marginLeft: "auto" }}
            />
          </RowGroupWrapper>
          <InformationBox />
          <NoticeBox />
          <TTookTTakBox />
        </GreenBox>
      </ScrollWrapper>
      <NavBar />
    </ViewContainer>
  );
};

export default MainPage;
