import styled from "styled-components";
import { Container, SmallFont } from "../common/CommonComponents";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authToken } from "../store/authToken";
import InfoBtnImg from "../../src/assets/InfoBtnImg.png";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import Modal from "../common/Modal";

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const GreenText = styled.span`
  color: rgba(1, 210, 129, 0.5);
  font-size: 12px;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;
const StageName = styled.span`
  color: #1f1f1f;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const Content = styled.span`
  color: #565656;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px; /* 150% */
  text-align: left;
`;

const SubContent = styled(Content)`
  color: #9a9a9a;
`;

const GreenBox = styled.div`
  width: 100%;
  height: 397px;
  border-radius: 0px 0px 30px 30px;
  border: 1px solid rgba(1, 210, 129, 0.3);
  background: rgba(1, 210, 129, 0.06);
`;

const OutlineBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const InfoBtn = styled.img`
  width: 22px;
  height: 22px;
`;

const GreenProgressState = styled.div`
  display: flex;
  height: 24px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 30px;
  border: 1.5px solid rgba(1, 210, 129, 0.3);
  background: var(--Color-Primary, #01d281);

  color: var(--Basic-White, #fff);
  text-align: center;

  /* button3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* H2 */

  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 144.444% */
`;

const CircleState = styled.div`
  display: flex;
  width: 56px;
  height: 56px;
  padding: 10px 9px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 28px;
  border: 1px solid var(--Color-Primary, #01d281);
  background: var(--GrayScale-Gray-100, #fafafb);
  opacity: ${(props) => !props.state && 0.3};
  color: var(--GrayScale-Gray-700, #323232);
  text-align: center;

  /* button3 */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;

const CircleOffState = styled.div`
  display: flex;
  width: 56px;
  height: 56px;
  padding: 10px 9px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 28px;
  border: 1px dashed var(--Color-Primary, #01d281);
  opacity: 0.4;
  background: var(--GrayScale-Gray-100, #fafafb);

  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* button3 */
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;

const ConcreteProgress = styled.div`
  display: flex;
  height: 46px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 10px;
  border: 1px solid rgba(1, 210, 129, 0.2);
  background: rgba(255, 255, 255, 0.5);

  color: var(--GrayScale-Gray-700, #323232);
  text-align: center;

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const WhiteProgressState = styled.div`
  display: flex;
  height: 24px;
  padding: 0px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 30px;
  border: 1.5px solid rgba(1, 210, 129, 0.3);

  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* button3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;

const DetailTitle = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const FinishDetailBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const FinishDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px 24px;
  gap: 6px;
  align-self: stretch;
`;

const IngRepairPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);
  const location = useLocation();
  const navigate = useNavigate();
  const inProgressRequestList = location.state.idList;
  const [modalVisible, setModalVisible] = useState(false);

  const [doneRequestList, setDoneRequestList] = useState([]);

  const [stage, setStage] = useState(0);

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  const getRequestDone = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/service/done`, {
        headers: { Authorization: token },
      });
      setDoneRequestList(res.data);
      console.log("완료 요청 api:", res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequestDone();
    setStage(inProgressRequestList[inProgressRequestList.length - 1].status);
  }, []);

  const fetchingData = inProgressRequestList[inProgressRequestList.length - 1]
    .vendor_details[0];

  return (
    <>
      {modalVisible && (
        <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
          <ModalBody>
            <StepContainer>
              <GreenText>STEP 1</GreenText>
              <StageName>업체 찾는 중</StageName>
              <Content>
                제출하신 요청서를 바탕으로 업체에서 견적서를 작성중이에요! 잠시
                기다려주시면 합리적인 견적서를 찾아드릴게요.
              </Content>
            </StepContainer>
            <StepContainer>
              <GreenText>STEP 2</GreenText>
              <StageName>비용 분담</StageName>
              <Content>
                호스트가 수리요청서와 견적서를 바탕으로 누가 비용을 부담할지
                결정하고 있어요!
              </Content>
              <SubContent>
                일반적인 비용 부담 사례를 알려드릴게요. 세입자는 작은 결함을
                포함하여 관리 소홀이나 부주의로 생긴 고장 비용을 부담해요.
                집주인은 보일러, 수도관 고장을 포함한 큰 결함을 부담해요!
              </SubContent>
            </StepContainer>
            <StepContainer>
              <GreenText>STEP 3</GreenText>
              <StageName>업체 매칭</StageName>
              <Content>
                업체 매칭이 완료됐어요! 곧 수리 기사님이 방문하실 예정이에요.
              </Content>
            </StepContainer>
            <StepContainer>
              <GreenText>STEP 4</GreenText>
              <StageName>업체 찾는 중</StageName>
              <Content>
                수리가 완료됐어요! 만족스러우셨나요? 앞으로도 핫케톡에서 만나요!
              </Content>
            </StepContainer>
          </ModalBody>
        </Modal>
      )}
      <Container className="InitProcess">
        <GreenBox>
          <Header headerTitle="진행중인 수리" />
          <OutlineBox style={{ margin: "0px 24px 24px 24px" }}>
            <RowWrapper style={{ marginTop: "20px" }}>
              <GreenProgressState>진행중</GreenProgressState>
              <InfoBtn
                src={InfoBtnImg}
                alt="자세히 보기"
                onClick={() => setModalVisible(true)}
              />
            </RowWrapper>
            <RowWrapper style={{ margin: "15px 0px 6px 0px" }}>
              <Title>
                {
                  inProgressRequestList[inProgressRequestList.length - 1]
                    .category
                }
              </Title>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate("/detailedRequest", {
                    state: {
                      requestId:
                        inProgressRequestList[inProgressRequestList.length - 1]
                          .request_id,
                    },
                  })
                }
              >
                <SmallFont>요청상세</SmallFont>
                <img src="/DetailButton.png" width="4px" />
              </div>
            </RowWrapper>
            <SmallFont style={{ textAlign: "left" }}>
              $
              {inProgressRequestList[
                inProgressRequestList.length - 1
              ].date.slice(0, 10)}{" "}
              요청
            </SmallFont>
            <RowWrapper style={{ margin: "28px 0px" }}>
              <CircleState state={stage === 0}>
                업체
                <br />
                찾는 중
              </CircleState>
              <img src="/GreenLine.png" width="25px" />
              <CircleState state={stage === 1}>
                비용
                <br />
                분담
              </CircleState>
              <img src="/GreenLine.png" width="25px" />
              <CircleState state={stage === 2}>
                업체
                <br />
                매칭
              </CircleState>
              <img src="/GreenLine.png" width="25px" />
              <CircleState state={stage === 3}>
                처리
                <br />
                완료
              </CircleState>
            </RowWrapper>
            {inProgressRequestList[inProgressRequestList.length - 1].status ===
            0 ? (
              <ConcreteProgress>
                수리업체에서 요청서를 확인하고 있어요
              </ConcreteProgress>
            ) : inProgressRequestList[inProgressRequestList.length - 1]
                .status === 1 ? (
              <PrimaryButton
                state="active"
                buttonText="견적서 선택하러 가기"
                onClick={() =>
                  navigate("/selectProposal", {
                    state: {
                      requestId:
                        inProgressRequestList[inProgressRequestList.length - 1]
                          .request_id,
                    },
                  })
                }
              />
            ) : (
              <PrimaryButton
                state="active"
                buttonText="견적 확인하기"
                onClick={() =>
                  navigate("/detailedProposal2", {
                    state: {
                      selectedId:
                        inProgressRequestList[inProgressRequestList.length - 1]
                          .request_id,
                      category:
                        inProgressRequestList[inProgressRequestList.length - 1]
                          .category,
                      construction_vendor:
                        fetchingData.vendor_name,
                  
                      estimate_price:
                        fetchingData.estimate_price,
                      estimate_time:
                        fetchingData.estimate_time,
                      additional_comment:
                        fetchingData.additional_comment,
                    },
                  })
                }
              />
            )}
          </OutlineBox>
        </GreenBox>

        <WhiteProgressState style={{ margin: "30px 0px 20px 24px" }}>
          진행완료
        </WhiteProgressState>
        <FinishDetailBoxContainer>
          {doneRequestList.map((item, index) => (
            <FinishDetailBox key={index}>
              <RowWrapper>
                <DetailTitle>{item.category}</DetailTitle>{" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/detailedRequest", {
                      state: { requestId: doneRequestList[index].request_id },
                    })
                  }
                >
                  <SmallFont>요청상세</SmallFont>
                  <img src="/DetailButton.png" width="4px" />
                </div>
              </RowWrapper>
              <div style={{ display: "flex", gap: "8px" }}>
                <SmallFont>{formatDate(item.date)} 수리완료</SmallFont>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img src="/DetailButton.png" width="4px" />
                  <SmallFont style={{ color: "#1F1F1F", fontWeight: "600" }}>
                    {item.construction_vendor}
                  </SmallFont>
                </div>
              </div>
            </FinishDetailBox>
          ))}
        </FinishDetailBoxContainer>
      </Container>
    </>
  );
};

export default IngRepairPage;
