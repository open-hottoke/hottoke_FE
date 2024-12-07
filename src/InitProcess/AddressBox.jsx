import styled, { css } from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 390px;
  margin-top: 10px;
`;

const Address = styled.div`
  align-self: sefl;
  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Body2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  text-align: left;
  line-height: 20px; /* 142.857% */
`;

const StreetAddressBox = styled.div`
  display: flex;
  width: 38px;
  height: 22px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 4px;
  border: 0.5px solid var(--GrayScale-Gray-400, #a8a8a8);

  color: var(--GrayScale-Gray-500, #9a9a9a);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
`;

const StreetAddress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--GrayScale-Gray-600, #565656);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
`;

const AddressBox = () => {
  return (
    <div>
      <Address>
        서울특별시 강남구 영동대로 112길 46
        <br />
        (엘에이치 삼성 도시형 생활주택)(LH삼성아파트)
      </Address>
      <InputWrapper>
        <StreetAddressBox>지번</StreetAddressBox>
        <StreetAddress>서울특별시 강남구 삼성동 109-21</StreetAddress>
      </InputWrapper>
    </div>
  );
};

export default AddressBox;
