import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProposalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 24px;
  border-radius: 15px;
  border: ${(props) =>
    props.state ? "1.5px solid #01d281" : "1px solid #DEDEDE"};
  box-shadow: ${(props) =>
    props.state && "0px 0px 4px 0px rgba(0, 0, 0, 0.3)"};
  width: 100%;
`;

const BusinessInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.span`
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const PhoneNumber = styled.span`
  color: #565656;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const Address = styled.span`
  color: #565656;
  font-size: 11px;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const HowToPay = styled.p`
  color: #565656;
  font-size: 11px;
  font-weight: 400;
  line-height: 18px;
`;

const DetailArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

const Price = styled.span`
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

const DetailImg = styled.img`
  width: 4px;
  height: 7px;
`;

function ProposalBox({
  name,
  phoneNumber,
  address,
  price,
  time,
  comment,
  onSelect,
  state,
  selectedId
}) {
  const navigate = useNavigate();
  return (
    <ProposalContainer state={state}>
      <BusinessInfoContainer onClick={onSelect}>
        <ColumnWrapper>
          <Name>{name}</Name>
          <PhoneNumber>{phoneNumber}</PhoneNumber>
          <Address>{address}</Address>
        </ColumnWrapper>
        <HowToPay>본인부담</HowToPay>
      </BusinessInfoContainer>
      <DetailArea onClick={() => navigate("/detailedProposal", {state: {
        vendor_name: name,
        call_number: phoneNumber,
        vendor_address: address,
        estimate_price: price,
        estimate_time: time,
        additional_comment: comment,
        selectedId: selectedId
      }})}>
        <Price>{price}</Price>
        <DetailImg src="/DetailButton.png" alt="디테일" />
      </DetailArea>
    </ProposalContainer>
  );
}

export default ProposalBox;
