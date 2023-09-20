import logo from "./logo.svg";
import "./App.css";
import InputForm from "./components/InputForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <div className="App">
      <h1>Paste URL for text you want to listen to:</h1>
      <InputForm />
      <SignUpForm />
    </div>
  );
}

export default App;
