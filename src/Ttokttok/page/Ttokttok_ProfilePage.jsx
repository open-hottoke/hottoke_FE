import { useState, useEffect } from "react";
import { Container } from "../../common/CommonComponents";
import Ttokttok_Header from "../components/Ttokttok_Header";
import styled from "styled-components";
import axios from "axios";
import DefaultProfile from "../assets/DefaultProfile.png";
import WriteIcn from "../assets/WriteMiniIcn.png";
import { useRecoilValue } from "recoil";
import { authToken } from "../../store/authToken";

const ContentContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

const ProfileBoxContainer = styled.div`
  width: 100%;

  display: flex;
  padding: 46px 20px;
  align-items: center;
  gap: 44px;

  border-radius: 20px;
  border: 2px solid rgba(1, 210, 129, 0.2);
  background: rgba(1, 210, 129, 0.04);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80.07px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const IndexAndValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  color: #1f1f1f;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const ToNeighbor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;

const InputContainer = styled.div`
  margin-top: 10px;
  background: var(--Basic-White, #fff);
  padding: 16px 12px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;

  background-color: #fff;

  font-size: 12px;
  font-weight: 400;
  line-height: 18px;

  color: #000;

  &:hover {
    border: none;
  }

  &:placeholder {
    color: #a8a8a8;
  }
`;

const WordCountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Ttokttok_ProfilePage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);

  const [address, setAddress] = useState();
  const [unitNumber, setUnitNumber] = useState("");
  const [myStatus, setMyStatus] = useState("");

  const [answerInputLth, setAnswerInputLth] = useState(0);
  const [text, setText] = useState("");

  // 입력 핸들러
  const handleChange = (event) => {
    const inputText = event.target.value;

    // 글자 수가 15자를 초과하지 않도록 제한
    if (inputText.length <= 15) {
      setText(inputText);
    }
  };

  // 주소 요청 api
  const fetchAddress = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get-address`, {
        headers: {
          Authorization: token,
        },
      });
      setAddress(res.data.address);
      setUnitNumber(res.data.unitNumber);
      fetchMyStatus(res.data.unitNumber);
    } catch (error) {
      console.log("주소 api", error);
    }
  };

  // 이웃에게 한마디 수정
  const postMyStatus = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/my-status?status=${text}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("수정이 완료되었습니다.");
    } catch (error) {
      console.log("이웃에게 한마디 수정 api", error);
    }
  };

  // 나의 이웃에게 한마디 조회
  const fetchMyStatus = async (unitNum) => {
    try {
      const res = await axios.get(`${BASE_URL}/my-status`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("나의 이웃에게 한마디 조회", res.data);
      // unitNumber로부터 나의 층수를 빼낸다
      const floorNum =
        parseInt(Number(unitNum.replace(/\D/g, "")) / 100) + "층";
      const unitString = unitNum.replace(/\D/g, "");
      const myFloor =
        res.data[parseInt(Number(unitNum.replace(/\D/g, "")) / 100) + "층"] ||
        null;
      console.log(unitString, myFloor);
      // 내 호수의 데이터
      if (myFloor !== null) {
        setMyStatus(myFloor[unitNum]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <Container className="Ttokttok">
      <Ttokttok_Header
        header_title="똑똑 프로필"
        backBtn={true}
        alarm={false}
        write={false}
      />
      <ContentContainer>
        <ProfileContainer>
          <div
            style={{ fontSize: "12px", fontWeight: "400", color: "#9a9a9a" }}
          >
            우리집
          </div>
          <div
            style={{ fontSize: "16px", fontWeight: "600", color: "#1f1f1f" }}
          >
            {address}
          </div>
        </ProfileContainer>
        <ProfileBoxContainer>
          <ProfileImg src={DefaultProfile} />
          <InfoContainer>
            <IndexAndValue>
              <span style={{ color: "#9a9a9a" }}>주소</span>
              <span>{address}</span>
            </IndexAndValue>
            <IndexAndValue>
              <span style={{ color: "#9a9a9a" }}>동/호수</span>
              <span>{unitNumber}</span>
            </IndexAndValue>
            <ToNeighbor>
              <div className="button2" style={{ color: "#565656" }}>
                이웃에게 한 마디!
              </div>
              <div className="caption2" style={{ color: "#9a9a9a" }}>
                이웃이 확인할 수 있어요.
              </div>
              <InputContainer>
                <Input
                  placeholder={
                    myStatus !== null
                      ? myStatus
                      : "최대 15자까지 입력할 수 있어요."
                  }
                  value={text}
                  onChange={handleChange}
                />
                <img
                  onClick={postMyStatus}
                  src={WriteIcn}
                  style={{ height: 15, objectFit: "cover", cursor: "pointer" }}
                />
              </InputContainer>
              <WordCountContainer>
                <span className="caption2" style={{ color: "#a8a8a8" }}>
                  <strong>{text.length} / 15</strong>
                </span>
              </WordCountContainer>
            </ToNeighbor>
          </InfoContainer>
        </ProfileBoxContainer>
      </ContentContainer>
    </Container>
  );
};

export default Ttokttok_ProfilePage;
