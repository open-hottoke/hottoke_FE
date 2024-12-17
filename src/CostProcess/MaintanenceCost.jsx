import styled from "styled-components";
import { css } from "styled-components";
import { useState } from "react";

const YearMonth = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Body1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
`;

const Cost = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Body1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

const DetailDate = styled.div`
  align-self: stretch;
  color: var(--GrayScale-Gray-400, #a8a8a8);
  text-align: right;

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const RecentYearMonth = styled.div`
  color: var(--GrayScale-Gray-700, #323232);
  text-align: left;

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`;

const RecentMaintanenceCost = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* H1 */
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px; /* 136.364% */
`;

const PaymentStatus = styled.div`
  display: flex;
  height: 24px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 30px;
  border: 1.5px solid rgba(1, 210, 129, 0.3);

  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* button3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;

const DetailHistory = styled(RecentYearMonth)`
  cursor: pointer;
  display: flex;
  height: 28px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  ${(props) =>
    props.active
      ? css`
          border-radius: 30px;
          border: 1.5px solid rgba(1, 210, 129, 0.3);
          background: var(--Color-Primary, #01d281);

          color: var(--Basic-White, #fff);
          text-align: center;
        `
      : css`
          border-radius: 30px;
          border: 1.5px solid rgba(1, 210, 129, 0.3);

          color: var(--GrayScale-Gray-400, #a8a8a8);
          text-align: center;
        `}
`;

const MonthlyHistory = styled(RecentYearMonth)`
  cursor: pointer;
  display: flex;
  height: 28px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: var(--GrayScale-Gray-400, #a8a8a8);
  text-align: center;

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  border-radius: 30px;
  border: 1.5px solid rgba(1, 210, 129, 0.3);

  ${(props) =>
    props.active
      ? css`
          border-radius: 30px;
          border: 1.5px solid rgba(1, 210, 129, 0.3);
          background: var(--Color-Primary, #01d281);

          color: var(--Basic-White, #fff);
          text-align: center;
        `
      : css`
          border-radius: 30px;
          border: 1.5px solid rgba(1, 210, 129, 0.3);

          color: var(--GrayScale-Gray-400, #a8a8a8);
          text-align: center;
        `}
`;

const MaintanenceCostListOutBox = styled.div`
  width: 100%;
  height: 100%;

  padding: 18px 24px;
  background: var(--Basic-White, #fff);
`;

const MaintanenceCostListInBox = styled.div`
  display: flex;
  width: 342px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

const ComparePrevious = styled(DetailDate)`
  color: var(--Basic-Red, #ff3f3f);
`;

const MaintanenceCost = () => {
  const [isClick, setIsClick] = useState("상세");

  const clickHandler = (buttonType) => {
    setIsClick(buttonType);
  };

  return (
    <div
      style={{ width: "100%", position: "absolute", top: "140px", zIndex: "1" }}
    >
      <RecentYearMonth style={{ margin: "24px 0px 0px 24px" }}>
        2024년 11월분
      </RecentYearMonth>
      <RowWrapper style={{ padding: "0px 24px 20px 24px" }}>
        <RecentMaintanenceCost>130,410원</RecentMaintanenceCost>
        <PaymentStatus>납부완료</PaymentStatus>
      </RowWrapper>
      <div
        style={{ width: "100%", height: "6px", backgroundColor: "#F5F6F6" }}
      />
      <MaintanenceCostListOutBox>
        <RowWrapper
          style={{
            gap: "7px",
            justifyContent: "flex-start",
            marginBottom: "18px",
          }}
        >
          <DetailHistory
            active={isClick === "상세"}
            onClick={() => clickHandler("상세")}
          >
            상세 내역
          </DetailHistory>
          <MonthlyHistory
            active={isClick === "월별"}
            onClick={() => clickHandler("월별")}
          >
            월별 내역
          </MonthlyHistory>
        </RowWrapper>
        <MaintanenceCostListInBox>
          {isClick === "상세" && (
            <div style={{ width: "100%", gap: "2px" }}>
              <RowWrapper>
                <YearMonth>일반관리비</YearMonth>
                <Cost>21,070원</Cost>
              </RowWrapper>
              <ComparePrevious>3,520원 증가</ComparePrevious>
            </div>
          )}
          {isClick === "월별" && (
            <div style={{ width: "100%", gap: "2px" }}>
              <RowWrapper>
                <YearMonth>2024년 10월</YearMonth>
                <Cost>130,410원</Cost>
              </RowWrapper>
              <DetailDate>2024.10.11</DetailDate>
            </div>
          )}
        </MaintanenceCostListInBox>
      </MaintanenceCostListOutBox>
    </div>
  );
};

export default MaintanenceCost;
