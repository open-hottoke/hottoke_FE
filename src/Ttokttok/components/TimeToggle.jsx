import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Styled Components
const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px 4px; /* 교차축은 16px, 주축은 8px */
`;

const HourWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1px; /* 30분 블록 사이의 간격 */
`;

const BlockRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1px; /* 30분 블록 간 간격 */
`;

const TimeBlock = styled.div`
  flex: 1;
  height: 28.8px;
  width: 11.7px;
  text-align: center;
  background-color: ${(props) =>
    props.active ? "#01D281" : "rgba(1, 210, 129, 0.3)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${(props) => (props.active ? "white" : "#333")};
  transition: background-color 0.2s ease;

  border-radius: 2.533px;

  &:hover {
    background-color: ${(props) =>
      props.active ? "#01D281" : "rgba(1, 210, 129, 0.3)"};
  }
`;

const TimeLabel = styled.div`
  color: #555;
  margin-top: 4px; /* 시간 라벨 위 여백 */
  user-select: none;

  color: var(--Basic-GrayScale-Gray-600, #565656);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 180% */
`;

const TimeToggle = ({ setTimeArray }) => {
  const [activeBlocks, setActiveBlocks] = useState(Array(48).fill(false));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [toggleState, setToggleState] = useState(false);

  const toggleBlock = (index, state) => {
    setActiveBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[index] = state;
      setTimeArray(newBlocks); // 수정할 데이터를 바로 함수로 전달
      return newBlocks;
    });
  };

  const handleMouseDown = (index) => {
    setIsMouseDown(true);
    setToggleState(!activeBlocks[index]);
    toggleBlock(index, !activeBlocks[index]);
  };

  const handleMouseEnter = (index) => {
    if (isMouseDown) {
      toggleBlock(index, toggleState);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <TimeGrid
      onMouseLeave={() => setIsMouseDown(false)}
      onMouseUp={handleMouseUp}
    >
      {Array.from({ length: 24 }).map((_, hour) => (
        <HourWrapper key={hour}>
          {/* 1시간 동안 2개의 30분 블록 */}
          <BlockRow>
            {Array.from({ length: 2 }).map((_, half) => {
              const index = hour * 2 + half;
              return (
                <TimeBlock
                  key={index}
                  active={activeBlocks[index]}
                  onMouseDown={() => handleMouseDown(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                ></TimeBlock>
              );
            })}
          </BlockRow>
          {/* 시간 라벨 */}
          <TimeLabel>{`${hour}시`}</TimeLabel>
        </HourWrapper>
      ))}
    </TimeGrid>
  );
};

export default TimeToggle;
