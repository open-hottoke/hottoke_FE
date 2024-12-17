import { Container } from "../../common/CommonComponents";
import NavBar from "../../common/NavBar";

const My_Page = () => {
  return (
    <Container className="MyPage">
      <div style={{ flex: 1, color: "black" }}>임시 마이페이지</div>
      <NavBar />
    </Container>
  );
};

export default My_Page;
