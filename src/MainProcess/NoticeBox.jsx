import styled from "styled-components";
import { SmallFont } from "../common/CommonComponents";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authToken } from "../store/authToken";
import { useEffect, useState } from "react";
import isoToFormattedDate from "../functions/isoToFormattedDate";

const NoticeTitle = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 137.5% */
`;

const BoxDesign = styled.div`
  width: 350px;

  margin: 10px 20px 0px 20px;
  padding: 16px 14px 12px 14px;

  border-radius: 10px;
  background: var(--Basic-White, #fff);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  z-index: 1;
`;

const Date = styled.div`
  color: var(--GrayScale-Gray-400, #a8a8a8);

  /* Caption2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 163.636% */
`;

const RowGroupWrapper = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  gap: 5px;
`;

const NoticeBox = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = useRecoilValue(authToken);
  const [notice, setNotice] = useState([]);

  // notice가 항상 3개 이상 있다고 가정하고 메인에서 공지를 띄움
  const fetchNotice = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notice`, {
        headers: {
          Authorization: token,
        },
      });
      const resArray = Object.entries(res.data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      setNotice(resArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);

  if (notice.length > 0)
    return (
      <BoxDesign>
        <RowGroupWrapper>
          <NoticeTitle>공지사항</NoticeTitle>
          <img
            src="/DetailButton.png"
            width="4px"
            height="7px"
            style={{ marginBottom: "7.5px" }}
          />
        </RowGroupWrapper>
        <div style={{ width: "100%", height: "12px" }} />
        <RowGroupWrapper>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <SmallFont style={{ textAlign: "left" }}>
              {notice[0].content}
            </SmallFont>
            <img
              src="/FixedPin.png"
              alt="고정핀"
              width="8px"
              height="11.385px"
            />
          </div>
          <Date>{isoToFormattedDate(notice[0].createdAt)}</Date>
        </RowGroupWrapper>
        <hr style={{ background: "#EFEFEF", opacity: "0.5" }} />
        <RowGroupWrapper>
          <SmallFont style={{ textAlign: "left" }}>
            {notice[1].content}
          </SmallFont>
          <Date>{isoToFormattedDate(notice[1].createdAt)}</Date>
        </RowGroupWrapper>
        <RowGroupWrapper>
          <SmallFont style={{ textAlign: "left" }}>
            {notice[2].content}
          </SmallFont>
          <Date>{isoToFormattedDate(notice[2].createdAt)}</Date>
        </RowGroupWrapper>
      </BoxDesign>
    );
};

export default NoticeBox;
