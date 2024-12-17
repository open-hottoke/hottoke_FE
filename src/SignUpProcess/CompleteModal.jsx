import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OverLay = styled.div`
  display: flex; // Flex 선언하고
  justify-content: center;
  align-items: center;
  // 위에 두 개 center로 해두면 자식 컴포넌트 자동 중앙 정렬됨

  background-color: rgba(0, 0, 0, 0.1);
  height: 100%; // 내용에 따라 늘어남

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 390px;
  margin: 0 auto;
`;

const Modal = styled.div`
  width: 306px;
  height: auto;

  padding: 14px;
  border-radius: 15px;
  background: var(--Basic-White, #fff);
`;

const MainFont = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* Body1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
`;

const SubFont = styled.div`
  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const CancleButton = styled.div`
  display: flex;
  width: 278px;
  height: 42px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  background: var(--Color-Primary, #01d281);

  color: var(--Basic-White, #fff);
  text-align: center;

  /* Button2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */

  cursor: pointer;
`;

const CompleteModal = ({ mainFont }) => {
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/");
  };

  return (
    <OverLay>
      <Modal>
        <div style={{ height: "16px" }}></div>
        <MainFont>
          환영합니다 {mainFont}님!
          <br />
          회원가입이 완료되었어요
        </MainFont>
        <div style={{ height: "12px" }}></div>
        <SubFont>회원가입 정보로 바로 로그인 하시겠어요?</SubFont>
        <div style={{ height: "30px" }}></div>
        <CancleButton onClick={handleLoginPage}>로그인하기</CancleButton>
      </Modal>
    </OverLay>
  );
};
export default CompleteModal;
