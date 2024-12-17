import { RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalStyle from "./style/GlobalStyle";
import router from "./Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
