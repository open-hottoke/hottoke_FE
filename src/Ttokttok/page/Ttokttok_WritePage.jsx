import styled from "styled-components";
import { Container } from "../../common/CommonComponents";
import Ttokttok_Header from "../components/Ttokttok_Header";
import Icn from "../assets/MessageWriteIcn.jpg";
import PrimaryButton from "../../common/PrimaryButton";
import { useEffect, useState } from "react";
import BoxToggle from "../components/BoxToggle";
import CheckAble from "../assets/CheckAble.png";
import CheckDisable from "../assets/CheckDisable.png";
import axios from "axios";
import TimeToggle from "../components/TimeToggle";
import Modal_SendCheck from "../components/Modal_SendCheck";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authToken } from "../../store/authToken";
import TagArray from "../array/TagArray";
import returnKoreaDate from "../../functions/returnKoreaDate";

const ContentContainer = styled.div`
  width: 100%;

  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;

  margin-bottom: 70px;
`;

const ToggleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;

  overflow: scroll;
  padding: 10px;
`;

const BtnWrapper = styled.div`
  padding: 10px;

  position: fixed;
  bottom: 0;
  width: 388px;

  background-color: #fff;
`;

const Horizon = styled.div`
  width: 100%;
  height: 6px;

  background-color: #f5f6f7;
`;

// process 1
const BasicInfoContainer = styled.div`
  width: 100%;
  padding: 30px 24px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
`;

const BasicInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const BasicInfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
`;

const BasicInfoSmallColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;

  color: #1f1f1f;
`;

const BasicInfoIndex = styled.div`
  color: #565656;

  display: flex;
  justify-content: flex-start;
`;

const BasicInfoDescript = styled.div`
  color: #9a9a9a;

  text-align: left;
  line-height: 15px;
`;

const CheckBtn = styled.img`
  width: 22px;
  object-fit: cover;
  cursor: pointer;
`;

const TagTotalContainer = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 20px;
  column-gap: 40px;
  flex-wrap: wrap;
`;

const TagRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const DescriptInput = styled.input`
  border: none;
  outline: none;

  width: 100%;

  display: flex;
  padding: 13px 15px;

  border-radius: 6px;
  border: 1px solid #efefef;
  background-color: #fafafb;

  color: #1f1f1f;
`;

const WordCountContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Ttokttok_WritePage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);

  const navigate = useNavigate();

  const [process, setProcess] = useState(0);
  // 부모에서 선택된 id를 관리함 (101, 102,....)
  const [selectedId, setSelectedId] = useState(0);
  const [modal, setModal] = useState(false);

  // process 1에서의 input들을 관리
  const [anonymity, setAnonymity] = useState(false);
  const [tag, setTag] = useState(5); // 0~4로 관리
  const [timeArray, setTimeArray] = useState(Array(48).fill(false));
  const [descript, setDescript] = useState("");

  // 입력 핸들러
  const handleChange = (event) => {
    const inputText = event.target.value;

    // 글자 수가 15자를 초과하지 않도록 제한
    if (inputText.length <= 100) {
      setDescript(inputText);
    }
  };

  const handleSelectReceiver = (id) => {
    setSelectedId(id);
  };

  // 똑똑 보내기 처리
  const handleSubmit = async () => {
    try {
      let realDescript = descript;
      const tagName =
        TagArray.find((item) => item.key === tag)?.string ?? "기타";
      if (realDescript === "") realDescript = tagName;
      const res = await axios.post(
        `${BASE_URL}/post`,
        {
          unitNumber: String(selectedId) + "호",
          content: realDescript,
          tag: tagName,
          anonymity: anonymity,
          createdAt: returnKoreaDate(),
          timeArray: timeArray,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log({
        unitNumber: String(selectedId) + "호",
        content: realDescript,
        tag: tagName,
        anonymity: anonymity,
        createdAt: returnKoreaDate(),
        timeArray: timeArray,
      });
      console.log("똑똑 작성 결과", res.data);
    } catch (error) {
      console.log("똑똑 작성", error);
    }
    setModal(false);
    navigate(-1); // 뒤로가기
  };

  const fetchMyStatus = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/my-status`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("이웃에게 한마디 조회 api", res.data);
    } catch (error) {
      console.log("이웃에게 한마디 조회", error);
    }
  };

  useEffect(() => {
    console.log("시간 배열 변경", timeArray);
  }, [timeArray]);

  useEffect(() => {
    fetchMyStatus();
  }, []);

  let content;
  if (process === 0)
    content = (
      <ContentContainer>
        <img src={Icn} style={{ width: 78, objectFit: "cover" }} />
        <div className="button3" style={{ color: "#1f1f1f" }}>
          이웃의 호수를 선택하고 전하고 싶은 메세지를 쪽지로 보내보세요.
        </div>
        <ToggleContainer>
          <BoxToggle
            handleSelectReceiver={handleSelectReceiver}
            floor={1}
            selectedId={selectedId}
          ></BoxToggle>
          <BoxToggle
            handleSelectReceiver={handleSelectReceiver}
            floor={2}
            selectedId={selectedId}
          ></BoxToggle>
          <BoxToggle
            handleSelectReceiver={handleSelectReceiver}
            floor={3}
            selectedId={selectedId}
          ></BoxToggle>
        </ToggleContainer>
      </ContentContainer>
    );
  else
    content = (
      <ContentContainer>
        <BasicInfoContainer>
          <BasicInfoRow>
            <BasicInfoIndex className="body2">보낼 이웃</BasicInfoIndex>
            <div className="body2" style={{ color: "#1f1f1f" }}>
              {selectedId}호
            </div>
          </BasicInfoRow>
          <BasicInfoRow>
            <BasicInfoIndex className="body2">익명 여부</BasicInfoIndex>
            <CheckBtn
              src={anonymity ? CheckAble : CheckDisable}
              onClick={() => setAnonymity(!anonymity)}
            />
          </BasicInfoRow>
          <BasicInfoColumn>
            <BasicInfoSmallColumn>
              <BasicInfoIndex className="body2">태그</BasicInfoIndex>
              <BasicInfoDescript className="caption2">
                어떤 이유로 메세지를 보내시나요? 태그를 활용해보세요. <br />{" "}
                다중선택이 가능해요.{" "}
              </BasicInfoDescript>
            </BasicInfoSmallColumn>
            <TagTotalContainer>
              <TagRowContainer>
                <CheckBtn
                  src={tag === 0 ? CheckAble : CheckDisable}
                  onClick={() => setTag(0)}
                />
                <div className="body2" style={{ color: "#1f1f1f" }}>
                  층간소음이 심해요
                </div>
              </TagRowContainer>
              <TagRowContainer>
                <CheckBtn
                  src={tag === 1 ? CheckAble : CheckDisable}
                  onClick={() => setTag(1)}
                />
                <div className="body2" style={{ color: "#1f1f1f" }}>
                  칭찬해요
                </div>
              </TagRowContainer>
              <TagRowContainer>
                <CheckBtn
                  src={tag === 2 ? CheckAble : CheckDisable}
                  onClick={() => setTag(2)}
                />
                <div className="body2" style={{ color: "#1f1f1f" }}>
                  아기가 자고 있어요
                </div>
              </TagRowContainer>
              <TagRowContainer>
                <CheckBtn
                  src={tag === 3 ? CheckAble : CheckDisable}
                  onClick={() => setTag(3)}
                />
                <div className="body2" style={{ color: "#1f1f1f" }}>
                  조용히 해주세요
                </div>
              </TagRowContainer>
              <TagRowContainer>
                <CheckBtn
                  src={tag === 4 ? CheckAble : CheckDisable}
                  onClick={() => setTag(4)}
                />
                <div className="body2" style={{ color: "#1f1f1f" }}>
                  기타
                </div>
              </TagRowContainer>
            </TagTotalContainer>
          </BasicInfoColumn>
        </BasicInfoContainer>
        {tag === 0 || tag === 2 || tag === 3 ? (
          <>
            <Horizon />
            <BasicInfoContainer>
              <BasicInfoSmallColumn>
                <div className="h3">이 시간대에는 침묵을 지켜주세요</div>
                <div className="caption2">
                  층간소음을 원하지 않는 시간대를 터치 또는 드래그 해주세요.
                </div>
              </BasicInfoSmallColumn>
              <TimeToggle setTimeArray={setTimeArray} />
            </BasicInfoContainer>
          </>
        ) : (
          <></>
        )}
        <Horizon />
        <BasicInfoContainer style={{ gap: 5 }}>
          <BasicInfoIndex className="body2">상세 작성</BasicInfoIndex>
          <BasicInfoDescript className="caption2">
            이웃에게 보낼 메세지를 작성해주세요.
            <br />
            작성하지 않으면 기본 멘트로 전송돼요!
          </BasicInfoDescript>
          {/* placeholder로 태그에 매핑되는 문자열 넣으면 될듯함. */}
          <DescriptInput
            className="caption1"
            placeholder={
              TagArray.find((item) => item.key === tag)?.string ??
              "주의 부탁드립니다."
            }
            value={descript}
            onChange={handleChange}
          />
          <WordCountContainer>
            <span className="caption2" style={{ color: "#a8a8a8" }}>
              <strong>{descript.length} / 100</strong>
            </span>
          </WordCountContainer>
        </BasicInfoContainer>
      </ContentContainer>
    );

  // process 1일 때 제출 가능 여부를 확인
  return (
    <Container className="Ttokttok" style={{ height: "auto" }}>
      {modal && (
        <Modal_SendCheck
          id={selectedId}
          handleSubmit={handleSubmit}
          handleClose={() => setModal(false)}
        />
      )}
      <Ttokttok_Header header_title="똑똑 쓰기" backBtn={true} />
      {process === 1 && <Horizon />}
      {content}
      <BtnWrapper>
        <PrimaryButton
          state={
            (process === 0 && selectedId !== 0) || (process === 1 && tag != 5)
              ? "active"
              : ""
          }
          buttonText={process === 0 ? "선택 완료" : "제출하기"}
          onClick={
            process === 0
              ? () => {
                  if (selectedId !== 15) setProcess(1);
                }
              : () => {
                  if (tag !== 5) setModal(true);
                }
          }
        />
      </BtnWrapper>
    </Container>
  );
};

export default Ttokttok_WritePage;
