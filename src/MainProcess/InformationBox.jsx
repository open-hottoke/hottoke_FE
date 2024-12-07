import styled from "styled-components";
import { SmallFont } from "../common/CommonComponents";
import { useNavigate } from "react-router-dom";

const BoxDesign = styled.div`
  width: 350px;
  height: 200px;
  flex-shrink: 0;

  margin: 10px 20px 0px 20px;

  padding: 16px 14px 12px 12px;

  border-radius: 10px;
  background: var(--Basic-White, #fff);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  z-index: 1;
`;

const Address = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const FeeInromation = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const RowGroupWrapper = styled.div`
  display: flex;
  width: 110px;

  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const RowGroupWrapper2 = styled.div`
  display: flex;
  align-items: center;
`;

const InformationBox = () => {
  const navigate = useNavigate();

  const handleCostPage = () => {
    navigate("/costChecking");
  };
  return (
    <BoxDesign>
      <Address>서울특별시 강남구 영동대로 112길 46</Address>
      <div style={{ width: "100%", height: "78px" }} />
      <SmallFont style={{ textAlign: "left", color: " #1f1f1f" }}>
        2024년 10월분
      </SmallFont>
      <RowGroupWrapper style={{ marginTop: "10px" }}>
        <FeeInromation>월세</FeeInromation>
        <FeeInromation>500,000원</FeeInromation>
      </RowGroupWrapper>
      <RowGroupWrapper2>
        <RowGroupWrapper>
          <FeeInromation>관리비</FeeInromation>
          <FeeInromation>130,410원</FeeInromation>
        </RowGroupWrapper>
        <RowGroupWrapper2
          onClick={handleCostPage}
          style={{ cursor: "pointer", gap: "6px", marginLeft: "auto" }}
        >
          <SmallFont style={{ color: "#1f1f1f" }}>내역보기</SmallFont>
          <img
            src="public/상세내역버튼.png"
            alt="상세내역버튼"
            width="4px"
            height="7px"
          />
        </RowGroupWrapper2>
      </RowGroupWrapper2>
    </BoxDesign>
  );
};

export default InformationBox;
