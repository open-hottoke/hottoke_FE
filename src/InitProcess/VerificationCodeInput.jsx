import { useRef, useState } from "react";

const VerificationCodeInput = ({ onCodeChange }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(null); // 활성화된 칸 추적
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (value !== "" && !/^\d$/.test(value)) return; // 숫자만 입력받음
    const newCode = [...code]; // newCode라는 배열 생성
    newCode[index] = value.slice(-1); // 한 칸에 한 숫자만 받는 중요한 로직!
    setCode(newCode);
    onCodeChange(newCode); // 부모 컴포넌트에 입력값 전달
    // 부모컴포넌트에 의해 지금 onCodeChange는 함수임!

    // 다음 칸으로 포커스 이동
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
    console.log(value, index); // 리렌더링 확인 코드 ㅜㅜ
  };

  const handleKeyDown = (e, index) => {
    // 백스페이스로 이전 칸으로 이동
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleFocus = (index) => {
    setActiveIndex(index);
  };

  const handleBlur = () => {
    setActiveIndex(null); // 포커스 해제 시 활성 상태 초기화
  };

  // 모든 칸이 채워졌는지 확인
  const isCodeComplete = code.every((char) => char !== "");

  // 복붙했을 때 처리(지금은 필요x긴 한데 걍 냅둠)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6); // 최대 6자리
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode([...newCode, ...Array(6 - newCode.length).fill("")]);
      if (newCode.length === 6) inputs.current[5].focus();
    }
  };

  return (
    <div
      onPaste={handlePaste}
      style={{ display: "flex", gap: "6px", margin: "4px 0px 0px 9px" }}
    >
      {code.map((num, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          inputMode="numeric" // 모바일 숫자 키패드 표시
          maxLength="1"
          value={num}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)} // 포커스 이벤트
          onBlur={handleBlur} // 포커스 해제 이벤트
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            flexdirection: "column",
            justifyContent: "center",

            color: "black",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "700",

            textAlign: "center",

            border: "1px solid #DEDEDE",
            borderRadius: "5px",
            backgroundColor: activeIndex === index || num ? "#E5F1EC" : "#fff", // 포커스되었거나 값이 입력되었으면 초록색
            outline: "none",
            transition: "background-color 0.1s ease-in-out", // 부드러운 전환
          }}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
