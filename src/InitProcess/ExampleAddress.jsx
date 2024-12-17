import styled, { css } from "styled-components";

const ExampleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 7px;
`;

const ExampleAddress1 = styled.div`
  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const ExampleAddress2 = styled.div`
  color: var(--GrayScale-Gray-500, #9a9a9a);
  text-align: center;

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const ExampleAddress = () => {
  return (
    <div>
      <ExampleWrapper>
        <ExampleAddress1>도로명</ExampleAddress1>
        <ExampleAddress2>예) 판교역로 236, 도산대로 8길 23</ExampleAddress2>
      </ExampleWrapper>
      <ExampleWrapper style={{ marginTop: "8px" }}>
        <ExampleAddress1>동주소</ExampleAddress1>
        <ExampleAddress2>예) 연희동 41-18</ExampleAddress2>
      </ExampleWrapper>
      <ExampleWrapper style={{ marginTop: "8px" }}>
        <ExampleAddress1>건물명</ExampleAddress1>
        <ExampleAddress2>예) 텐즈힐</ExampleAddress2>
      </ExampleWrapper>
    </div>
  );
};

export default ExampleAddress;
