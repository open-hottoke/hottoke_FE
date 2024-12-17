import styled from "styled-components";
import AlarmIcn from "../assets/alarmIcn.png";
import BackBtn from "../assets/backBtn.png";
import writeIcn from "../assets/image.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 5px 25px; // 임의로 함

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const HeaderTitle = styled.div`
  flex: 1;
  color: #1f1f1f;
  text-align: center;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */

  /* 최대 아이콘 높이와 동일하도록 일정하게 관리 */
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IcnContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const BackIcnContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: left;
  align-items: center;

  cursor: pointer;
`;

const Icn = styled.img`
  width: 15px;
  object-fit: cover;
`;

const BackIcn = styled.img`
  width: 12px;
  height: 18px;
  object-fit: cover;

  cursor: pointer;
`;

const WriteIcn = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;

  cursor: pointer;
`;

// 똑똑을 헤더를 따로 관리
// {header_title, backBtn , alarm, write}
// backBtn이 true인 경우 백버튼 존재, 그렇지 않은 경우 타이틀이 가장 왼쪽으로
// alarm과 write이 true인 경우 알맞게 오른쪽 버튼을 렌더링
const Ttokttok_Header = ({ header_title, backBtn, alarm, write }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BackIcnContainer onClick={() => navigate(-1)}>
        {backBtn && <BackIcn src={BackBtn} />}
      </BackIcnContainer>
      <HeaderTitle>{header_title}</HeaderTitle>
      {/* 둘 중 하나만 렌더링 */}
      <IcnContainer>
        {alarm && <Icn src={AlarmIcn} />}
        {write && (
          <WriteIcn
            onClick={() => navigate("/ttokttok/write")}
            src={writeIcn}
          />
        )}
      </IcnContainer>
    </Container>
  );
};

export default Ttokttok_Header;
