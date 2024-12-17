import {
  Container,
  Inform,
  TinyFont,
  InnerContainer,
  ImageWrapper,
} from "../common/CommonComponents";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import VerificationCodeInput from "./VerificationCodeInput";
import PrimaryButton from "../common/PrimaryButton";
import { useState } from "react";

const RegisterAddress = styled.div`
  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;
  width: 116px;
  cursor: pointer;

  /* button3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 150% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;

  margin-left: 117px;
`;

const HouseCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const isCodeComplete = code.every((char) => char !== ""); // 6자리 인증코드가 모두 입력되었는지 확인

  const handleCodeChange = (newCode) => {
    setCode(newCode); // VerificationInput에서 변경된 상태를 업데이트
  };

  const handleNextPage1 = () => {
    console.log("주소 입력으로 창으로 이동");
    navigate("/registerAddress");
  };

  const handleNextPage2 = () => {
    console.log("다음 창으로 이동");
    navigate("/main");
  };

  const handleBackPage = () => {
    console.log("다음 창으로 이동");
    navigate(-1);
  };

  return (
    <Container className="InitProcess" style={{ padding: "50px 20px" }}>
      <ImageWrapper>
        <img
          src="/BackButton.png"
          width="8px"
          height="14px"
          style={{ marginLeft: "4px", cursor: "pointer" }}
          onClick={handleBackPage}
        />
        <img src="/SecondStep.png" width="156px" />
      </ImageWrapper>
      <Inform>
        초대받은 하우스코드를
        <br />
        입력해 주세요
      </Inform>

      <TinyFont style={{ marginLeft: "9px" }}>6자리 숫자 코드</TinyFont>
      <InnerContainer>
        <VerificationCodeInput onCodeChange={handleCodeChange} />

        <TinyFont style={{ margin: "55px 0px 0px 117px", width: "116px" }}>
          초대받은 코드가 없다면?
        </TinyFont>
        <RegisterAddress onClick={handleNextPage1}>
          거주지 등록하기
        </RegisterAddress>
      </InnerContainer>
      <PrimaryButton
        state={isCodeComplete ? "active" : "deactive"}
        buttonText="입력 완료하기"
        onClick={isCodeComplete ? handleNextPage2 : null}
      />
    </Container>
  );
};

export default HouseCodePage;
