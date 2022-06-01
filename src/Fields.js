import React, { useContext, useState } from "react";
import { Alert } from "react-st-modal";

const Fields = ({ quantity }) => {
  const forms = parseInt(quantity);

  const [mark, setMark] = useState(0);
  const [option, setOption] = useState(0);
  const [total, setTotal] = useState(0);
  let final = total/forms;

  const handlePredict = async () => {
    
    if (final >= 50) {
      await Alert(
        "You are on the right track, keep working hard to fulfil your dream",
        "congratulations!"
      );
    } else if (final >= 48.5 && final < 50) {
      await Alert(
        "You are in the danger zone",
        "try your best to improve your performance"
      );
    } else if (final < 48.5) {
      await Alert(
        "Unfortunately you are not eligible for SCIC as your average mark is low",
        "We are sorry!"
      );
    }
  };

  const handleCalculation = async (i) => {
    if (isNaN(mark)) {
      await Alert(
        "Please don't leave the input value empty",
        "Blank input field detected"
      );
    } else if (option === 0) {
      await Alert(
        "You might have left a field unchosen from the right row",
        "Unchosen field!"
      );
    } else if (mark > option) {
      await Alert(
        "Input value should not be greater than option value",
        "Go Carefully!"
      );
    } else if (mark < 0) {
      await Alert("Please avoid negative numbers as input value");
    } else if (mark < option / 2) {
      await Alert(
        "As you have got less than 50% marks in one of your assignments you have lost your chance to join SCIC",
        "You are not allowed to SCIC!"
      );
    } else {
      setTotal(total + mark);
      document.getElementById('display-'+i).style.display = 'none';
    }
  };

  return (
    <div>
      <div>
        <p>read carefully</p>
        {[...Array(forms)].map((form, i) => (
          
          <div key={i} id={'display-'+i}>
            <span>{i+1}</span>
            <input
              onChange={(e) => setMark(parseInt(e.target.value))}
              name="mark"
              type="number"
            />
            <br />
            <select
              onChange={(e) => setOption(parseInt(e.target.value))}
              name="option"
            >
              <option value="0">Select</option>
              <option value="60">60</option>
              <option value="50">50</option>
              <option value="30">30</option>
            </select>
            <button onClick={()=>handleCalculation(i)}>done</button>
          </div>
        ))}
        <div>
          <button onClick={handlePredict}>predict</button>
        </div>
      </div>
      <button className="btn">Button</button>
    </div>
  );
};

export default Fields;
