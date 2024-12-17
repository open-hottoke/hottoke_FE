import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import closeImg from "../assets/closeImg.png";

function Modal({ children, open, onClose }) {
  const dialog = useRef();

  // 간혹 dialog.current가 클린업 함수와
  // 그 위의 함수 실행 사이에
  // 바뀌는 경우가 발생해서
  // 임시 상수에 값을 할당하는 것이 유용

  // esc로 모달을 닫으면 open값이 바뀌지 않아
  // 다시 cart 버튼을 틀릭해도 모달이 열리지 않음
  // open값의 변화가 없어 밑의 코드 블록이 재실행되지 않기 때문

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      modal.close();
    }
  }, [open, onClose]);

  console.log(open);

  return createPortal(
    <StyledDialog ref={dialog}>
      <ImgWrapper>
        <CloseImg onClick={() => { 
  console.log('Close button clicked');
  onClose();
}} src={closeImg} />
      </ImgWrapper>
      {children}
    </StyledDialog>,
    document.getElementById("modal")
  );
}

export default Modal;

const StyledDialog = styled.dialog`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 306px;
  padding: 23px 14px 14px;
  background: white;
  position: fixed;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* 모달이 다른 요소 위에 표시되도록 */
`;

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CloseImg = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
`;

const Title = styled.p``;
