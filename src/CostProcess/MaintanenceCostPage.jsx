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

const MaintanenceCostList = styled.div`
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

const ComparePrevious = styled(DetailDate)`
  color: var(--Basic-Red, #ff3f3f);
`;

const MaintanenceCost = () => {
  const [isClick, setIsClick] = useState("상세");

  const clickHandler = (buttonType) => {
    setIsClick(buttonType);
  };

  const result01 = [
    { 항목: "일반관리비", 금액: 21070, 변화: "3,520원 증가" },
    { 항목: "소독비", 금액: 1250, 변화: "-" },
    { 항목: "승강기유지비", 금액: 1550, 변화: "-" },
    { 항목: "수선비", 금액: 2260, 변화: "100원 감소" },
    { 항목: "화재보험료", 금액: 21070, 변화: "3,520원 증가" },
    { 항목: "청소비", 금액: 21070, 변화: "3,520원 증가" },
    { 항목: "장기수선충당금", 금액: 21070, 변화: "3,520원 증가" },
    { 항목: "음식물수수료", 금액: 21070, 변화: "3,520원 증가" },
    { 항목: "경비비", 금액: 21070, 변화: "-" },
  ];

  const result02 = [
    { 월: "2024년 10월", 총합계: 130410, 날짜: "2024.10.11" },
    { 월: "2024년 9월", 총합계: 132100, 날짜: "2024.9.11" },
    { 월: "2024년 8월", 총합계: 141020, 날짜: "2024.8.11" },
    { 월: "2024년 7월", 총합계: 140410, 날짜: "2024.7.11" },
    { 월: "2024년 6월", 총합계: 135210, 날짜: "2024.6.11" },
    { 월: "2024년 5월", 총합계: 134230, 날짜: "2024.5.11" },
    { 월: "2024년 4월", 총합계: 138209, 날짜: "2024.4.11" },
    { 월: "2024년 3월", 총합계: 141200, 날짜: "2024.3.11" },
    { 월: "2024년 2월", 총합계: 130230, 날짜: "2024.2.11" },
  ];

  return (
    <div
      style={{ width: "100%", position: "absolute", top: "140px", zIndex: "1" }}
    >
      <RecentYearMonth style={{ margin: "24px 0px 0px 24px" }}>
        2024년 10월분
      </RecentYearMonth>
      <RowWrapper style={{ padding: "0px 24px 20px 24px" }}>
        <RecentMaintanenceCost>130,410원</RecentMaintanenceCost>
        <PaymentStatus>납부완료</PaymentStatus>
      </RowWrapper>
      <div
        style={{ width: "100%", height: "6px", backgroundColor: "#F5F6F6" }}
      />

      <RowWrapper
        style={{
          gap: "7px",
          justifyContent: "flex-start",
          margin: "18px 0px 18px 14px",
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

      {isClick === "상세" && (
        <MaintanenceCostList>
          {result01.map((item, index) => (
            <div key={index} style={{ width: "100%", gap: "2px" }}>
              <RowWrapper>
                <YearMonth>{item.항목}</YearMonth>
                <Cost>{item.금액}원</Cost>
              </RowWrapper>
              <ComparePrevious>{item.변화}</ComparePrevious>
            </div>
          ))}
        </MaintanenceCostList>
      )}

      {isClick === "월별" && (
        <MaintanenceCostList>
          {result02.map((item, index) => (
            <div key={index} style={{ width: "100%", gap: "2px" }}>
              <RowWrapper>
                <YearMonth>{item.월}</YearMonth>
                <Cost>{item.총합계}원</Cost>
              </RowWrapper>
              <DetailDate>{item.날짜}</DetailDate>
            </div>
          ))}
        </MaintanenceCostList>
      )}
    </div>
  );
};

export default MaintanenceCost;
