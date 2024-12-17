import styled from "styled-components";
import { Container, SmallFont } from "../common/CommonComponents";
import Header from "../common/Header";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAddress } from "../store/userAddress";
import { transformDate } from "../functions/transformDate";
import { authToken } from "../store/authToken";
import axios from "axios";
const UpperTextWrapper = styled.div`
  width: 100%;
`

const UpperTextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.span`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const ImageContainer = styled.div`
  display: flex;
  width: 200px;

`

const WhiteBox = styled.div`
  display: flex;
  padding: 30px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  background: var(--Basic-White, #fff);
`;

const SmallTitle = styled.span``;

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

const SummaryRequest = ({ formData, onCorrect, previewPhotos }) => {
  const { category, request_image, request_description, construction_date } =
    formData;
    console.log(request_image);

  const address = useRecoilValue(userAddress);

  const now = new Date(); // 현재 날짜와 시간 가져오기
  const formattedDate = formatDate(now);
  const token = useRecoilValue(authToken);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  function sortTimes(times) {
    return times.sort((a, b) => {
      // 시간을 분 단위로 변환
      const [hoursA, minutesA] = a.split(":").map(Number);
      const [hoursB, minutesB] = b.split(":").map(Number);

      // 분 단위 비교
      return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
    });
  }

  const postRequestData = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/service`, formData, {
        headers: { Authorization: token },
      });
      console.log(res.status);
      if (res.status == 200) navigate("/successRequestPage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="MainProcess" style={{ overflow: "auto" }}>
      <div style={{ backgroundColor: "white", width: "100%" }}>
        <Header headerTitle="수리요청서 작성" />
      </div>
      <div style={{ width: "100%", height: "6px" }} />
      <WhiteBox>
        <UpperTextWrapper>
          <UpperTextContainer>
            <Title>수리요청서 작성을 완료했어요!</Title>
            <BlueTextBtn onClick={onCorrect}>수정하기</BlueTextBtn>
          </UpperTextContainer>
          <SmallFont style={{ textAlign: "left" }}>
            작성한 요청서를 바탕으로 견적서를 받아볼 수 있어요.
          </SmallFont>
        </UpperTextWrapper>
        <AiBox>
          <SmallFont>AI가 산정한 예상 견적은?</SmallFont>
          <SmallFont style={{ color: "#01D281" }}>150,00원</SmallFont>
        </AiBox>
        <RowWrapper>
          <LeftFont>수리 분야</LeftFont>
          <RightFont>{category}</RightFont>
        </RowWrapper>
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
              {previewPhotos.map((photo, index) => (
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
          <DescriptionBox>{request_description}</DescriptionBox>
        </BinBox>
        <BinBox>
          <LeftFont>수리 가능 시간</LeftFont>
          <TimeBoxContainer>
            {construction_date.map(({ date, times = [] }) => (
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
      <div style={{ width: "100%", height: "6px" }} />
      <WhiteBox>
        <PrimaryButton
          state="active"
          onClick={postRequestData}
          buttonText="제출하기"
        ></PrimaryButton>
      </WhiteBox>
    </Container>
  );
};

export default SummaryRequest;
