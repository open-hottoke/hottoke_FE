import {
  Container,
  Inform,
  InnerContainer,
  ImageWrapper,
} from "../common/CommonComponents";
import styled from "styled-components";
import ModeItem from "./ModeItem";
import { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";

// ModeItem 3개 묶어줌 : ItemContainer
const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const SelectModePage = () => {
  const [modeIndex, setModeIndex] = useState("");
  const navigate = useNavigate();

  // 라디오 버튼들 관리
  const handleIndexChange = (index) => {
    setModeIndex(index);
  };

  // 하우스코드 입력 페이지로 이동
  const handleNextPage = () => {
    console.log("버튼 클릭");
    navigate("/houseCode");
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
        />
        <img src="public/1단계.png" alt="1단계" width="156px" />
      </ImageWrapper>
      <Inform>
        핫케톡 이용모드를 <br />
        선택해 주세요
      </Inform>
      <InnerContainer>
        <ItemContainer>
          <ModeItem
            index={0}
            middleText={"입주민"}
            smallText={"임차인/세입자"}
            isClicked={modeIndex === 0} // boolean 값
            handleIndexChange={handleIndexChange}
          />
          <ModeItem
            index={1}
            middleText={"호스트"}
            smallText={"임대인 / 집주인 / 관리인(주인)"}
            isClicked={modeIndex === 1}
            handleIndexChange={handleIndexChange}
          />
          <ModeItem
            index={2}
            middleText={"시공사"}
            smallText={"수리 / 공사 업체"}
            isClicked={modeIndex === 2}
            handleIndexChange={handleIndexChange}
          />
        </ItemContainer>
      </InnerContainer>
      <PrimaryButton
        state={modeIndex !== "" ? "active" : "deactive"}
        buttonText="이용 모드 선택하기"
        onClick={modeIndex !== "" ? handleNextPage : null}
      />
    </Container>
  );
};

export default SelectModePage;
