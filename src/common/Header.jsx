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
  justify-content: space-between;
`;

const Header = ({ headerTitle }) => {
  const navigate = useNavigate();

  const handleBackPage = () => {
    console.log("이전 창으로 이동");
    navigate(-1);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "61px 24px 0px 24px",
        
      }}
    >
      <RowWrapper style={{ width: "100%" }}>
        <img
          src="/BackButton.png"
          width="8px"
          height="14px"
          style={{ marginLeft: "4px", cursor: "pointer" }}
          onClick={handleBackPage}
        />
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <div></div>
      </RowWrapper>
      <div style={{ width: "100%", height: "20px" }} />
    </div>
  );
};

export default Header;
