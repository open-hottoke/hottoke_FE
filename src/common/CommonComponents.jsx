import styled from "styled-components";

// 앱웹 사이즈 기본 도화지 : Container
export const Container = styled.div`
  border: 1px solid black;
  height: 100vh;
  width: 390px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// 젤 위에 단계 이미지 묶어주는 div
export const ImageWrapper = styled.div`
  display: flex;
  gap: 182px;
  width: 100%;
  max-width: 390px;
  align-items: center;
`;

// 안내 메세지 : Inform
export const Inform = styled.div`
  padding: 33px 0px 0px 8px;
  margin-bottom: 40px;

  align-self: auto;

  font-family: Pretendard;
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  color: #1f1f1f;
`;

export const InnerContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-self: stretch;

  flex-grow: 1; // 이거 야무짐 컨테이너 끝날때까지 자동으로 쭈욱 늘려줌
`;

export const MiddleFont = styled.div`
  color: var(--GrayScale-Gray-700, #1f1f1f);

  /* H2 */
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 144.444% */
`;

export const SmallFont = styled.div`
  color: var(--GrayScale-Gray-600, #565656);
  text-align: center;

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */

  word-break: keep-all;
`;

export const TinyFont = styled.div`
  color: var(--GrayScale-Gray-700, #9a9a9a);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 163.636% */
`;
