import "./Convert.scss";
import heart from "../../assets/icons/heart.svg";
import exchange from "../../assets/icons/exchange.svg";
import { useEffect, useState } from "react";

export default function Convert() {
  const [selectValue, setSelectValue] = useState("");
  const [numberDistance, setNumberDistance] = useState("");
  const [resultsConvert, setResultsConvert] = useState("");
  const [measure, setMeasure] = useState();
  const [measureConvert, setMeasureConvert] = useState();
  const [completeConverse, setCompleteConverse] = useState();
  const [saved, setSaved] = useState([]);

  function setConvert() {
    if (numberDistance !== undefined) {
      if (selectValue === "1") {
        setResultsConvert(numberDistance * 0.621371);
        setMeasure("km");
        setMeasureConvert("miles");
      } else if (selectValue === "2") {
        setResultsConvert(numberDistance * 1.60934);
        setMeasure("miles");
        setMeasureConvert("km");
      } else if (selectValue === "3") {
        setResultsConvert(numberDistance * 0.3048);
        setMeasure("foot");
        setMeasureConvert("m");
      } else if (selectValue === "4") {
        setResultsConvert(numberDistance * 3.28084);
        setMeasure("m");
        setMeasureConvert("foot");
      } else if (selectValue === "5") {
        setResultsConvert(numberDistance * 0.393701);
        setMeasure("cm");
        setMeasureConvert("inch");
      } else if (selectValue === "6") {
        setResultsConvert(numberDistance * 2.54);
        setMeasure("inch");
        setMeasureConvert("cm");
      }
    }
  }

  function setExchange() {
    if (selectValue === "1") {
      setSelectValue("2");
      setResultsConvert(numberDistance);
      setNumberDistance((numberDistance * 0.621371).toFixed(2));
    } else if (selectValue === "2") {
      setSelectValue("1");
      setResultsConvert(numberDistance);
      setNumberDistance(Number(resultsConvert).toFixed(2));
    } else if (selectValue === "3") {
      setSelectValue("4");
      setResultsConvert(numberDistance);
      setNumberDistance((numberDistance * 0.3048).toFixed(2));
    } else if (selectValue === "4") {
      setSelectValue("3");
      setResultsConvert(numberDistance);
      setNumberDistance(Number(resultsConvert).toFixed(2));
    } else if (selectValue === "5") {
      setSelectValue("6");
      setResultsConvert(numberDistance);
      setNumberDistance((numberDistance * 0.393701).toFixed(2));
    } else if (selectValue === "6") {
      setSelectValue("5");
      setResultsConvert(numberDistance);
      setNumberDistance(Number(resultsConvert).toFixed(2));
    }
  }

  useEffect(() => {
    setConvert();
  });

  useEffect(() => {
    if (measure === "km" && measureConvert === "miles") {
      setCompleteConverse(numberDistance + " km → " + Number(resultsConvert).toFixed(2) + " miles");
    } else if (measure === "miles" && measureConvert === "km") {
      setCompleteConverse(numberDistance + " miles → " + Number(resultsConvert).toFixed(2) + " km");
    } else if (measure === "foot" && measureConvert === "m") {
      setCompleteConverse(numberDistance + " foot → " + Number(resultsConvert).toFixed(2) + " m");
    } else if (measure === "m" && measureConvert === "foot") {
      setCompleteConverse(numberDistance + " m → " + Number(resultsConvert).toFixed(2) + " foot");
    } else if (measure === "cm" && measureConvert === "inch") {
      setCompleteConverse(numberDistance + " cm → " + Number(resultsConvert).toFixed(2) + " inch");
    } else if (measure === "inch" && measureConvert === "cm") {
      setCompleteConverse(numberDistance + " inch → " + Number(resultsConvert).toFixed(2) + " cm");
    }
  }, [numberDistance, measure, measureConvert, resultsConvert]);

  useEffect(() => {
    localStorage.setItem("Saved_Converts", JSON.stringify(saved));
  }, [saved]);

  const savedList = JSON.parse(localStorage.getItem("Saved_Converts"));

  useEffect(() => {
    if (savedList) setSaved(savedList);
    // eslint-disable-next-line
  }, []);

  const onDelete = index => {
    const newSaved = [...saved];
    newSaved.splice(index, 1);
    setSaved(newSaved);
  };

  const preventMinus = e => {
    if (e.code === "Minus" || e.code === "NumpadSubtract" || e.code === "AltLeft") {
      e.preventDefault();
    }
  };

  const handleSelect = e => {
    setSelectValue(e.target.value);
  };

  return (
    <>
      <div className="b-box">
        <div className="convert-box">
          <h2 className="convert-box__title">convert</h2>
          <div className="convert-panel">
            <div className="convert-panel__row">
              <select className="convert-panel__select" value={selectValue} onChange={handleSelect}>
                <option value="0" defaultValue>
                  Choose here
                </option>
                <option value="1">km → miles</option>
                <option value="2">miles → km</option>
                <option value="3">foot → m</option>
                <option value="4">m → foot</option>
                <option value="5">cm → inch</option>
                <option value="6">inch → cm</option>
              </select>
              <img src={exchange} className="convert-panel__exchange" alt="exchange" onClick={setExchange} />
            </div>
            <div className="convert-panel__row">
              <input
                className="convert-panel__input"
                value={numberDistance}
                type="number"
                onKeyPress={preventMinus}
                onChange={e => setNumberDistance(e.target.value)}
              />
              <span className="convert-panel__measure">{measure}</span>
            </div>
          </div>
          <div className="convert-outcome">
            <img
              src={heart}
              className="convert-outcome__heart"
              alt="save"
              onClick={() => {
                setSaved([...saved, completeConverse]);
                setNumberDistance(() => "");
                setResultsConvert(() => "");
              }}
            />
            <span className="convert-outcome__result">{resultsConvert && Number(resultsConvert).toFixed(2)}</span>
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
