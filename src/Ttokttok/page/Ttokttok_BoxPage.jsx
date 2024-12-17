import styled, { css } from "styled-components";
import { Container } from "../../common/CommonComponents";
import Ttokttok_Header from "../components/Ttokttok_Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getHHMMDate from "../../functions/getHHMMDate";
import { useRecoilValue } from "recoil";
import { authToken } from "../../store/authToken";

const ToggleContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Toggle = styled.div`
  width: 50%;
  padding: 10px 0px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.state
      ? css`
          border-bottom: 1.5px solid #323232;
          color: #1f1f1f;
        `
      : css`
          border-bottom: 1.5px solid #efefef;
          color: #a8a8a8;
        `}
`;

const IndexContainer = styled.div`
  width: 100%;
  padding: 28px 15px 10px 15px;

  color: #a8a8a8;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px 15px;

  color: #323232;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 5px 0;

  gap: 18px;
  align-self: stretch;

  color: #565656;

  cursor: pointer;
`;

const Date = styled.div`
  white-space: pre-line;

  display: flex;
  justify-content: flex-end;
  text-align: right;

  color: #9a9a9a;
`;

const Ttokttok_BoxPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);

  const [toggleState, setToggleState] = useState(0);
  const [receiveTtokttok, setReceive] = useState({});
  const [sendTtokttok, setSend] = useState({});

  const navigate = useNavigate();

  const handleItemClick = ({ item }) => {
    navigate("/ttokttok/box/detail");
  };

  // 첫 렌더링시 데이터를 받아옴
  useEffect(() => {
    // 받은 똑똑 조회
    const fetchReceive = async () => {
      try {
        console.log("token", token);
        const res = await axios.get(`${BASE_URL}/post-recieve`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("받은 똑똑", res.data);
        setReceive(res.data);
      } catch (error) {
        console.log("받은 똑똑", error);
      }
    };
    // 보낸 똑똑 조회
    const fetchSend = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/post-send`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("보낸 똑똑 api", res.data);
        setSend(res.data);
      } catch (error) {
        console.log("보낸 똑똑 조회 api", error);
      }
    };

    fetchReceive();
    fetchSend();
  }, []);

  useEffect(() => {}, [sendTtokttok, receiveTtokttok]);

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

  console.log(receiveTtokttok != {});
  if (receiveTtokttok != {} && sendTtokttok != {})
    return (
      <Container className="Ttokttok">
        <Ttokttok_Header header_title="똑똑 박스" backBtn={true} write={true} />
        <ToggleContainer>
          <Toggle state={toggleState === 0} onClick={() => setToggleState(0)}>
            <div className="h3">받은 똑똑</div>
          </Toggle>
          <Toggle state={toggleState === 1} onClick={() => setToggleState(1)}>
            <div className="h3">보낸 똑똑</div>
          </Toggle>
        </ToggleContainer>
        <IndexContainer>
          <div className="button3">보낸 이웃</div>
          <div className="button3">내용</div>
          <div className="button3">날짜</div>
        </IndexContainer>
        <ContentContainer>
          {toggleState === 0
            ? Object.entries(receiveTtokttok).map(([id, entry]) => (
                <Content
                  key={id}
                  onClick={() =>
                    navigate(`/ttokttok/box/detail/${id}`, {
                      state: {
                        ...entry,
                        type: "receive",
                      },
                    })
                  }
                >
                  <div style={{ color: "black" }} className="button2">
                    {parseNumbers(entry.senderId)}
                  </div>
                  <div
                    style={{ color: "black", textAlign: "center", flex: 1 }}
                    className="body2"
                  >
                    {entry.content}
                  </div>
                  <Date className="caption1">
                    {getHHMMDate(entry.createdAt)}
                  </Date>
                </Content>
              ))
            : Object.entries(sendTtokttok).map(([id, entry]) => (
                <Content
                  key={id}
                  onClick={() =>
                    navigate(`/ttokttok/box/detail/${id}`, {
                      state: {
                        ...entry,
                        type: "send",
                      },
                    })
                  }
                >
                  <div style={{ color: "black" }} className="button2">
                    {parseNumbers(entry.receiverId)}
                  </div>
                  <div
                    style={{ color: "black", textAlign: "center" }}
                    className="body2"
                  >
                    {entry.content}
                  </div>
                  <Date className="caption1">
                    {getHHMMDate(entry.createdAt)}
                  </Date>
                </Content>
              ))}
        </ContentContainer>
      </Container>
    );
};

export default Ttokttok_BoxPage;
