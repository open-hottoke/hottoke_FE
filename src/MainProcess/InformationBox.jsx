import styled from "styled-components";
import { SmallFont } from "../common/CommonComponents";
import { useNavigate } from "react-router-dom";
import { userAddress } from "../store/userAddress";
import { useRecoilValue } from "recoil";

const BoxDesign = styled.div`
  width: 350px;
  flex-shrink: 0;
  margin: 10px 20px 0px 20px;

  padding: 16px 14px 12px 12px;

  border-radius: 10px;
  background: #f0fdf8;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  z-index: 1;
`;

const Address = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;
  word-break: keep-all;
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

  const address = useRecoilValue(userAddress);

  return (
    <BoxDesign>
      <Address>{address}</Address>
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
          <img src="/DetailButton.png" width="4px" height="7px" />
        </RowGroupWrapper2>
      </RowGroupWrapper2>
    </BoxDesign>
  );
};

export default InformationBox;
