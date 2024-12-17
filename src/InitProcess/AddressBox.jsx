import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const StreetAddress = styled.p`
  color: var(--GrayScale-Gray-600, #565656);
  padding-right: 10px;
  text-align: left;
  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
`;

const AddressBox = ({ roadAddrPart1, roadAddrPart2, jibunAddr, onClick }) => {
  const handleParticularAddressPage = () => {
    onClick();
  };

  return (
    <div onClick={handleParticularAddressPage}>
      <Address>
        {roadAddrPart1}
        <br />
        {roadAddrPart2}
      </Address>
      <InputWrapper>
        <StreetAddressBox>지번</StreetAddressBox>
        <StreetAddress>{jibunAddr}</StreetAddress>
      </InputWrapper>
    </div>
  );
};

export default AddressBox;
