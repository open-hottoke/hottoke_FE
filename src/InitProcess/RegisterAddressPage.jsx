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
import ExampleAddress from "./ExampleAddress";
import AddressBox from "./AddressBox";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { signUpData } from "../store/signUpData";
import RegisterParticularAddressPage from "./RegisterParticularAddressPage";

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

const SearchButton = styled.button`
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
  border-radius: 6px;
  border: 1px solid var(--Color-Primary, #01d281);
  color: var(--Color-Primary, #01d281);
  opacity: ${(props) => (props.filled ? 1 : 0.3)};
`;

const AddressList = styled.div`
  display: flex;
  width: 336px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin: 0px 7px;
  max-height: 380px;
  overflow-y: auto;
  background: #ffffff;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const RegisterAddressPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [signUpDataState, setSignUpDataState] = useRecoilState(signUpData);
  const [particular, setParticular] = useState(false);

  const loginId = location.state.loginId;
  const password = location.state.password;
  const username = location.state.username;
  console.log("전페이지:", loginId, password, username);

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력값 업데이트
    console.log("이벤트객체", e.target.value); // 리렌더링 확인 코드 ㅜㅜ
    console.log("인풋벨류", inputValue);
  };

  const handleSearch = async () => {
    setSearch(1); // 검색 누르면 예시 주소 사라짐 용도
    // 예제 검색 결과 (API 호출로 대체)
    try {
      const res = await axios.get(
        `${BASE_URL}/search-address?keyword=${inputValue}`
      );
      console.log("주소 검색 응답: ", res);
      setSearchResults(res.data.results.juso);
    } catch (error) {
      console.log("주소 검색 api", error);
    }
  };

  const handleBackPage = () => {
    console.log("이전 창으로 이동");
    navigate(-1);
  };

  const goToParticular = (item) => {
    console.log("함수 실행");
    setParticular(true);
    setSignUpDataState((prev) => ({
      ...prev,
      loginId: loginId,
      password: password,
      username: username,
      part1: item.roadAddrPart1,
      part2: item.roadAddrPart2,
      jibun: item.jibunAddr,
    }));
    navigate("/registerParticularAddress");
  };

  // console.log(signUpDataState);

  return (
    <>
      (
      <Container
        className="InitProcess"
        style={{ padding: "50px 20px", height: "100vh" }}
      >
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
              filled={inputValue.length > 0}
              onClick={inputValue ? handleSearch : null}
            >
              검색
            </SearchButton>
          </InputWrapper>
          <div style={{ width: "100%", height: "36px" }} />
          {search === "" && <ExampleAddress />}
          {searchResults.length > 0 && (
            <AddressList>
              {searchResults.map((item, index) => (
                <AddressBox
                  key={index}
                  roadAddrPart1={item.roadAddrPart1}
                  roadAddrPart2={item.roadAddrPart2}
                  jibunAddr={item.jibunAddr}
                  onClick={() => {
                    console.log("버튼 클릭 리스너");
                    goToParticular(item);
                  }}
                ></AddressBox>
              ))}
            </AddressList>
          )}
        </InnerContainer>
      </Container>
      )
    </>
  );
};

export default RegisterAddressPage;
