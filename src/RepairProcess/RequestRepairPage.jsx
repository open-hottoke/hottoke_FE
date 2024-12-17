import { useState } from "react";
import WriteRequest from "./WriteRequest";
import SummaryRequest from "./SummaryRequest";

const RequestRepairPage = () => {
  const [page, setPage] = useState("request"); // 현재 페이지 상태
  const [formData, setFormData] = useState({
    category: "",
    request_image: [],
    request_description: "",
    construction_date: {},
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);

  console.log(formData);

  const handleComplete = (data) => {
    setFormData(data); // 입력받은 데이터를 저장
    setPage("summary"); // 요약 페이지로 이동
  };

  const correctData = () => {
    setPage("request");
    setFormData(formData);
  }

  return (
    <div>
      {page === "request" ? (
        <WriteRequest onComplete={handleComplete} formData={formData} previewPhotos={previewPhotos} setPreviewPhotos={setPreviewPhotos}/>
      ) : (
        <SummaryRequest formData={formData} onCorrect={() => setPage("request")} previewPhotos={previewPhotos}/>
      )}
    </div>
  );
};

export default RequestRepairPage;
