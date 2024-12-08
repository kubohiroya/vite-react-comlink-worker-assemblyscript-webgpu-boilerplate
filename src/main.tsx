import { createRoot } from "react-dom/client";
import BenchmarkApp from "./benchmark/BenchmarkApp";

const root = createRoot(document.getElementById("root") as HTMLElement);

const render = () => {
  root.render(<BenchmarkApp />);
};

render();
