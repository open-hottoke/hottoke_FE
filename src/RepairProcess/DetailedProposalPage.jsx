import styled from "styled-components";
import { Container } from "../common/CommonComponents";
import Header from "../common/Header";
import PrimaryButton from "../common/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authToken } from "../store/authToken";

const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 26px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Name = styled.span`
  color: #1f1f1f;
  font-size: 18px;
  font-weight: 700;
  line-height: 26px; /* 144.444% */
`;
const Number = styled.span`
  color: #565656;

  /* Body2 */

  font-size: 14px;

  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const Address = styled.span`
  color: #565656;
  font-size: 11px;
  font-weight: 400;
  line-height: 18px; /* 163.636% */
  margin-bottom: 10px;
`;

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 26px;
`;
const Label = styled.span`
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
`;

const PriceText = styled.span`
  color: #01d281;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const Text = styled.span`
  color: #565656;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px; /* 142.857% */
`;

const ColumnWrapper2 = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 24px;
`;

const ColumnWrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const GrayBox = styled.div`
  width: 100%;
  padding: 13px 15px;
  display: flex;
  justify-content: flex-start;
  border-radius: 6px;
  border: 1px solid #efefef;
  background: #fafafb;
  color: #1f1f1f;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

function DetailedProposalPage() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const token = useRecoilValue(authToken);

  const selectedId = location.state.selectedId;
  const name = location.state.vendor_name;
  const phoneNumber = location.state.call_number;
  const address = location.state.vendor_address;
  const price = location.state.estimate_price;
  const time = location.state.estimate_time;
  const comment = location.state.additional_comment;

  const postSelectedEstimate = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/estimate`,
        { estimate_id: selectedId },
        { headers: { Authorization: token } }
      );
      console.log(res);
      navigate("/successMatching")
    } catch (error) {}
  };

  return (
    <Container>
      <Header headerTitle="견적서 상세" />
      <Body>
        <ContentContainer>
          <Name>{name}</Name>
          <Number>{phoneNumber}</Number>
          <Address>{address}</Address>
          <RowWrapper>
            <Label>견적 가격</Label>
            <PriceText>{price}</PriceText>
          </RowWrapper>
          <RowWrapper>
            <Label>예상 방문시간</Label>
            <ColumnWrapper1>
              <Text>{time?.slice(0, 10)}</Text>
              <Text>{time?.slice(11)}</Text>
            </ColumnWrapper1>
          </RowWrapper>
          <ColumnWrapper2>
            <Label>추가 코멘트</Label>
            <GrayBox>{comment}</GrayBox>
          </ColumnWrapper2>
        </ContentContainer>
        <PrimaryButton
          state="active"
          buttonText={`"${name}" 업체 선택하기`}
          onClick={postSelectedEstimate}
        />
      </Body>
    </Container>
  );
}

export default DetailedProposalPage;
