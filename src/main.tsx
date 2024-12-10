import { createRoot } from "react-dom/client";
import App from "./benchmark/app";

const root = createRoot(document.getElementById("root") as HTMLElement);

const render = () => {
  root.render(<App />);
};

render();
