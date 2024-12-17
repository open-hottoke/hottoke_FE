import styled from "styled-components";
import { Container } from "../../common/CommonComponents";
import NavBar from "../../common/NavBar";
import Ttokttok_Header from "../components/Ttokttok_Header";
import BoxIcn from "../assets/BoxIcn.png";
import WriteIcn from "../assets/WriteIcn.png";
import Chat from "../assets/Chat.png";
import Profile from "../assets/DefaultProfile.png";
import Polygon from "../assets/polygon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { useRecoilValue } from "recoil";
import { authToken } from "../../store/authToken";

const ContentContainer = styled.div`
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 50px;

  padding: 0px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 30px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: space-between;
`;

const InfoText = styled.div`
  width: 100%;
  text-align: left;

  font-family: Pretendard;
  font-style: normal;
`;

const TtokttokContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px;
`;

const TtokttokBox = styled.div`
  width: 70%;
  height: 100px;
  background-color: #565656;
  border-radius: 10px;

  padding: 10px;

  color: #ffffff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  display: flex;
  flex-direction: column;
  align-items: left;

  position: relative;

  cursor: pointer;
`;

const TtokttokWrite = styled.div`
  width: 30%;
  height: 100px;
  border-radius: 10px;
  border: 1.5px solid #efefef;
  background-color: #fafafb;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.12);

  padding: 10px;

  color: #1f1f1f;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;

  display: flex;
  flex-direction: column;
  align-items: left;

  position: relative;

  cursor: pointer;
`;

const AbsoluteIcn = styled.img`
  position: absolute;

  width: 44px;
  object-fit: cover;

  bottom: 15px;
  right: 20px;
`;

const Ttokttok_MainPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);

  const navigate = useNavigate();
  const [address, setAddress] = useState();

  // 주소 요청 api
  const fetchAddress = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get-address`, {
        headers: {
          Authorization: token,
        },
      });
      setAddress(res.data.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <Container className="Ttokttok" style={{ overflow: scroll }}>
      <Ttokttok_Header
        header_title="똑똑"
        backBtn={false}
        alarm={true}
        write={false}
      />
      <ContentContainer>
        <ProfileContainer>
          <InfoContainer style={{ color: "black" }}>
            <InfoText
              style={{ fontSize: "12px", fontWeight: "400", color: "#9a9a9a" }}
            >
              우리집
            </InfoText>
            <InfoText
              style={{ fontSize: "16px", fontWeight: "600", color: "#1f1f1f" }}
            >
              {address}
            </InfoText>
          </InfoContainer>
          <ProfileImg
            src={Profile}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/ttokttok/profile")}
          />
        </ProfileContainer>
        {/* 공지사항 */}
        <Notice />
        {/* 광고는 제외 */}
        <TtokttokContainer>
          <TtokttokBox onClick={() => navigate("/ttokttok/box")}>
            <div style={{ width: "100%", textAlign: "left" }}>똑똑 박스</div>
            <div
              style={{
                width: "100%",
                textAlign: "left",
                fontSize: 11,
                fontWeight: 400,
              }}
            >
              이웃들과 주고받은 메시지를 <br /> 확인해보세요.
            </div>
            <img src={Polygon} style={{ position: "absolute", bottom: -10 }} />
            <AbsoluteIcn src={BoxIcn} />
          </TtokttokBox>
          <TtokttokWrite onClick={() => navigate("/ttokttok/write")}>
            <div style={{ width: "100%", textAlign: "left" }}>똑똑 쓰기</div>
            <AbsoluteIcn src={WriteIcn} />
          </TtokttokWrite>
        </TtokttokContainer>
        <img
          onClick={() => alert("준비 중인 서비스입니다.")}
          src={Chat}
          style={{ width: "100%", objectFit: "cover", cursor: "pointer" }}
        />
      </ContentContainer>
      <NavBar />
    </Container>
  );
};

export default Ttokttok_MainPage;
