import styled, { css } from "styled-components";
import PrimaryButton from "../../common/PrimaryButton";
import CloseBtn from "../assets/CloseBtn.png";

const OverLay = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 390px;
  margin: 0 auto;
`;

// 실제 모달의 부모 wrapper
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;

  height: 100vh;
  width: 390px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 342px;
  height: auto;

  padding: 25px 18px;
  border-radius: 15px;
  background-color: #fff;

  position: relative;

  color: #1f1f1f;
`;

// 모달에 대해 절대적으로 닫기 버튼 위치
const CloseBtnWrapper = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  padding: 4px;

  width: 20px;
  object-fit: cover;

  cursor: pointer;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const Body = styled.div`
  color: var(--Basic-GrayScale-Gray-600, #565656);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  word-wrap: break-word;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-self: stretch;
`;

const Modal_SendCheck = ({ id, handleSubmit, handleClose }) => {
  const handleClick = () => {
    handleSubmit();
  };

  return (
    <OverLay>
      <ModalWrapper>
        <Modal>
          <CloseBtnWrapper src={CloseBtn} onClick={handleClose} />
          <InfoWrapper>
            <div
              className="body1"
              style={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <span className="h2">{id}호</span>님께 쪽지를 보낼까요?
            </div>
            <Body className="caption1">
              서로를 존중하는 환경을 위해 비방, 욕설, 차별적 발언 등 부적절한
              언어 사용은 자제 부탁드립니다. <br />
              이웃에게 불쾌감을 줄 수 있는 내용은 삼가해 주세요. <br />
              건전하고 즐거운 소통을 함께 만들어가요! 😊
            </Body>
            <ButtonWrapper>
              <PrimaryButton
                state="active"
                buttonText="네, 보낼게요"
                onClick={handleClick}
              />
            </ButtonWrapper>
          </InfoWrapper>
        </Modal>
      </ModalWrapper>
    </OverLay>
  );
};

export default Modal_SendCheck;
