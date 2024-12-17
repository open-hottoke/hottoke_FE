import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { authToken } from "../../store/authToken";

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  border-radius: 10px;
  border: 1px solid #efefef;
  background-color: #fafafb;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: scroll;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  border-radius: 10px;
  border: 1px solid #efefef;
  background-color: #fff;

  color: #1f1f1f;
`;

const NoticeItem = ({ author, content, createdAt }) => {
  return (
    <ItemContainer>
      <div
        className="caption1"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
        }}
      >
        <span>{author}</span>
        <span className="caption2" style={{ color: "#9a9a9a" }}>
          {createdAt}
        </span>
      </div>
      <div
        className="body2"
        style={{ textAlign: "left", wordBreak: "keep-all" }}
      >
        {content}
      </div>
    </ItemContainer>
  );
};

const Notice = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);

  const [notice, setNotice] = useState({});
  // 공지사항 api get
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/notice`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("공지 api 결과", res.data);
        setNotice(res.data);
        // setNotice({
        //   1: {
        //     author: "집주인",
        //     content: "한양빌라 관리비 인하 공지",
        //     createdAt: "2024.10.23",
        //   },
        //   2: {
        //     author: "집주인",
        //     content: "한양빌라 관리비 인하 공지",
        //     createdAt: "2024.10.23",
        //   },
        //   3: {
        //     author: "집주인",
        //     content: "한양빌라 관리비 인하 공지",
        //     createdAt: "2024.10.23",
        //   },
        //   4: {
        //     author: "집주인",
        //     content: "한양빌라 관리비 인하 공지",
        //     createdAt: "2024.10.23",
        //   },
        //   5: {
        //     author: "집주인",
        //     content: "한양빌라 관리비 인하 공지",
        //     createdAt: "2024.10.23",
        //   },
        //   6: {
        //     author: "집주인",
        //     content: "한양빌라 관리비 인하 공지",
        //     createdAt: "2024.10.23",
        //   },
        // });
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotice();
  }, []);
  return (
    <Container>
      <div className="body2" style={{ color: "#565656" }}>
        공지사항
      </div>
      <ScrollContainer>
        {Object.entries(notice).map(([id, entry]) => {
          return (
            <NoticeItem
              author={entry.author}
              content={entry.content}
              createdAt={entry.createdAt}
            />
          );
        })}
      </ScrollContainer>
    </Container>
  );
};

export default Notice;
