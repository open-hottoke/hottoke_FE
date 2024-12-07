import {
  Container,
  Inform,
  TinyFont,
  InnerContainer,
  ImageWrapper,
} from "../common/CommonComponents";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import ExampleAddress from "./ExampleAddress";

const InputWrapper = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  max-width: 390px;
`;

const AddressInput = styled.input`
  display: flex;
  width: 250px;
  height: 44px;
  padding: 0px 10px;
  align-items: center;
  gap: 10px;

  margin-left: 7px;

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

const SearchButton = styled.div`
  display: flex;
  width: 80px;
  height: 44px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  text-align: center;

  /* Button2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */

  ${(props) =>
    props.active
      ? css`
          border-radius: 6px;
          border: 1px solid var(--Color-Primary, #01d281);
          color: var(--Color-Primary, #01d281);
        `
      : css`
          border-radius: 6px;
          border: 1px solid var(--Color-Primary, #01d281);
          color: var(--Color-Primary, #01d281);
          opacity: 0.3;
        `}
`;

const RegisterAddressPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력값 업데이트
    console.log("이벤트객체", e.target.value); // 리렌더링 확인 코드 ㅜㅜ
    console.log("인풋벨류", inputValue);
  };

  const handleSearch = () => {
    setSearch(1);
  };

  // sarch 상태 console 출력
  useEffect(() => {
    console.log(search);
  }, [search]);

  const handleNextPage = () => {
    console.log("버튼 클릭");
    navigate("/registerParticularAddress");
  };

  const handleBackPage = () => {
    console.log("이전 창으로 이동");
    navigate(-1);
  };

  return (
    <Container className="InitProcess" style={{ padding: "50px 20px" }}>
      <ImageWrapper>
        <img
          src="public/뒤로가기버튼.png"
          alt="뒤로가기버튼"
          width="8px"
          height="14px"
          style={{ marginLeft: "4px", cursor: "pointer" }}
          onClick={handleBackPage}
        />
        <img src="public/3단계.png" alt="3단계" width="156px" />
      </ImageWrapper>
      <Inform>
        내 거주지의
        <br />
        주소를 등록해주세요
      </Inform>
      <TinyFont style={{ marginLeft: "7px" }}>주소검색</TinyFont>
      <InnerContainer>
        <InputWrapper>
          <AddressInput
            type={"text"}
            placeholder="예) 판교역로 235, 도산대로 33"
            value={inputValue}
            onChange={handleInputChange} // 입력값 추적
          ></AddressInput>
          <SearchButton
            active={inputValue !== ""}
            onClick={inputValue ? handleSearch : handleNextPage}
          >
            검색
          </SearchButton>
        </InputWrapper>
        {inputValue === "" && <ExampleAddress />}
      </InnerContainer>
      <PrimaryButton
        state={"deactive"}
        buttonText="등록 완료하기"
        onClick={null}
      />
    </Container>
  );
};

export default RegisterAddressPage;
