import styled from "styled-components";
import { Container } from "../common/CommonComponents";
import { SmallFont, TinyFont } from "../common/CommonComponents";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import { useState, useEffect } from "react";
import { authToken } from "../store/authToken";
import { useRecoilValue } from "recoil";
import axios from "axios";
import WhiteArrow from "../assets/WhiteArrow.png";

const Title = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const Highlight = styled.span`
  color: #01d281; /* 원하는 색상으로 변경 */
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

const RoundBox = styled.div`
  width: 100%;
  padding-bottom: 16px;
  flex-shrink: 0;

  border-radius: 0px 0px 20px 20px;
  background: var(--Basic-White, #fff);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
`;

const GradientBox = styled.div`
  display: flex;
  width: 100%;
  height: 52px;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    92deg,
    #15c581 4.98%,
    #1ec987 40.42%,
    #2fa477 96.23%
  );
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-top: 16px;
`;

const RequestRepairBox = styled.div`
  width: 342px;
  height: 162px;
  flex-shrink: 0;

  border-radius: 10px;
  border: 1px solid var(--Color-Primary, #01d281);
  background: var(--Basic-White, #fff);
  box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.12);
`;

const RecommandBox = styled.div`
  width: 226px;
  height: 210px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--Basic-White, #fff);
`;

const WhiteArrowImg = styled.img`
  width: 6px;
  height: 10.5px;
  cursor: pointer;
`

const RepairPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);

  const navigate = useNavigate();
  const [requestInProgressId, setRequestInProgressId] = useState([]);
  const handlerRequestRepairPage = () => {
    navigate("/requestRepairPage");
  };

  const getRequestInProgress = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/service/progressing`, {
        headers: { Authorization: token },
      });
      setRequestInProgressId(res.data);
      console.log("진행중인 요청 api:", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequestInProgress();
  }, []);

  return (
    <Container className="MainProcess">
      <RoundBox style={{ padding: "64px 24px 28px 24px" }}>
        <RowWrapper style={{ margin: "0px 4px" }}>
          <Title>수리/공사</Title>
          <img src="/BlackNotiButton.png" width="14px" height="17.818px" />
        </RowWrapper>
        <RequestRepairBox
          style={{ marginTop: "34px", padding: "24px 20px 18px 20px" }}
        >
          <RowWrapper>
            <Title>
              1분만에 <Highlight>&quot;뚝딱&quot;</Highlight> 수리 요청서
              작성하기
            </Title>
            <img
              src="/DetailButton.png"
              onClick={handlerRequestRepairPage}
              style={{
                width: "6px",
                height: "10.5px",
                cursor: "pointer",
              }}
            />
          </RowWrapper>
          <hr style={{ opacity: "0.3", margin: "20px 0px" }} />
          <SmallFont style={{ color: "#323232", textAlign: "left" }}>
            입주 주택에 수리가 필요한 부분이 있다면 간편하게 <br />
            수리를 맡길 수 있어요!
          </SmallFont>
          <TinyFont style={{ textAlign: "left" }}>
            수리 요청서를 작성하면 근처 업체로부터 견적을 받아볼 수 있어요.
          </TinyFont>
          
        </RequestRepairBox>
        {
            <GradientBox onClick={() => navigate("/ingRepairPage", {state: { idList : requestInProgressId}})}>
              현재 진행 중인 수리 {requestInProgressId.length}건{" "}
              <WhiteArrowImg src={WhiteArrow} />
            </GradientBox>
          }
        {/* 현재 진행중인 수리  */}
      </RoundBox>
      <Title style={{ margin: "50px 0px 0px 28px" }}>
        수도 분야에 대한 수리가 필요하신가요?
      </Title>
      <SmallFont style={{ margin: "3px 0px 0px 28px" }}>
        이런 업체는 어떠세요?
      </SmallFont>
      <RecommandBox style={{ margin: "14px 0px 0px 15px" }} />
      <NavBar />
    </Container>
  );
};

export default RepairPage;
