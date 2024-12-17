import styled from "styled-components";
import { Container, SmallFont } from "../common/CommonComponents";
import Header from "../common/Header";
import PrimaryButton from "../common/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAddress } from "../store/userAddress";
import { transformDate } from "../functions/transformDate";
import { authToken } from "../store/authToken";
import axios from "axios";
import { useEffect, useState } from "react";

const Title = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;
  font-size: 16px;
  font-weight: 600;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WhiteBox = styled.div`
  display: flex;
  padding: 30px 24px;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  overflow-y: auto;
  background: var(--Basic-White, #fff);
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #1d1d1d; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const AiBox = styled.div`
  display: flex;
  height: 44px;
  width: 100%;
  padding: 13px 15px;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;
  border: 1px solid var(--Color-Primary, #01d281);
  background: var(--GrayScale-Gray-100, #fafafb);
`;

const LeftFont = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Button2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
`;

const RightFont = styled(LeftFont)`
  color: var(--GrayScale-Gray-600, #565656);
  text-align: right;
  font-weight: 500;
  width: 200px;
  word-break: keep-all;
`;

const BinBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
`;

const TimeBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;

const DescriptionBox = styled.div`
  display: flex;
  padding: 13px 15px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  text-align: left;

  border-radius: 6px;
  border: 1px solid var(--GrayScale-Gray-200, #efefef);
  background: var(--GrayScale-Gray-100, #fafafb);

  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const CircledTimeContainer = styled.div`
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px;
`;

const CircledTime = styled.div`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 30px;
  border: 0.5px solid var(--GrayScale-Gray-300, #dedede);

  color: var(--GrayScale-Gray-600, #565656);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 163.636% */
`;

const TimeOutlineBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
  align-self: stretch;
`;

const BlueTextBtn = styled.span`
  color: #3c66ff;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px; /* 150% */
  cursor: pointer;
`;

// 날짜 포맷 함수
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${year}.${month}.${day} / ${period} ${formattedHours}:${minutes}`;
};

const DetailedRequest = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const address = useRecoilValue(userAddress);
  const token = useRecoilValue(authToken);
  const [data, setData] = useState({
    request_id: 0,
    category: "",
    created_at: "",
    address: "",
    request_image: [],
    request_description: "",
    request_schedule: [],
    status: 0,
  });

  const requestId = location.state.requestId;
  console.log("요청서 상세에서 requestId: ", requestId);
  const now = new Date(); // 현재 날짜와 시간 가져오기
  const formattedDate = formatDate(now);

  const navigate = useNavigate();
  const handlerNextPage = () => {
    navigate("/successRequestPage");
  };

  function sortTimes(times) {
    return times.sort((a, b) => {
      // 시간을 분 단위로 변환
      const [hoursA, minutesA] = a.split(":").map(Number);
      const [hoursB, minutesB] = b.split(":").map(Number);

      // 분 단위 비교
      return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
    });
  }

  const getDetailedRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/service-request`, {
        params: { request_id: requestId },
        headers: { Authorization: token },
      });

      console.log("요청서 상세 데이터:", res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailedRequest();
  }, []);

  return (
    <Container className="MainProcess" style={{ overflow: "auto" }}>
      <div style={{ backgroundColor: "white", width: "100%" }}>
        <Header headerTitle="요청상세" />
      </div>
      <div style={{ width: "100%", height: "6px" }} />
      <WhiteBox>
        <div>
          <Title>{data.category}</Title>
        </div>
        <RowWrapper>
          <LeftFont>요청 날짜</LeftFont>
          <RightFont>{formattedDate}</RightFont>
        </RowWrapper>
        <RowWrapper>
          <LeftFont>주소</LeftFont>
          <RightFont>{address}</RightFont>
        </RowWrapper>
        <BinBox>
          <LeftFont>증상 사진</LeftFont>
          <RowWrapper>
            <div />
            <RightFont>
              {data.request_image.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`증상 사진 ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    marginRight: "6px",
                    borderRadius: "6px",
                  }}
                />
              ))}
            </RightFont>
          </RowWrapper>
        </BinBox>
        <BinBox>
          <LeftFont>증상 설명</LeftFont>
          <DescriptionBox>{data.request_description}</DescriptionBox>
        </BinBox>
        <BinBox>
          <LeftFont>수리 가능 시간</LeftFont>
          <TimeBoxContainer>
            {data.request_schedule.map(({ date, times = [] }) => (
              <TimeOutlineBox key={date}>
                <SmallFont>{transformDate(date)}</SmallFont>
                <CircledTimeContainer>
                  {sortTimes(times).map((time, index) => (
                    <CircledTime key={index}>{time}</CircledTime>
                  ))}
                </CircledTimeContainer>
              </TimeOutlineBox>
            ))}
          </TimeBoxContainer>
        </BinBox>
      </WhiteBox>
    </Container>
  );
};

export default DetailedRequest;
