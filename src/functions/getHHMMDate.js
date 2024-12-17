function formatTimeDifference(isoString) {
  const inputDate = new Date(isoString); // 입력된 ISO 형식을 Date 객체로 변환
  const now = new Date(); // 현재 시간

  // 날짜 비교를 위한 오늘과 대상 날짜
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );

  // 날짜 차이 계산
  const diffTime = today - targetDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 시간 포맷
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후"; // 오전/오후 계산
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12; // 12시간제로 변환

  if (diffDays === 0) {
    // 오늘인 경우
    return `오늘\n${period} ${formattedHour}:${minutes}`;
  } else {
    // n일 전인 경우
    return `${diffDays}일 전\n${period} ${formattedHour}:${minutes}`;
  }
}

export default formatTimeDifference;
