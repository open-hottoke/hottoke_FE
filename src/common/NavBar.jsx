import { React, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeIcn from "../assets/navBar/home_active.svg?react";
import OffHomeIcn from "../assets/navBar/home_disabled.svg?react";

import TtokttokIcn from "../assets/navBar/ttokttok_active.svg?react";
import OffTtokttokIcn from "../assets/navBar/ttokttok_disabled.svg?react";

import TtokttakIcn from "../assets/navBar/ttokttak_active.svg?react";
import OffTtokttakIcn from "../assets/navBar/ttokttak_disabled.svg?react";

import MyIcn from "../assets/navBar/my_active.svg?react";
import OffMyIcn from "../assets/navBar/my_disabled.svg?react";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;

  // 아이폰 하단바 제외함 일단
  padding: 0.88rem 0rem 0.82rem 0rem;
  margin-left: auto;
  margin-right: auto;

  /* 임시로 보더 추가 */
  border-right: 1px solid black;
  border-left: 1px solid black;

  width: 390px;
  margin: 0 auto;
`;

const IconTxtWrapper = styled.div`
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
  align-items: center;
`;

// SVG 파일을 한번 더 감싸주어 크기를 픽스함
const IconWrapper = styled.div`
  width: 25px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  ${(props) =>
    props.state === true
      ? css`
          color: #323232;
        `
      : css`
          // 피그마에는 없지만 글씨 색 비활성화도 일단
          color: #989ba2;
        `}

  text-align: center;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 150% */
`;

const NavLink = styled.div`
  float: left;
  width: 25%; // 그냥 4등분함ㅎ
  text-align: center;

  line-height: 50px;
`;

const NavBar = () => {
  const [activeNav, setActiveNav] = useState(1); // 초기 상태: 홈
  const location = useLocation(); // 현재 주소를 참조함

  useEffect(() => {
    if (location.pathname.startsWith("/ttokttok")) {
      setActiveNav(2);
    } else if (location.pathname.startsWith("/repairPage")) {
      setActiveNav(3);
    } else if (location.pathname.startsWith("/myPage")) {
      setActiveNav(4);
    } else if (location.pathname.startsWith("/main")) {
      setActiveNav(1);
    }
  }, [location]);

  return (
    <Container>
      <Link to="/main" className="nav-link">
        <NavLink
          className={
            location.pathname === "/main"
              ? "nav-item active-nav-item"
              : "nav-item"
          }
        >
          <IconTxtWrapper>
            <IconWrapper>
              {activeNav === 1 ? (
                <HomeIcn></HomeIcn>
              ) : (
                <OffHomeIcn></OffHomeIcn>
              )}
            </IconWrapper>
            <Text state={activeNav === 1}>홈</Text>
          </IconTxtWrapper>
        </NavLink>
      </Link>
      <Link to="/ttokttok" className="nav-link">
        <NavLink
          className={
            location.pathname === "/ttokttok"
              ? "nav-item active-nav-item"
              : "nav-item"
          }
        >
          <IconTxtWrapper>
            <IconWrapper>
              {activeNav === 2 ? (
                <TtokttokIcn></TtokttokIcn>
              ) : (
                <OffTtokttokIcn></OffTtokttokIcn>
              )}
            </IconWrapper>

            <Text state={activeNav === 2}>똑똑</Text>
          </IconTxtWrapper>
        </NavLink>
      </Link>
      <Link to="/repairPage" className="nav-link">
        <NavLink
          className={
            location.pathname === "/repairPage"
              ? "nav-item active-nav-item"
              : "nav-item"
          }
        >
          <IconTxtWrapper>
            <IconWrapper>
              {activeNav === 3 ? (
                <TtokttakIcn></TtokttakIcn>
              ) : (
                <OffTtokttakIcn></OffTtokttakIcn>
              )}
            </IconWrapper>
            <Text state={activeNav === 3}>똑딱</Text>
          </IconTxtWrapper>
        </NavLink>
      </Link>
      <Link to="/myPage" className="nav-link">
        <NavLink
          className={
            location.pathname === "/myPage"
              ? "nav-item active-nav-item"
              : "nav-item"
          }
        >
          <IconTxtWrapper>
            <IconWrapper>
              {activeNav === 4 ? <MyIcn></MyIcn> : <OffMyIcn></OffMyIcn>}
            </IconWrapper>

            <Text state={activeNav === 4}>마이</Text>
          </IconTxtWrapper>
        </NavLink>
      </Link>
    </Container>
  );
};

export default NavBar;
