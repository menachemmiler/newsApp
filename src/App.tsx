import { useState } from "react";
import "./App.css";
import NavBat from "./components/NavBat";
import TryNews from "./components/TryNews";

function App() {
  //country state
  const [country, setCountry] = useState("il");

  //category state
  const [category, setCategory] = useState("general");

  //to set the api key with state and local storage
  const [apiKey, setApiKey] = useState("ea4293c6a0d12abb7f161d1889f3bc72");
  return (
    <>
      <NavBat
        category={category}
        country={country}
        setCategory={setCategory}
        setCountry={setCountry}
        setKey={setApiKey}
        key={apiKey}
      />
      <div>{country}</div>
      <div>{category}</div>
      <TryNews category={category} country={country} key={apiKey} />
    </>
  );
}

export default App;
