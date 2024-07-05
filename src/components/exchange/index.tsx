import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import { ExchangeRates } from '../../type/commonType';

const Exchange = () => {
  // 환율
  const [rates, setRates] = useState<ExchangeRates>({
    USD: 0,
    JPY: 0,
    CNY: 0,
  });
  const [lastUpdate, setLastUpdate] = useState("");
  // 등락율
  const [changes, setChanges] = useState<ExchangeRates>({
    USD: 0,
    JPY: 0,
    CNY: 0,
  });

  const fetchRates = async (): Promise<{
    currentRates: ExchangeRates;
    previousRates: ExchangeRates;
  }> => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BESERVERURI}/api/exchange-rates/current`
      );
      console.log(response.data);
     
        const currentRates: ExchangeRates = {
          USD: parseFloat((1 / response.data.USD).toFixed(2)),
          JPY: parseFloat(((1 / response.data.JPY)*100).toFixed(2)),
          CNY: parseFloat((1/response.data.CNY).toFixed(2)),
        };


        const previousDayResponse = await axios.get(
          `${process.env.REACT_APP_BESERVERURI}/api/exchange-rates/previous-day`
        );
        console.log(previousDayResponse.data);

        const previousRates: ExchangeRates = {
          USD: parseFloat((1 / previousDayResponse.data.USD).toFixed(2)),
          JPY: parseFloat(((1 / previousDayResponse.data.JPY)*100).toFixed(2)),
          CNY: parseFloat((1/previousDayResponse.data.CNY).toFixed(2)),
        };
  
        return { currentRates, previousRates };
      }
      catch (error) {
        console.error('Error fetching exchange rates:', error);
        return { currentRates: { USD: 0, JPY: 0, CNY: 0 }, previousRates: { USD: 0, JPY: 0, CNY: 0 } };
      }
    };
  
    useEffect(() => {
      const updateRates = async () => {
        const { currentRates, previousRates } = await fetchRates();
  
        setRates(currentRates);
        setLastUpdate(new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }));
  
        const rateChanges: ExchangeRates = {
          USD: parseFloat((currentRates.USD - previousRates.USD).toFixed(2)),
          JPY: parseFloat((currentRates.JPY - previousRates.JPY).toFixed(2)),
          CNY: parseFloat((currentRates.CNY - previousRates.CNY).toFixed(2)),
        };
  
        setChanges(rateChanges); 

      };
  
      updateRates();
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
          <div className="value">{rates.USD}</div>
        </div>
        <div className="rate-item">
          <div className="currency">🇯🇵 JPY</div>
          <div className="value">{rates.JPY}</div>
        </div>
        <div className="rate-item">
          <div className="currency">🇨🇳 CNY</div>
          <div className="value" style={{ marginLeft: '0.7rem' }}>{rates.CNY}</div>
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
