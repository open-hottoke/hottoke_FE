// 요일 반환 함수
const getWeekday = (date) => {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return weekdays[date.getDay()];
};

export const transformDate = (dateString) => {
  const date = new Date(dateString);

  return `${date.getMonth() + 1}/${date.getDate()} (${getWeekday(date)})`;
};
