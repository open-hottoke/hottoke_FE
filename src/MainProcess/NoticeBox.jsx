import styled from "styled-components";
import { SmallFont } from "../common/CommonComponents";

const NoticeTitle = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const BoxDesign = styled.div`
  width: 350px;
  height: 136px;

  margin: 10px 20px 0px 20px;
  padding: 16px 14px 12px 14px;

  border-radius: 10px;
  background: var(--Basic-White, #fff);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  z-index: 1;
`;

const Date = styled.div`
  color: var(--GrayScale-Gray-400, #a8a8a8);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 163.636% */
`;

const RowGroupWrapper = styled.div`
  display: flex;
  align-self: stretch;
  align-items: end;
  gap: 262px;
`;

const RowGroupWrapper2 = styled.div`
  display: flex;
  align-self: stretch;
  align-items: end;
  justify-content: space-between;
`;

const NoticeBox = () => {
  return (
    <BoxDesign>
      <RowGroupWrapper>
        <NoticeTitle>공지사항</NoticeTitle>
        <img
          src="public/상세내역버튼.png"
          alt="상세내역버튼"
          width="4px"
          height="7px"
          style={{ marginBottom: "7.5px" }}
        />
      </RowGroupWrapper>
      <div style={{ width: "100%", height: "12px" }} />
      <RowGroupWrapper2>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <SmallFont style={{ textAlign: "left" }}>분리수거 안내</SmallFont>
          <img
            src="public/고정핀.png"
            alt="고정핀"
            width="8px"
            height="11.385px"
          />
        </div>
        <Date>2024.11.04</Date>
      </RowGroupWrapper2>
      <hr style={{ background: "#EFEFEF", opacity: "0.5" }} />
      <RowGroupWrapper2>
        <SmallFont style={{ textAlign: "left" }}>
          한양빌라 관리비 인하 고지
        </SmallFont>
        <Date>2024.12.01</Date>
      </RowGroupWrapper2>
      <RowGroupWrapper2>
        <SmallFont style={{ textAlign: "left" }}>층간소음 관련 고지</SmallFont>
        <Date>2024.12.12</Date>
      </RowGroupWrapper2>
    </BoxDesign>
  );
};

export default NoticeBox;
