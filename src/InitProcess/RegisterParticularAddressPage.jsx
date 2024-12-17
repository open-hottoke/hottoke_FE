import {
  Container,
  Inform,
  TinyFont,
  InnerContainer,
  ImageWrapper,
} from "../common/CommonComponents";
import styled, { css } from "styled-components";
import PrimaryButton from "../common/PrimaryButton";
import AddressBox from "./AddressBox";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { signUpData } from "../store/signUpData";

const GreyBox = styled.div`
  display: flex;
  width: 342px;
  padding: 14px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;

  margin: 0px 4px 0px 4px;

  border-radius: 10px;
  border: 1px solid var(--GrayScale-Gray-200, #efefef);
  background: var(--GrayScale-Gray-100, #fafafb);
`;

const AddressInput = styled.input`
  display: flex;
  height: 44px;
  padding: 0px 10px;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  margin-left: 4px;

  border-radius: 6px;
  border: 1px solid #efefef;
  background: #fafafb;

  color: black;

  /* Body2 */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */

  outline: none;

  &::placeholder {
    color: var(--GrayScale-Gray-400, #a8a8a8);

    /* Body2 */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
  }
`;

const BlueInform = styled.div`
  align-self: left;
  margin: 4px 0px 0px 4px;

  color: #3c66ff;

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
`;

const RegisterParticularAddressPage = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const signUp = useRecoilValue(signUpData);
  console.log(signUp);

  const { loginId, password, username, part1, part2, jibun } = signUp;

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력값 업데이트
  };

  const handleNextPage = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/join`, {
        loginId: loginId,
        username: username,
        role: "입주민",
        password: password,
        address: part1 + " " + part2,
        unitNumber: inputValue,
      });
      console.log(res);
      if (res) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackPage = () => {
    console.log("이전 창으로 이동");
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
        <img src="/ThirdStep.png" width="156px" />
      </ImageWrapper>
      <Inform>
        내 거주지의
        <br />
        주소를 등록해주세요
      </Inform>
      <InnerContainer>
        <GreyBox>
          <AddressBox
            roadAddrPart1={part1}
            roadAddrPart2={part2}
            jibunAddr={jibun}
          />
        </GreyBox>
        <div style={{ margin: "10px" }} />
        <TinyFont style={{ margin: "0px 0px 0px 4px", textAlign: "left" }}>
          상세 주소
        </TinyFont>
        <AddressInput
          type={"text"}
          placeholder="예) 101동 101호"
          value={inputValue}
          onChange={handleInputChange} // 입력값 추적
        ></AddressInput>
        <BlueInform style={{ textAlign: "left" }}>
          *상세 주소를 반드시 확인해 주세요.
        </BlueInform>
      </InnerContainer>
      <PrimaryButton
        state={inputValue !== "" ? "active" : "deactive"}
        buttonText="등록 완료하기"
        onClick={inputValue !== "" ? handleNextPage : null}
      />
    </Container>
  );
};

export default RegisterParticularAddressPage;
