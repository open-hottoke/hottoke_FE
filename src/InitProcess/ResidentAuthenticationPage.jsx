import {
  Container,
  Inform,
  InnerContainer,
  ImageWrapper,
} from "../common/CommonComponents";
import styled from "styled-components";
import { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalRequestAuthentication from "./ModalRequestAuthentication";

const GreyBox = styled.div`
  width: 342px;
  height: 170px;
  flex-shrink: 0;

  margin-left: 4px;

  border-radius: 10px;
  border: 1px solid var(--Color-Primary, #01d281);
  background: #fafafb;
`;

const Text1 = styled.div`
  color: #000;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
  text-align: left;
`;

const Text2 = styled.div`
  align-self: stretch;
  color: var(--GrayScale-Gray-600, #565656);

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const Text3 = styled.div`
  color: var(--GrayScale-Gray-500, #9a9a9a);

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  max-width: 390px;
`;

const InputWrapper2 = styled.div`
  display: flex;
  gap: 6px;

  gap: 204px;
  margin: 24px 0px 0px 22px;
  align-items: center;
`;

const SkipButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 108px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  border: 1px solid var(--GrayScale-Gray-300, #dedede);
  background: var(--Basic-White, #fff);

  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* Button1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

// PrimaryButton 스타일속성
const RegisterButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 226px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: var(--Basic-White, #fff);

  /* Button1 */

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */

  ${(props) =>
    props.state === "active"
      ? css`
          border-radius: 10px;
          background: var(--Color-Primary, #01d281);
        `
      : css`
          border-radius: 10px;
          opacity: 0.3;
          background: var(--Color-Primary, #01d281);
        `}
`;

const ResidentAuthenticationPage = () => {
  const navigate = useNavigate();

  const [modalState, setModalState] = useState("");

  const handleAuthentication = () => {
    setModalState(1);
  };

  const handleCancle = () => {
    setModalState("");
  };

  const handleNextPage = () => {
    console.log("버튼 클릭");
    navigate("/main");
  };

  const handleBackPage = () => {
    console.log("다음 창으로 이동");
    navigate(-1);
  };

  return (
    <>
      <Container
        className="InitProcess"
        style={{
          padding: "50px 20px",
          position: "relative",
        }}
      >
        {modalState !== "" && (
          <ModalRequestAuthentication handleCancle={handleCancle} />
        )}
        <ImageWrapper>
          <img
            src="/BackButton.png"
            width="8px"
            height="14px"
            style={{ marginLeft: "4px", cursor: "pointer" }}
            onClick={handleBackPage}
          />
          <img src="/FourthStep.png" width="156px" />
        </ImageWrapper>
        <Inform>입주민 인증을 진행할게요</Inform>
        <InnerContainer>
          <GreyBox>
            <InputWrapper2>
              <Text1>인증 요청하기</Text1>
              <img
                src="/DetailButton.png"
                width="6px"
                height="10.5px"
                onClick={handleAuthentication}
                style={{ cursor: "pointer" }}
              />
            </InputWrapper2>
            <hr
              style={{
                width: "300px",
                height: "1px",
                margin: "16px 22px 22px 22px",
                background: "#DEDEDE",
                opacity: "0.5",
              }}
            />
            <div style={{ textAlign: "left", margin: "22px 0px 0px 22px" }}>
              <Text2>Q. 입주민 인증은 어떻게 진행되나요?</Text2>
              <Text3 style={{ marginTop: "8px" }}>
                입주민 인증을 요청하면 집주인에게 알림이 가요.
              </Text3>
              <Text3>집주인이 승인하면, 입주민 인증 절차가 완료돼요!</Text3>
            </div>
          </GreyBox>
        </InnerContainer>
        <InputWrapper>
          <SkipButton onClick={handleNextPage}>건너뛰기</SkipButton>
          <RegisterButton>등록 완료하기</RegisterButton>
        </InputWrapper>
      </Container>
    </>
  );
};

export default ResidentAuthenticationPage;
