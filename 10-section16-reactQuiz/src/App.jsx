import Header from "./Header";
import MainPart from "./MainPart";

export default function App() {
  return (
    <div className="app">
      <Header />

      <MainPart>
        <p>1/15</p>
        <p>Questions?</p>
      </MainPart>
    </div>
  );
}
