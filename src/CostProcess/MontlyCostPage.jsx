import styled from "styled-components";
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

const RecentMonthlyCost = styled.div`
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

const MonthlyHistory = styled(RecentYearMonth)`
  color: #a8a8a8;
  margin: 18px 0px 14px 24px;
`;

const MonthlyCostList = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  overflow-y: auto;

  padding: 0px 24px;
  background: var(--Basic-White, #fff);
`;

const MonthlyCostPage = () => {
  const results = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div
      style={{ width: "100%", position: "absolute", top: "140px", zIndex: "1" }}
    >
      <RecentYearMonth style={{ margin: "24px 0px 0px 24px" }}>
        2024년 10월분
      </RecentYearMonth>
      <RowWrapper style={{ padding: "0px 24px 20px 24px" }}>
        <RecentMonthlyCost>500,000원</RecentMonthlyCost>
        <PaymentStatus>납부완료</PaymentStatus>
      </RowWrapper>
      <div
        style={{ width: "100%", height: "6px", backgroundColor: "#F5F6F6" }}
      />
      <MonthlyHistory>월별 내역</MonthlyHistory>
      <MonthlyCostList>
        {results.map((index) => (
          <div key={index} style={{ width: "100%", gap: "2px" }}>
            <RowWrapper>
              <YearMonth>2024년 {index}월</YearMonth>
              <Cost>500,000원</Cost>
            </RowWrapper>
            <DetailDate style={{ alignItems: "right" }}>
              2024.{index}.1
            </DetailDate>
          </div>
        ))}
      </MonthlyCostList>
    </div>
  );
};

export default MonthlyCostPage;
