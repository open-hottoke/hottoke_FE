import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderTitle = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: center;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Header = ({ headerTitle }) => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    console.log("이전 창으로 이동");
    navigate(-1);
  };

  return (
    <div>
      <RowWrapper style={{ gap: "133px", margin: "61px 0px 0px 24px" }}>
        <img
          width="8px"
          height="14px"
          src="public/뒤로가기버튼.png"
          onClick={handleBackPage}
          style={{ cursor: "pointer" }}
        />
        <HeaderTitle>{headerTitle}</HeaderTitle>
      </RowWrapper>
      <div style={{ width: "100%", height: "20px" }} />
    </div>
  );
};

export default Header;
