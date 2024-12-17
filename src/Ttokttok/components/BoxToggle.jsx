import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import ArrowDown from "../assets/arrowDown.png";
import Compliment from "../assets/Tags/Tag_compliment.jpg";
import Noise from "../assets/Tags/Tag_Noise.jpg";
import Quiet from "../assets/Tags/Tag_Quiet.jpg";
import Sleeping from "../assets/Tags/Tag_Sleeping.jpg";

const ToggleContainer = styled.div`
  width: 100%;
  padding: 16px 24px;

  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fafafb;
  overflow: hidden;

  border-radius: 10px;
  border: 1px solid var(--Basic-GrayScale-Gray-200, #efefef);
`;

const ToggleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #f9f9f9;
  font-weight: bold;
  font-size: 18px;

  color: #1f1f1f;
`;

const Arrow = styled.img`
  transition: transform 0.3s ease;
  transform: rotate(${(props) => (props.isOpen ? "180deg" : "0deg")});
  width: 10px;
  object-fit: cover;
`;

const ToggleContentContainer = styled.div`
  overflow: hidden;
  padding: ${(props) => (props.isOpen ? "16px 0px" : "0px 0px")};

  max-height: ${(props) => (props.isOpen ? `400px` : "0px")};
  transition: max-height 0.3s ease, padding 0.5s ease;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const ToggleContent = styled.div`
  padding: 12px 15px;
  background-color: #fff;
  border-radius: 10px;
  border: 1.5px solid #dedede;
  width: 100%;
  color: black;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  ${(props) =>
    props.state
      ? css`
          border: 1.5px solid var(--Color-Primary, #01d281);
        `
      : css``}
`;

const TagImg = styled.img`
  height: 32px;
  object-fit: cover;
`;

const TagTitle = styled.div`
  ${(props) => (props.state ? css`` : css``)}
  height: 32px;

  display: flex;
  align-items: center;
`;

const BoxToggle = ({ floor, handleSelectReceiver, selectedId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef(null);

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ToggleContainer>
      <ToggleHeader onClick={toggleHandler}>
        <span className="h3">{floor}층</span>
        <Arrow
          isOpen={isOpen}
          src={ArrowDown}
          style={{ width: 10, objectFit: "cover" }}
        />
      </ToggleHeader>

      <ToggleContentContainer
        ref={contentRef}
        isOpen={isOpen}
        maxHeight={contentRef.current?.scrollHeight}
      >
        <ToggleContent
          onClick={() => handleSelectReceiver(floor * 100 + 1)}
          state={selectedId === floor * 100 + 1}
        >
          <TagTitle className="body2">{floor}01호</TagTitle>
          <TagImg src={floor % 2 === 1 ? Quiet : Compliment} />
        </ToggleContent>
        <ToggleContent
          onClick={() => handleSelectReceiver(floor * 100 + 2)}
          state={selectedId === floor * 100 + 2}
        >
          <TagTitle className="body2">{floor}02호</TagTitle>
          <TagImg src={Sleeping} />
        </ToggleContent>
        <ToggleContent
          onClick={() => handleSelectReceiver(floor * 100 + 3)}
          state={selectedId === floor * 100 + 3}
        >
          <TagTitle className="body2">{floor}03호</TagTitle>
        </ToggleContent>
        <ToggleContent
          onClick={() => handleSelectReceiver(floor * 100 + 4)}
          state={selectedId === floor * 100 + 4}
        >
          <TagTitle className="body2">{floor}04호</TagTitle>
          <TagImg src={floor % 2 === 1 ? Noise : Sleeping} />
        </ToggleContent>
        <ToggleContent
          onClick={() => handleSelectReceiver(floor * 100 + 5)}
          state={selectedId === floor * 100 + 5}
        >
          <TagTitle className="body2">{floor}05호</TagTitle>
          <TagImg src={floor % 2 === 0 ? Quiet : Compliment} />
        </ToggleContent>
      </ToggleContentContainer>
    </ToggleContainer>
  );
};

export default BoxToggle;
