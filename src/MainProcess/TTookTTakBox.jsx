import styled from "styled-components";
import { SmallFont } from "../common/CommonComponents";
import { Navigate, useNavigate } from "react-router-dom";

const TTookTTak = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;

  /* H2 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 144.444% */
`;

const BoxDesign = styled.div`
  width: 350px;

  margin: 33px 20px 0px 20px;
  padding: 16px 14px 12px 12px;

  border-radius: 10px;
  background: var(--Basic-White, #fff);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  z-index: 1;

  position: relative;
`;

const RowGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const RepairField = styled.div`
  display: flex;
  width: 37px;
  height: 22px;
  padding: 0px 5px;
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  border: 0.5px solid var(--GrayScale-Gray-600, #565656);

  color: var(--GrayScale-Gray-700, #323232);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`;

const TTookTTakBox = () => {
  const navigate = useNavigate();

  const handlerNextPage = () => {
    navigate("/repairPage");
  };

  return (
    <BoxDesign>
      <img
        src="/GreenHalfCircle.png"
        width="194.432px"
        height="138.822px"
        style={{ position: "absolute", top: "0px", right: "0px" }}
      />
      <img
        src="/RepairIcon.png"
        width="125px"
        height="102.487px"
        style={{
          position: "absolute",
          top: "27px",
          right: "60px",
        }}
      />
      <RowGroupWrapper>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TTookTTak>뚝딱</TTookTTak>
          <img src="/CheckIcon.png" width="18px" height="18px" />
        </div>
        <SmallFont style={{ color: "#1F1F1F" }}>수리가 필요하신가요?</SmallFont>
      </RowGroupWrapper>
      <div style={{ width: "100%", height: "14px" }} />
      <RowGroupWrapper style={{ gap: "5px" }}>
        <RepairField>가전</RepairField>
        <RepairField style={{ width: "59px" }}>전기/조명</RepairField>
      </RowGroupWrapper>
      <RowGroupWrapper style={{ gap: "5px", marginTop: "5px" }}>
        <RepairField style={{ width: "69px" }}>수도/보일러</RepairField>
        <RepairField style={{ width: "50px" }}>문/창문</RepairField>
      </RowGroupWrapper>
      <div style={{ width: "100%", height: "44px" }} />
      <RowGroupWrapper
        onClick={handlerNextPage}
        style={{ cursor: "pointer", justifyContent: "flex-end" }}
      >
        <SmallFont style={{ color: "#1F1F1F" }}>
          수리요청서 작성하고 견적 받기
        </SmallFont>
        <img src="/DetailButton.png" width="4px" height="7px" />
      </RowGroupWrapper>
    </BoxDesign>
  );
};

export default TTookTTakBox;
