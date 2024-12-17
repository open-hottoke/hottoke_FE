import styled from "styled-components";
import { Container, InnerContainer } from "../common/CommonComponents";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import SuccessMatchingImg from "../assets/SuccessMatchingImg.png";

const Box = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 222px;
`;

const BoldFont = styled.div`
  align-self: stretch;

  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* H2 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 144.444% */
`;

const Font = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const SuccessMatchingPage = () => {
  const navigate = useNavigate();

  const handlerMainPage = () => {
    navigate("/main");
  };
  return (
    <Container
      className="InitProcess"
      style={{ alignItems: "center", padding: "40px 25px" }}
    >
      <InnerContainer>
        <Box>
          <img
            src={SuccessMatchingImg}
            style={{ width: "90px", height: "90px", opacity: "0.8" }}
          />
          <BoldFont>업체와 매칭됐어요!</BoldFont>
          <Font>
            방문 예정 시간에 뵐게요 :)
          </Font>
        </Box>
      </InnerContainer>

      <PrimaryButton
        state="active"
        onClick={handlerMainPage}
        buttonText="홈으로 돌아가기"
      ></PrimaryButton>
    </Container>
  );
};

export default SuccessMatchingPage;
