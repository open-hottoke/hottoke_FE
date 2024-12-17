export default function returnKoreaDate() {
  // 현재 시간 (UTC)
  const now = new Date();

  // KST (UTC+9) 오프셋 적용
  const kstOffset = 9 * 60 * 60 * 1000; // UTC+9 (밀리초 단위)
  const kstTime = new Date(now.getTime() + kstOffset);

  // ISO 형식으로 변환
  return kstTime.toISOString();
}
