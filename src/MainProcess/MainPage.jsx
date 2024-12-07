import { Container } from "../common/CommonComponents";
import styled from "styled-components";
import TTookTTakBox from "./TTookTTakBox";
import NoticeBox from "./NoticeBox";
import InformationBox from "./InformationBox";

const GreenBox = styled.div`
  width: 388px;
  height: 210px;

  background: var(--Color-Primary, #01d281);
`;

const MyHouse = styled.div`
  color: var(--Basic-White, #fff);
  text-align: center;

  /* H3 */

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const RowGroupWrapper = styled.div`
  display: flex;
  width: 342px;
  align-items: center;
  margin-left: 20px;
`;

const MainPage = () => {
  return (
    <Container className="MainProcess">
      <GreenBox>
        <div style={{ margin: "62px 20px" }} />
        <RowGroupWrapper style={{ gap: "6px" }}>
          <img src="public/수리아이콘.png" width="35px" height="35px" />
          <MyHouse>우리집</MyHouse>
          <img src="public/리스트버튼.png" width="8px" />
          <img
            src="public/알림아이콘.png"
            width="14px"
            height="18px"
            style={{ marginLeft: "auto" }}
          />
        </RowGroupWrapper>
        <InformationBox />
        <NoticeBox />
        <TTookTTakBox />
      </GreenBox>
    </Container>
  );
};

export default MainPage;
