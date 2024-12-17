import { Container } from "../common/CommonComponents";
import Header from "../common/Header";
import styled, { css } from "styled-components";
import PrimaryButton from "../common/PrimaryButton";
import { useState, useEffect } from "react";
import AuthCodeModal from "./AuthCodeModal";
import CompleteModal from "./CompleteModal";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const ElemetWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 24px;
  flex-direction: column;

  gap: 30px;
`;

const FullWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-self: stretch;

  flex-grow: 1;
`;

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

const SmallFont = styled.div`
  color: var(--GrayScale-Gray-600, #565656);

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  text-align: left;
`;

const TinyFont = styled.div`
  align-self: stretch;
  color: var(--GrayScale-Gray-400, #a8a8a8);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;

  text-align: left;
`;

const InputElement = styled.input`
  display: flex;
  width: 100%;
  height: 44px;
  padding: 13px 15px;
  align-items: flex-start;

  outline: none;
  border-radius: 6px;
  border: ${(props) =>
    props.checked
      ? "1px solid rgba(1, 210, 129, 0.50)"
      : "1px solid var(--GrayScale-Gray-200, #efefef)"};

  background: var(--GrayScale-Gray-100, #fafafb);

  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

const CheckButton = styled.div`
  display: flex;
  width: 80px;
  height: 44px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 6px;
  border: 1px solid var(--Color-Primary, #01d281);
  opacity: ${(props) =>
    props.checked
      ? 0.3 // checked가 true면 0.3
      : props.filled
      ? 1 // checked가 false이고 filled가 true면 1
      : 0.3}; // 나머지 경우 0.3

  color: var(--Color-Primary, #01d281);
  text-align: center;

  /* Button2 */
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;

  cursor: pointer;
`;

const SignUpPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // 1. 비밀번호 보기 아이콘
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1((showPassword1) => !showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((showPassword2) => !showPassword2);
  };

  // 2. 유효 이메일 입력 시 버튼 활성화
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(inputValue));
  };

  // 3. 인증 코드 모달
  const [modalState, setModalState] = useState("");

  const handleModal = () => {
    setModalState(1);
  };

  const handleCancle = () => {
    setModalState("");
  };

  // 4. 이메일 인증코드 칸 활성화
  const [authState, setauthState] = useState("");

  const handleAuth = () => {
    setauthState(1);
  };

  const handleClick = () => {
    handleModal();
    handleAuth();
  };

  // 5. 인증코드 입력값 확인
  const [code, setCode] = useState(""); // 인증코드 입력값
  const [isValidCode, setIsValidCode] = useState(false); // 유효성 상태

  const handleCodeChange = (e) => {
    const inputValue = e.target.value;

    // 입력값 업데이트
    setCode(inputValue);

    // 인증코드 유효성 검사: 6자리 숫자인지 확인
    const ValidCodeCheck = /^[0-9]{6}$/.test(inputValue);
    setIsValidCode(ValidCodeCheck);
  };

  // 6. 인증코드가 일치했을 때
  const [correctCode, setCorrectCode] = useState("");

  const handleCorrectcode = () => {
    setCorrectCode(1);
  };

  // 7. 비밀번호 유효성 검사
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(null);

  const validatePassword = (value) => {
    const minLength = value.length >= 9; // 9자 이상
    const allowedSpecialChars = /^[A-Za-z0-9~@$^*!(),.+]+$/; // 허용된 특수문자
    const hasSpecialChar = /[~@$^*!(),.+]/.test(value); // 특수문자가 포함되었는지
    const hasUpperAndLower = /[A-Z]/.test(value) && /[a-z]/.test(value); // 영문 대소문자 조합

    // 조건별 에러 메시지 설정
    if (!minLength) {
      setIsValidPassword(false);
      return "9자 이상 입력해주세요.";
    } else if (!allowedSpecialChars.test(value)) {
      setIsValidPassword(false);
      return "특수문자는 ~,@,$,^,*,!,(,),.,+ 만 사용이 가능해요.";
    } else if (!hasSpecialChar || !hasUpperAndLower) {
      setIsValidPassword(false);
      return "영문 대소문자와 특수문자를 조합해 비밀번호를 입력해주세요.";
    }

    setIsValidPassword(true); // 조건 모두 만족 시 유효성 상태 true
    return ""; // 조건을 모두 만족하면 에러 없음
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // 유효성 검사
    const error = validatePassword(value);
    setErrorMessage(error);

    // 확인 비밀번호가 비어있지 않으면 일치 여부를 다시 확인
    if (confirmPassword !== "") {
      setIsMatch(value === confirmPassword);
    } else {
      setIsMatch(null); // 확인 비밀번호 입력값이 비어있으면 기본 상태로 설정
    }
  };

  // 8. 비밀번호 일치 여부 확인
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(null);

  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // 입력값이 비어 있으면 기본 상태로 설정
    if (value === "") {
      setIsMatch(null);
    } else {
      setIsMatch(password === value);
    }
  };
  // 9. 닉네임 유효성 확인
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [isValidName, setIsValidName] = useState(null); // 닉네임 유효성 상태 (null: 기본 상태)
  const [message, setMessage] = useState(""); // 메시지 상태

  // 닉네임 유효성 검사 함수
  const validateNickname = (value) => {
    const isKorean = /^[가-힣]+$/.test(value); // 한글만 허용
    const isValidLength = value.length >= 2 && value.length <= 6; // 2~6자 확인

    if (!isValidLength) {
      setIsValidName(false);
      setMessage("한글 2~6자로 입력해주세요.");
    } else if (!isKorean) {
      setIsValidName(false);
      setMessage("닉네임은 한글만 입력 가능합니다.");
    } else {
      setIsValidName(true);
      setMessage("사용 가능한 닉네임이에요.");
    }
  };

  // 닉네임 입력 핸들러
  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    // 유효성 검사
    if (value === "") {
      setIsValidName(null); // 기본 상태
      setMessage("");
    } else {
      validateNickname(value);
    }
  };

  // 10. 회원 가입 완료 모달
  const [completeModalState, setCompleteModalState] = useState("");

  const handleCompleteModal = () => {
    setCompleteModalState(1);
  };

  const handleCancle2 = () => {
    setCompleteModalState("");
  };

  // 아이디 중복 확인
  const debouncedIdInput = useDebounce(email, 200);
  const [isRedundant, setIsRedundant] = useState("");

  useEffect(() => {
    const handleCheckRedundance = async () => {
      try {
        if (email.length > 0) {
          const res = await axios.get(`${BASE_URL}/existId`, {
            params: { loginId: debouncedIdInput },
          });
          console.log(res.data);
          if (res.data !== "성공") {
            setIsRedundant("warning");
          } else {
            setIsRedundant("ok");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleCheckRedundance();
  }, [debouncedIdInput]);

  return (
    <Container className="InitProcess">
      {modalState !== "" && (
        <AuthCodeModal mainFont={email} handleCancle={handleCancle} />
      )}
      {completeModalState !== "" && <CompleteModal mainFont={nickname} />}
      <Header headerTitle="회원가입" />
      <div style={{ height: "20px" }} />
      <FullWrapper>
        <ElemetWrapper>
          <div>
            <SmallFont>아이디</SmallFont>
            {/* <RowWrapper> */}
            <InputElement
              type="text"
              placeholder="이메일 입력"
              value={email}
              onChange={handleEmailChange}
              checked={correctCode}
              readOnly={correctCode === 1} // 인증되면 입력 안되게 함
            />
            {/* {correctCode === "" ? (
                <CheckButton
                  onClick={isValid !== false ? handleClick : null}
                  filled={isValid}
                >
                  인증하기
                </CheckButton>
              ) : (
                <img src="/CheckIcon2.png" width="18px" height="18px" />
              )} */}
            {/* </RowWrapper> */}
            {isRedundant === "ok" ? (
              <TinyFont style={{ color: "#01D281" }}>
                사용 가능한 아이디입니다.
              </TinyFont>
            ) : isRedundant === "warning" ? (
              <TinyFont style={{ color: "#FF3F3F" }}>
                중복된 아이디입니다. 다른 아이디를 입력해주세요.
              </TinyFont>
            ) : null}
          </div>
          {authState !== "" && (
            <div>
              <SmallFont>인증코드</SmallFont>
              <RowWrapper>
                <InputElement
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  maxLength={6} // 최대 6자리 입력 제한
                  placeholder="6자리 인증코드를 입력해 주세요"
                  checked={correctCode}
                  readOnly={correctCode === 1} // 인증되면 입력 안되게 함
                />
                <CheckButton
                  onClick={isValidCode && handleCorrectcode}
                  filled={isValidCode}
                  checked={correctCode}
                >
                  확인
                </CheckButton>
              </RowWrapper>
              {correctCode !== "" ? (
                <TinyFont style={{ color: "#01D281" }}>
                  인증코드가 일치해요.
                </TinyFont>
              ) : null}
            </div>
          )}
          <div>
            <SmallFont>비밀번호</SmallFont>
            <RowWrapper style={{ position: "relative" }}>
              <InputElement
                type={showPassword1 ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
                isValid={isValidPassword} // 에러가 없으면 유효
                style={{
                  border:
                    isValidPassword === true
                      ? "1px solid rgba(1, 210, 129, 0.50)" // 조건 모두 만족 시 초록 테두리
                      : isValidPassword === false
                      ? "1px solid rgba(255, 63, 63, 0.50)" // 조건 미달 시 빨간 테두리
                      : "1px solid #EFEFEF", // 기본 테두리
                }}
              />
              <img
                src="/Icon-HidePW.png"
                width="12px"
                style={{
                  zIndex: "1",
                  position: "absolute",
                  right: "18px",
                  top: "18px",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility1}
              />
            </RowWrapper>
            {isValidPassword === false ? (
              <TinyFont style={{ color: "#FF3F3F" }}>{errorMessage}</TinyFont>
            ) : isValidPassword === null ? (
              <TinyFont>
                영문 대소문자와 특수문자를 조합하여 9~16자리까지 가능하며,
                <br />
                특수문자는 ~,@,$,^,*,(,),_,+ 만 사용이 가능해요!
              </TinyFont>
            ) : null}
          </div>
          <div>
            <SmallFont>비밀번호 확인</SmallFont>
            <RowWrapper style={{ position: "relative" }}>
              <InputElement
                type={showPassword2 ? "text" : "password"}
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isValid={isMatch}
                style={{
                  border:
                    isMatch === true
                      ? "1px solid rgba(1, 210, 129, 0.50)" // 조건 모두 만족 시 초록 테두리
                      : isMatch === false
                      ? "1px solid rgba(255, 63, 63, 0.50)" // 조건 미달 시 빨간 테두리
                      : "1px solid #EFEFEF", // 기본 테두리
                }}
              />
              <img
                src="/Icon-HidePW.png"
                width="12px"
                style={{
                  zIndex: "1",
                  position: "absolute",
                  right: "18px",
                  top: "18px",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility2}
              />
            </RowWrapper>
            {isMatch === false ? (
              <TinyFont isValid={false} style={{ color: "#FF3F3F" }}>
                비밀번호가 일치하지 않아요.
              </TinyFont>
            ) : isMatch === true ? (
              <TinyFont isValid={true} style={{ color: "#01D281" }}>
                비밀번호가 일치해요.
              </TinyFont>
            ) : null}
          </div>
          <div>
            <SmallFont>닉네임</SmallFont>
            <RowWrapper>
              <InputElement
                type={"text"}
                placeholder="예) 101동 101호"
                value={nickname}
                onChange={handleNicknameChange}
                isValid={isValidName}
                maxLength={6} // 최대 6자리 입력 제한
                style={{
                  border:
                    isValidName === true
                      ? "1px solid rgba(1, 210, 129, 0.50)" // 조건 모두 만족 시 초록 테두리
                      : isValidName === false
                      ? "1px solid rgba(255, 63, 63, 0.50)" // 조건 미달 시 빨간 테두리
                      : "1px solid #EFEFEF", // 기본 테두리
                }}
              />
            </RowWrapper>
            {message && (
              <TinyFont
                isValid={isValidName}
                style={{ color: isValidName ? "#01D281" : "#FF3F3F" }}
              >
                {message}
              </TinyFont>
            )}
          </div>
        </ElemetWrapper>
      </FullWrapper>
      <div style={{ width: "100%", padding: "0px 25px 40px 20px" }}>
        <PrimaryButton
          state={
            isRedundant === "ok" &&
            isValidPassword &&
            isMatch &&
            isValidName
              ? "active"
              : null
          }
          buttonText="다음"
          onClick={
            isRedundant === "ok" &&
            isValidPassword &&
            isMatch &&
            isValidName
              ? () => navigate("/selectMode", {state: { loginId: email, password: password, username: nickname }})
              : null
          }
        ></PrimaryButton>
      </div>
    </Container>
  );
};

export default SignUpPage;
