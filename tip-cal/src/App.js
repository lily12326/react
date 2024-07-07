import "./style.css";
import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [per1, setPer1] = useState(0);
  const [per2, setPer2] = useState(0);
  const tip = bill * ((per1 + per2) / 2 / 100);
  function handleReset() {
    setBill("");
    setPer1(0);
    setPer2(0);

  }
  return (
    <div>
      <h1>Tip Calculator</h1>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={per1} onSelect={setPer1}>How did you like the service?</SelectPercentage>
      <SelectPercentage percentage={per2} onSelect={setPer2}>How did your friend like the service?</SelectPercentage>
      {bill > 0 &&
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      }
    </div>
  )
}
function BillInput({ onSetBill, bill }) {
  return (
    <div>
      <label>How much was the Bill</label>
      <input type="text" placeholder="Bill value" value={bill} onChange={(e) => onSetBill(Number(e.target.value))}></input>
    </div>
  )
}
function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select value={percentage} onChange={e => onSelect(Number(e.target.value))}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  )

}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  )

}

function Reset({ onReset }) {
  return (
    <button onClick={onReset}>Reset</button>
  )
}
