import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(0);

  const currencyList = ["USD", "INR", "EUR", "GBP", "JPY", "AUD"];

  
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await res.json();
        setRate(data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (rate) {
      setResult((amount * rate).toFixed(2));
    }
  }, [amount, rate]);

  return (
    <div className="container">
      <h1>💱 Currency Converter</h1>

      <div className="converter-box">

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencyList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <h2>➡️</h2>

        {/* To */}
        <div className="input-group">
          <input type="text" value={result} readOnly />

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencyList.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p>
        Exchange Rate: 1 {fromCurrency} = {rate || "..."} {toCurrency}
      </p>
    </div>
  );
};

export default App;