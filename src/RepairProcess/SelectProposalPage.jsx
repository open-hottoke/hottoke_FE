import styled from "styled-components";
import { Container } from "../common/CommonComponents";
import Header from "../common/Header";
import ProposalBox from "./ProposalBox";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authToken } from "../store/authToken";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ViewContainer = styled.div`
  padding: 0px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.span`
  color: #323232;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  margin-top: 20px;
`;

const Category = styled.span`
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const SubTitle = styled.span`
  color: #565656;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px; /* 150% */
  margin-bottom: 48px;
`;

const ProposalBoxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 386px;
  overflow-y: auto;
  gap: 10px;
  padding: 4px 0px;
  margin-bottom: 30px;
  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: #01d281; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(43, 50, 41, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

function SelectProposalPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);
  const location = useLocation();
  const requestId = location.state.requestId;
  const [fetchedData, setFetchedData] = useState([]);

  const getEstimates = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/estimate`, {
        params: { request_id: requestId },
        token: { Authorization: token },
      });
      console.log("견적서 선택 페이지에서 가져온 데이터: ", res.data);
      setFetchedData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEstimates();
  }, []);

  const DATA = {
    estimate_id: {
      1: {
        vendor_name: "메종인테리어",
        call_number: "02-0000-0000",
        vendor_address: "서울특별시 동작구 상도동 ooo",
        estimate_price: "230,000",
        estimate_time: "2024.11.19 오후 4시",
        additional_comment: "업계 최고 수준 보장합니다.",
      },
      2: {
        vendor_name: "메종인테리어",
        call_number: "02-0000-0000",
        vendor_address: "서울특별시 동작구 상도동 ooo",
        estimate_price: "230,000",
        estimate_time: "2024.11.19 오후 4시",
        additional_comment: "업계 최고 수준 보장합니다.",
      },
      3: {
        vendor_name: "메종인테리어",
        call_number: "02-0000-0000",
        vendor_address: "서울특별시 동작구 상도동 ooo",
        estimate_price: "230,000",
        estimate_time: "2024.11.19 오후 4시",
        additional_comment: "업계 최고 수준 보장합니다.",
      },
    },
  };

  const transformedData = Object.entries(fetchedData.estimate_id).map(
    ([key, value]) => ({
      key: parseInt(key, 10),
      ...value,
    })
  );

  const handleSelectProposal = () => {
    navigate("/detailedProposal", {
      state: { ...transformedData[selectedId], selectedId: selectedId },
    });
  };
  console.log("견적서 상세 보기에 전달되는 데이터: ", {
    ...transformedData[selectedId],
    selectedId: selectedId,
  });

  return (
    <Container>
      <Header headerTitle="견적서 선택" />
      <ViewContainer>
        <>
          <TextContainer>
            <Title>
              <Category>기타-해충방제</Category> 요청건에 대한 3개의 견적서에요.
            </Title>
            <SubTitle>견적서를 자세히 살펴본 후 응답을 보내주세요.</SubTitle>
          </TextContainer>
          <ProposalBoxContainer>
            {transformedData.map((item, index) => (
              <ProposalBox
                key={index}
                name={item.vendor_name}
                phoneNumber={item.call_number}
                address={item.vendor_address}
                price={item.estimate_price}
                time={item.estimate_time}
                comment={item.additional_comment}
                selectedId={selectedId}
                onSelect={() => setSelectedId(item.key)}
                state={index + 1 === selectedId}
              />
            ))}
          </ProposalBoxContainer>
        </>
        <PrimaryButton
          state="active"
          buttonText="다음"
          onClick={handleSelectProposal}
        />
      </ViewContainer>
    </Container>
  );
}

export default SelectProposalPage;
