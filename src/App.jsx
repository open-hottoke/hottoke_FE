import { RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalStyle from "./style/GlobalStyle";
import router from "./Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
