import styled from "styled-components";
import { Container, SmallFont } from "../common/CommonComponents";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import axios from "axios";
import { authToken } from "../store/authToken";
import { useRecoilValue } from "recoil";
import checkedBtnImg from "../assets/checkedBtnImg.png";
import uncheckedBtnImg from "../assets/uncheckedBtnImg.png";
import { transformDate } from "../functions/transformDate";

const ViewContainer = styled(Container)`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Title = styled.div`
  color: var(--GrayScale-Gray-800, #1f1f1f);
  text-align: left;

  /* H3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const WhiteBox = styled.div`
  display: flex;
  padding: 30px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  background: var(--Basic-White, #fff);
`;

const SelectElementBox = styled.div`
  display: flex;
  align-items: center;
  gap: 58px;
  align-self: stretch;
`;

// 1. 분야 선택 관련 컴포넌트
const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열로 정렬 */
  gap: 10px 20px;
`;

const OptionButton = styled.div`
  display: flex;
  align-items: center;
  width: 96px;
  gap: 8px;
  padding: 0px;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  color: var(--GrayScale-Gray-800, #1f1f1f);
  line-height: 20px; /* 142.857% */
`;

const CheckBtnImg = styled.img`
  width: 22px;
  height: 22px;
`;

// 2. 사진 첨부 관련 컴포넌트
const PhotoUploadBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  overflow: auto;
`;

const PhotoBox = styled.div`
  width: 80px;
  height: 80px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #f9f9f9;
`;

const PhotoPreview = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
`;

// 3. 증상 설명 관련 컴포넌트
const DescriptionBox = styled.textarea`
  display: flex;
  padding: 13px 15px;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;

  outline: none;

  color: var(--GrayScale-Gray-800, #1f1f1f);

  /* Caption1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */

  border-radius: 6px;
  border: 1px solid var(--GrayScale-Gray-200, #efefef);
  background: var(--GrayScale-Gray-100, #fafafb);
`;

const CharacterCount = styled.div`
  font-size: 12px;
  color: gray;
  text-align: right;
`;

// 4. 시간 선택 관련 컴포넌트

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2.75px;
`;

const TimeSlot = styled.div`
  width: 26px;
  height: 32px;

  background-color: ${(props) => (props.selected ? "#01D281" : "#EAF6F5")};

  text-align: center;
  border-radius: 2.533px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? "#148F77" : "#D3EDEE")};
  }
`;

const TimeSlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeText = styled.div`
  color: var(--GrayScale-Gray-600, #565656);
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  text-align: left;
  color: ${(props) => (props.selected ? "#01D281" : "#000")};
`;

// 오늘부터 7일까지의 날짜 배열 생성
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    dates.push(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    );
    // `${new Date.getMonth() + 1}/${new Date.getDate()} (${getWeekday(new Date)})`
  }
  return dates;
};

// const transformDate = (dateString) => {
//   const date = new Date(dateString);

//   return `${date.getMonth() + 1}/${date.getDate()} (${getWeekday(date)})`
// }

const options = ["가전", "문/창문", "수도/보일러", "전기/조명", "기타"];

const times = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];
const BASE_URL = import.meta.env.VITE_BASE_URL;

const WriteRequest = ({
  onComplete,
  formData,
  previewPhotos,
  setPreviewPhotos,
}) => {
  const token = useRecoilValue(authToken);

  useEffect(() => {
    if (
      formData.category &&
      formData.request_image.length > 0 &&
      formData.request_description &&
      formData.construction_date
    ) {
      setSelectedOption(formData.category);
      setPhotos(formData.request_image);
      setDescription(formData.request_description);
      setSelectedTimes(formData.construction_date);
    }
  }, []);

  // 1. 분야 선택 관련
  const [selectedOption, setSelectedOption] = useState("");

  // 2. 사진 첨부 관련
  const [photos, setPhotos] = useState([]);

  const convertToJpeg = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // 캔버스 크기를 이미지 크기로 설정
          canvas.width = img.width;
          canvas.height = img.height;

          // 이미지 캔버스에 그리기
          ctx.drawImage(img, 0, 0);

          // JPEG Blob 생성
          canvas.toBlob(
            (blob) => {
              // Blob을 File 객체로 변환
              const jpegFile = new File(
                [blob],
                `${file.name.split(".")[0]}.jpg`,
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );
              resolve(jpegFile);
            },
            "image/jpeg",
            0.9 // JPEG 품질 (0.0 ~ 1.0)
          );
        };

        img.onerror = reject;
        img.src = event.target.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const jpegFiles = await Promise.all(
      files.map((file) => convertToJpeg(file))
    );
    const newPhotos = jpegFiles.map((item) => item.name);
    const photoPreviews = jpegFiles.map(
      (file) => URL.createObjectURL(file) // Blob URL 생성
    );

    setPreviewPhotos((prev) => [...prev, ...photoPreviews].slice(0, 10));
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 10)); // 최대 10장 제한
  };
  console.log("newPhotos: ", photos);
  // 3. 증상 설명 관련
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= 300) {
      setDescription(text);
    }
  };

  // 4. 시간 선택 관련
  const [selectedTimes, setSelectedTimes] = useState([]); // 날짜별 선택 상태
  const dates = generateDates("serverParam"); // 동적으로 날짜 생성

  const toggleTime = (date, time) => {
    setSelectedTimes((prev) => {
      // 기존 날짜의 시간 배열을 찾음
      const dateEntry = prev.find((entry) => entry.date === date);

      if (dateEntry) {
        // 날짜가 이미 존재하면 해당 날짜의 시간 배열 수정
        const isSelected = dateEntry.times.includes(time);
        const updatedTimes = isSelected
          ? dateEntry.times.filter((t) => t !== time) // 선택 해제
          : [...dateEntry.times, time]; // 선택 추가

        return updatedTimes.length > 0
          ? prev.map((entry) =>
              entry.date === date ? { ...entry, times: updatedTimes } : entry
            )
          : prev.filter((entry) => entry.date !== date); // 시간 배열이 비었으면 삭제
      } else {
        // 날짜가 존재하지 않으면 새로 추가
        return [...prev, { date, times: [time] }];
      }
    });
  };

  const moveToSummary = () => {
    const data = {
      category: selectedOption,
      request_image: photos,
      request_description: description,
      construction_date: selectedTimes,
    };
    console.log(data);
    onComplete(data);
  };

  return (
    <ViewContainer className="MainProcess" style={{ overflow: "auto" }}>
      <div style={{ backgroundColor: "white", width: "100%" }}>
        <Header headerTitle="수리요청서 작성" />
      </div>
      <div style={{ width: "100%", height: "6px" }} />
      <WhiteBox>
        <div>
          <Title>어떤 분야의 견적을 받고 싶으신가요?</Title>
          <SmallFont style={{ textAlign: "left" }}>
            한 가지 항목을 선택해 주세요!
          </SmallFont>
        </div>
        <SelectElementBox>
          <ButtonGrid>
            {options.map((option) => (
              <OptionButton
                key={option}
                selected={selectedOption === option}
                onClick={() => setSelectedOption(option)}
              >
                <CheckBtnImg
                  src={
                    selectedOption === option ? checkedBtnImg : uncheckedBtnImg
                  }
                  alt="체크 여부"
                />
                {option}
              </OptionButton>
            ))}
          </ButtonGrid>
        </SelectElementBox>
      </WhiteBox>
      <div style={{ width: "100%", height: "6px" }} />

      <WhiteBox style={{ gap: "17px" }}>
        <div>
          <Title>증상 및 불편한 점을 알려주세요.</Title>
          <SmallFont style={{ textAlign: "left" }}>
            상세하게 적으면 더 정확한 견적을 받아볼 수 있어요!
          </SmallFont>
        </div>

        <div style={{ width: "100%" }}>
          <SmallFont style={{ textAlign: "left" }}>증상 사진</SmallFont>
          <PhotoUploadBox style={{ marginTop: "6px" }}>
            {previewPhotos.map((photo, index) => (
              <PhotoPreview
                key={index}
                src={photo}
                alt={`Uploaded ${index + 1}`}
              />
            ))}
            {photos.length < 10 && (
              <PhotoBox>
                <label style={{ cursor: "pointer" }}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{
                      display: "none",
                      alignItems: "center",
                      alignSelf: "stetch",
                    }}
                    onChange={handlePhotoUpload}
                  />

                  <div>
                    <img src="/CameraIcon.png" style={{ width: "20px" }} />
                    <SmallFont>사진 {photos.length}/10</SmallFont>
                  </div>
                </label>
              </PhotoBox>
            )}
          </PhotoUploadBox>
        </div>

        <div style={{ width: "100%" }}>
          <SmallFont style={{ textAlign: "left" }}>증상 설명</SmallFont>
          <DescriptionBox
            value={description}
            onChange={handleDescriptionChange}
            placeholder="증상에 대한 설명을 상세하게 적어주세요."
            style={{ marginTop: "6px" }}
          />
          <CharacterCount>{description.length}/300</CharacterCount>
        </div>
      </WhiteBox>
      <div style={{ width: "100%", height: "6px" }} />

      <WhiteBox>
        <div>
          <Title>원하는 날짜와 시간을 선택해주세요.</Title>
          <SmallFont style={{ textAlign: "left" }}>
            오늘부터 7일까지의 가능한 시간을 터치해주세요.
          </SmallFont>
        </div>
        <div>
          <Title style={{ fontSize: "12px" }}>오늘</Title>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {dates.map((date) => (
              <div key={date}>
                <SmallFont style={{ textAlign: "left", color: "#1F1F1F" }}>
                  {transformDate(date)}
                </SmallFont>
                <TimeGrid>
                  {times.map((time, index) => (
                    <TimeSlotContainer key={time}>
                      <TimeSlot
                        selected={selectedTimes
                          .find((entry) => entry.date === date)
                          ?.times.includes(time)}
                        onClick={() => toggleTime(date, time)}
                      />
                      <TimeText selected={selectedTimes[date]?.includes(time)}>
                        {time}
                      </TimeText>
                    </TimeSlotContainer>
                  ))}
                </TimeGrid>
              </div>
            ))}
          </div>
        </div>
      </WhiteBox>
      <div style={{ width: "100%", height: "6px" }} />

      <WhiteBox>
        <PrimaryButton
          state={
            selectedOption.length > 0 && // 분야가 선택됨
            photos.length > 0 && // 사진이 업로드됨
            description.length > 0 // 증상이 입력됨
              ? "active"
              : null
          }
          onClick={
            selectedOption.length > 0 && // 분야가 선택됨
            photos.length > 0 && // 사진이 업로드됨
            description.length > 0 // 증상이 입력됨
              ? moveToSummary
              : null
          }
          buttonText="완료하기"
        ></PrimaryButton>
      </WhiteBox>
    </ViewContainer>
  );
};

export default WriteRequest;
