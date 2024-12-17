import styled from "styled-components";
import { Container, InnerContainer } from "../common/CommonComponents";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";

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

const SuccessRequestPage = () => {
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
            src="/SuccessRequestIcon.png"
            style={{ width: "90px", height: "90px", opacity: "0.8" }}
          />
          <BoldFont>수리 요청서를 제출했어요!</BoldFont>
          <Font>
            작성한 요청서를 바탕으로
            <br />
            견적서를 받으면 알림을 보내드릴게요.
          </Font>
        </Box>
      </InnerContainer>

      <PrimaryButton
        state="active"
        onClick={handlerMainPage}
        buttonText="완료하기"
      ></PrimaryButton>
    </Container>
  );
};

export default SuccessRequestPage;
