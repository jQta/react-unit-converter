import "./Convert.scss";
import heart from "../../assets/icons/heart.svg";
import exchange from "../../assets/icons/exchange.svg";
import { useState } from "react";

export default function Convert() {
  const [numberDistance, setNumberDistance] = useState();
  const [resultsConvert, setResultsConvert] = useState();
  const [measure, setMeasure] = useState();
  const [measureConvert, setMeasureConvert] = useState();
  const [completeConverse, setCompleteConverse] = useState();
  const [saved, setSaved] = useState([]);

  function setConvert(e) {
    if (e.target.value === "1") {
      setResultsConvert(numberDistance * 0.621371);
      setMeasure("km");
      setMeasureConvert("miles");
      setCompleteConverse(numberDistance + " km → " + resultsConvert.toFixed(2) + " miles");
    } else if (e.target.value === "2") {
      setResultsConvert(numberDistance * 1.60934);
      setMeasure("miles");
      setMeasureConvert("km");
      setCompleteConverse(numberDistance + " miles → " + resultsConvert.toFixed(2) + " km");
    } else if (e.target.value === "3") {
      setResultsConvert(numberDistance * 0.3048);
      setMeasure("foot");
      setMeasureConvert("m");
      setCompleteConverse(numberDistance + " foot → " + resultsConvert.toFixed(2) + " m");
    } else if (e.target.value === "4") {
      setResultsConvert(numberDistance * 3.28084);
      setMeasure("m");
      setMeasureConvert("foot");
      setCompleteConverse(numberDistance + " m → " + resultsConvert.toFixed(2) + " foot");
    } else if (e.target.value === "5") {
      setResultsConvert(numberDistance * 0.393701);
      setMeasure("cm");
      setMeasureConvert("inch");
      setCompleteConverse(numberDistance + " cm → " + resultsConvert.toFixed(2) + " inch");
    } else if (e.target.value === "6") {
      setResultsConvert(numberDistance * 2.54);
      setMeasure("inch");
      setMeasureConvert("cm");
      setCompleteConverse(numberDistance + " inch → " + resultsConvert.toFixed(2) + " cm");
    }
  }

  function onDelete(index) {
    const newSaved = [...saved];
    newSaved.splice(index, 1);
    setSaved(newSaved);
  }

  localStorage.setItem("savedConvert", saved);

  return (
    <>
      <div className="b-box">
        <div className="convert-box">
          <h2 className="convert-box__title">convert</h2>
          <div className="convert-panel">
            <div className="convert-panel__row">
              <select className="convert-panel__select" onChange={setConvert}>
                <option value="" defaultValue>
                  Choose here
                </option>
                <option value="1">km → miles</option>
                <option value="2">miles → km</option>
                <option value="3">foot → m</option>
                <option value="4">m → foot</option>
                <option value="5">cm → inch</option>
                <option value="6">inch → cm</option>
              </select>
              <img src={exchange} className="convert-panel__exchange" alt="logo" />
            </div>
            <div className="convert-panel__row">
              <input className="convert-panel__input" onChange={e => setNumberDistance(e.target.value)} />
              <span className="convert-panel__measure">{measure}</span>
            </div>
          </div>
          <div className="convert-outcome">
            <img src={heart} className="convert-outcome__heart" alt="save" onClick={() => setSaved([...saved, completeConverse])} />
            <p className="convert-outcome__result">{resultsConvert && resultsConvert.toFixed(2)}</p>
            <span className="convert-outcome__measure">{measureConvert}</span>
          </div>
        </div>
      </div>
      <div className="saved-box">
        <h3 className="saved-box__title">saved</h3>
        <ul className="saved-box__row">
          {saved.map((item, index) => (
            <li className="saved-box__row--item" key={index}>
              {item}
              <span className="saved-box__delete" onClick={() => onDelete(index)}>
                x
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
