import styled, { css } from "styled-components";
import Ttokttok_Header from "../components/Ttokttok_Header";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "../../common/CommonComponents";
import PencilIcn from "../assets/PencilIcn.png";
import Tag_compliment from "../assets/Tags/Tag_compliment.jpg";
import Tag_Noise from "../assets/Tags/Tag_Noise.jpg";
import Tag_Quiet from "../assets/Tags/Tag_Quiet.jpg";
import Tag_Sleeping from "../assets/Tags/Tag_Sleeping.jpg";
import getHHMMDate from "../../functions/getHHMMDate";
import TagArray from "../array/TagArray";

const Horizon = styled.div`
  width: 100%;
  height: 6px;

  background-color: #f5f6f7;
`;

const ContentContainer = styled.div`
  width: 100%;
  flex: 1 0 0;
  align-self: stretch;

  padding: 30px 24px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
`;

const IndexAndValue = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: #565656;
`;

const Title = styled.div`
  color: #565656;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const Value = styled.div`
  color: var(--Basic-GrayScale-Gray-800, #1f1f1f);

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  white-space: pre-line;

  text-align: right;
`;

const DescriptBox = styled.div`
  width: 100%;
  display: flex;
  padding: 13px 15px;

  align-items: flex-start;

  border-radius: 6px;
  border: 1px solid #efefef;
  background: #fafafb;

  color: #1f1f1f;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
`;

const SendButton = styled.div`
  cursor: pointer;

  padding: 11px 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  border-radius: 30px;
  border: 1px solid rgba(1, 210, 129, 0.3);
  background: rgba(1, 210, 129, 0.04);

  color: #1f1f1f;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TagIcn = styled.img`
  height: 34px;
  object-fit: cover;
`;

// type: receive, send
const Tttokttok_BoxDetailPage = () => {
  const location = useLocation();
  console.log(location.state.type);

  function parseNumbers(input) {
    if (input >= 1 && input <= 5) {
      return input + 100; // 1 → 101, 2 → 102, ..., 5 → 105
    } else if (input >= 6 && input <= 10) {
      return input + 195; // 6 → 201, 7 → 202, ..., 10 → 205
    } else if (input >= 11 && input <= 15) {
      return input + 290; // 11 → 301, 12 → 302, ..., 15 → 305
    } else {
      return null; // 범위를 벗어나는 경우 null 반환
    }
  }

  let imgSrc =
    TagArray.find((item) => item.string === location.state.tag)?.src ?? ".";

  console.log(imgSrc);
  return (
    <Container className="Ttokttok">
      <Ttokttok_Header
        header_title={
          location.state.type === "receive" ? "받은 똑똑" : "보낸 똑똑"
        }
        backBtn={true}
      ></Ttokttok_Header>
      <Horizon />
      <ContentContainer>
        <IndexAndValue>
          <Title>보낸 이웃</Title>
          <Value>
            {location.state.type === "receive"
              ? location.state.anonymity
                ? "익명"
                : `${parseNumbers(location.state.senderId)}호`
              : parseNumbers(location.state.receiverId)}
          </Value>
        </IndexAndValue>
        <IndexAndValue>
          <Title>날짜</Title>
          <Value>{getHHMMDate(location.state.createdAt)}</Value>
        </IndexAndValue>
        <IndexAndValue>
          <Title>태그</Title>
          <TagIcn
            src={
              imgSrc === "Tag_Sleeping"
                ? Tag_Sleeping
                : imgSrc === "Tag_Quiet"
                ? Tag_Quiet
                : imgSrc === "Tag_noise"
                ? Tag_Noise
                : imgSrc === "Tag_compliment"
                ? Tag_compliment
                : ""
            }
          />
        </IndexAndValue>
        <IndexAndValue
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}
        >
          <Title>내용</Title>
          <DescriptBox>
            <div className="Caption1">{location.state.content}</div>
          </DescriptBox>
        </IndexAndValue>
        {location.state.type === "receive" && !location.state.anonymity ? (
          <ButtonWrapper>
            <SendButton>
              <img src={PencilIcn} style={{ width: 12 }} />
              <div className="button3">
                {" "}
                {parseNumbers(location.state.senderId) ||
                  parseNumbers(location.state.receiverId)}
                호에 답장하기
              </div>
            </SendButton>
          </ButtonWrapper>
        ) : (
          <></>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Tttokttok_BoxDetailPage;
