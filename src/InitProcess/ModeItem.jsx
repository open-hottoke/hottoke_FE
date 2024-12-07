import { MiddleFont, SmallFont } from "../common/CommonComponents";
import styled, { css } from "styled-components";

// ModeItem같은 경우, 기능 있는 버튼이니까 컴포넌트 jsx 파일 따로 작성해줌

const ModeItemStyle = styled.div`
  cursor: pointer; // 올렸을때 손가락 모양으로 바꿔줌

  background-color: #ffffff;
  width: 100%;
  display: flex; // div를 flexbox 컨테이너로 설정
  padding: 22px 25px;
  flex-direction: column; // flexbox니까 컨테이너 속성 사용 가능
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  border-radius: 15px;

  ${(props) =>
    props.isClicked
      ? css`
          // isClicked 가 true일 때
          border: 1.5px solid #01d281;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); // 왜 UI보다 진함? 오륜가
        `
      : css`
          border: 1.5px solid #dedede;
        `}
`;

const ModeItem = ({
  index,
  middleText,
  smallText,
  handleIndexChange,
  isClicked,
}) => {
  console.log("클릭상태", isClicked); // boolean 값

  return (
    <ModeItemStyle
      onClick={() => handleIndexChange(index)}
      isClicked={isClicked}
    >
      <MiddleFont>{middleText}</MiddleFont>
      <SmallFont>{smallText}</SmallFont>
    </ModeItemStyle>
  );
};

export default ModeItem;
