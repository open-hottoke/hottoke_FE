import styled from "styled-components";
import { Container } from "../common/CommonComponents";
import PrimaryButton from "../common/PrimaryButton";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { authToken } from "../store/authToken";
import { useNavigate } from "react-router-dom";
import Logo from "../../public/logo.png";

const ViewContainer = styled(Container)`
  padding: 0px 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ServiceLogo = styled.div`
  margin-top: 160px;
  width: 111px;
  height: 77px;
  background: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #727272;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
`;

const Title = styled.p`
  margin: 54px 0px;
  color: #323232;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
`;

const BtnWrapper = styled.div`
  margin: 30px 0px;
  width: 100%;
`;
const DefaultLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  color: black;

  height: 44px;
  padding: 0px 15px;
  border-radius: 6px;
  border: 1px solid var(--GrayScale-Gray-200, #efefef);
  background: var(--GrayScale-Gray-100, #fafafb);
`;

const PasswordInput = styled.input``;

const LoginBtn = styled(PrimaryButton)`
  margin: 30px 0px;
`;

const SignUpTextBtn = styled.div`
  color: var(--GrayScale-Gray-400, #a8a8a8);
  text-align: center;
  cursor: pointer;
  /* button3 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  padding: 5px;
`;

function SignInPage() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [inputState, setInputState] = useState({ email: "", password: "" });
  const [token, setToken] = useRecoilState(authToken);

  const handleLogin = async (event) => {
    event.preventDefault();

    const enteredId = inputState.email;
    const enteredPassword = inputState.password;

    console.log(enteredId, enteredPassword);

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          loginId: enteredId,
          password: enteredPassword,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("성공: ", res);

      if (res.headers.authorization) {
        setToken(res.headers.authorization);
        console.log("SignIn에서 token값", token);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setToken();
  }, []);

  const isActive =
    inputState.email.length > 0 && inputState.password.length > 0;
  console.log(inputState);
  return (
    <ViewContainer>
      <img
        style={{
          marginTop: 50,
          marginLeft: 15,
          width: 250,
          objectFit: "cover",
        }}
        src={Logo}
      />
      <Title>로그인</Title>
      <DefaultLoginContainer>
        <Input
          type="email"
          autoFocus={true}
          onChange={(e) =>
            setInputState((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="이메일을 입력해주세요."
        />
        <Input
          type="password"
          onChange={(e) =>
            setInputState((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="비밀번호를 입력해주세요."
        />
      </DefaultLoginContainer>
      <BtnWrapper>
        <PrimaryButton
          state={isActive ? "active" : "deactive"}
          onClick={isActive ? handleLogin : null}
          buttonText="로그인하기"
        />
      </BtnWrapper>
      <SignUpTextBtn onClick={() => navigate("/signupPage")}>
        회원가입
      </SignUpTextBtn>
    </ViewContainer>
  );
}

export default SignInPage;
