import styled from "styled-components";
import { Container } from "../common/CommonComponents";
import Header from "../common/Header";
import { css } from "styled-components";
import { useState } from "react";
import MonthlyCostPage from "./MontlyCostPage";
import MaintanenceCostPage from "./MaintanenceCostPage";

const CostCheckButton = styled.div`
  cursor: pointer;
  height: 34px;
  width: 194px;
  display: flex;
  margin-top: 3px;

  color: var(--GrayScale-Gray-800, #1f1f1f);
  justify-content: center;
  align-items: top;
  text-align: center;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;

  ${(props) =>
    props.active
      ? css`
          border-bottom: 1.5px solid #323232;
        `
      : css`
          border-bottom: 1.5px solid #efefef;
        `}
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CostCheckPage = () => {
  const [activeButton, setActiveButton] = useState("월세"); // 초기 상태를 "월세"로 설정

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType); // 클릭된 버튼으로 상태 업데이트
  };

  return (
    <Container className="InitProcess">
      <Header headerTitle="내역 보기" />
      <RowWrapper>
        <CostCheckButton
          active={activeButton === "월세"}
          onClick={() => handleButtonClick("월세")}
        >
          월세
        </CostCheckButton>
        <CostCheckButton
          active={activeButton === "관리비"}
          onClick={() => handleButtonClick("관리비")}
        >
          관리비
        </CostCheckButton>
        {activeButton === "월세" && <MonthlyCostPage />}
        {activeButton === "관리비" && <MaintanenceCostPage />}
      </RowWrapper>
    </Container>
  );
};

export default CostCheckPage;
