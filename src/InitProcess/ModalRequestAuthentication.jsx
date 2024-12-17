import styled from "styled-components";
import { SmallFont } from "../common/CommonComponents";
import AddressBox from "./AddressBox";

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
  width: 342px;
  height: auto;

  padding: 26px 14px;
  border-radius: 15px;
  background: var(--Basic-White, #fff);
`;

const AddressCheckMent = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* H2 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 144.444% */
`;

const InformWraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;

const CancleButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 154px;
  height: 42px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  border: 1px solid var(--GrayScale-Gray-300, #dedede);
  background: var(--Basic-White, #fff);

  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* Button2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
`;

const RequestAuthenticationButton = styled.div`
  cursor: pointer;
  display: flex;
  width: 154px;
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
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: stretch;
`;

const ModalRequestAuthentication = ({ handleCancle }) => {
  return (
    <OverLay>
      <Modal>
        <div style={{ padding: "6px" }}>
          <InformWraper>
            <AddressCheckMent>정확한 주소가 맞나요?</AddressCheckMent>
            <SmallFont style={{ textAlign: "left" }}>
              집주인이 이름 / 휴대폰 번호 / 주소 정보를 바탕으로 확인해요.
              <br />
              인증요청후 집주인 확인 후 인증 완료 됩니다.
              <br />
              인증이 완료되면 알림을 보내드릴게요!
            </SmallFont>
          </InformWraper>
          <hr style={{ margin: "20px 0px" }} />
          <AddressBox />
        </div>
        <ButtonWrapper style={{ marginTop: "46px" }}>
          <CancleButton onClick={handleCancle}>뒤로가기</CancleButton>
          <RequestAuthenticationButton>인증요청</RequestAuthenticationButton>
        </ButtonWrapper>
      </Modal>
    </OverLay>
  );
};
export default ModalRequestAuthentication;
