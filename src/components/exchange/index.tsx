import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

const Exchange = () => {
  // 계산된 환율: 미국, 일본, 중국
  const [calExchangeRates, setCalRates] = useState<{
    USD: number;
    JPY: number;
    CNY: number;
  }>({ USD: 0, JPY: 0, CNY: 0 });

  // 환율
  const [rates, setRates] = useState<{ USD: number; JPY: number; CNY: number }>(
    { USD: 0, JPY: 0, CNY: 0 }
  );

  const [lastUpdate, setLastUpdate] = useState("");
  // 등락율
  const [changes, setChanges] = useState<{
    USD: number;
    JPY: number;
    CNY: number;
  }>({ USD: 0, JPY: 0, CNY: 0 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Fetching exchange rates from external API
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/KRW"
        );
        const exchangeRates = {
          USD: response.data.rates.USD,
          JPY: response.data.rates.JPY,
          CNY: response.data.rates.CNY,
        };
        setRates(exchangeRates);

        // 계산된 환율
        const calExchangeRates = {
          USD: parseFloat((1000 / response.data.rates.USD / 1000).toFixed(2)),
          JPY: parseFloat((1000 / response.data.rates.JPY / 10).toFixed(2)),
          CNY: parseFloat((response.data.rates.CNY * 1000).toFixed(2)),
        };

        setCalRates(calExchangeRates);

        // 시간
        setLastUpdate(new Date().toLocaleDateString());

        // TODO: Fetching previous day's rates from backend
        // const previousDayResponse = await axios.get('http://localhost:8080/api/exchange-rates/previous-day');
        // const previousDayRates = previousDayResponse.data;

        // Hardcoded previous day's rates for example

        // const rateChanges = {
        //   USD: parseFloat((exchangeRates.USD - previousDayRates.USD).toFixed(2)),
        //   JPY: parseFloat((exchangeRates.JPY - previousDayRates.JPY).toFixed(2)),
        //   CNY: parseFloat((exchangeRates.CNY - previousDayRates.CNY).toFixed(2)),
        // };

        const previousDayRates = {
          USD: 0.22, // example previous day's rate
          JPY: 0.12, // example previous day's rate
          CNY: 0.15, // example previous day's rate
        };

        const rateChanges = {
          USD: parseFloat(
            (exchangeRates.USD - previousDayRates.USD).toFixed(2)
          ),
          JPY: parseFloat(
            (exchangeRates.JPY - previousDayRates.JPY).toFixed(2)
          ),
          CNY: parseFloat(
            (exchangeRates.CNY - previousDayRates.CNY).toFixed(2)
          ),
        };

        setChanges(rateChanges);

        // Commented out sending exchange rates to Spring Boot backend
        // await axios.post('http://localhost:8080/api/exchange-rates', {
        //   rates: exchangeRates,
        //   lastUpdate: new Date().toISOString(),
        // });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="exchange-rate-container">
      <div className="exchange-rate-header">
        <div className="exchange-title">오늘의 환율</div>
        <div className="exchange-date">기준일: {lastUpdate}</div>
      </div>
      <div className="exchange-rate-values">
        <div className="rate-item">
          <div className="currency">🇺🇸 USD</div>
          <div className="value">{calExchangeRates.USD}</div>
        </div>
        <div className="rate-item">
          <div className="currency">🇯🇵 JPY</div>
          <div className="value">{calExchangeRates.JPY}</div>
        </div>
        <div className="rate-item">
          <div className="currency">🇨🇳 CNY</div>
          <div className="value" style={{ marginLeft: "0.7rem" }}>            {calExchangeRates.CNY}
          </div>
        </div>
      </div>
      <div className="exchange-rate-footer">
        <div className="change-wrapper">
          <div className="change">
            <div>🇺🇸USD</div>
            <div className={`change-value ${changes.USD >= 0 ? "up" : "down"}`}>
              {changes.USD >= 0 ? "▲" + changes.USD : "▼" + changes.USD}
            </div>
          </div>
          <div className="change">
            <span>🇯🇵JPY</span>
            <span
              className={`change-value ${changes.JPY >= 0 ? "up" : "down"}`}
            >
              {changes.JPY >= 0 ? "▲" + changes.JPY : "▼" + changes.JPY}
            </span>
          </div>
          <div className="change">
            <span>🇨🇳CNY</span>
            <span
              className={`change-value ${changes.CNY >= 0 ? "up" : "down"}`}
            >
              {changes.CNY >= 0 ? "▲" + changes.CNY : "▼" + changes.CNY}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
