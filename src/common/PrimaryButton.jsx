import styled, { css } from "styled-components";

// PrimaryButton 스타일속성
const Container = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: var(--Basic-White, #fff);

  /* Button1 */

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */

  ${(props) =>
    props.state === "active"
      ? css`
          border-radius: 10px;
          background: var(--Color-Primary, #01d281);
        `
      : css`
          border-radius: 10px;
          opacity: 0.3;
          background: var(--Color-Primary, #01d281);
        `}
`;

const PrimaryButton = ({ state, buttonText, onClick }) => {
  return (
    <Container state={state} onClick={onClick}>
      {buttonText}
    </Container>
  );
};

export default PrimaryButton;
