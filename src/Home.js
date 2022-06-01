import React, { useState } from "react";

import { Alert } from "react-st-modal";
import Fields from "./Fields";
import './Style.css';

const Home = () => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [displayField, setDisplayField] = useState(false);
  const handleError = (e) => {
    if (e.target.value > 12 || e.target.value < 1) {
      setError("Input value must be from 1 to 12");
    } else {
      setError("");
    }
  };

  const continueProcess = async (e) => {
    await e.preventDefault();

    if (!checked) {
      await Alert(
        "Skipping an assignment has made you ineligible for the SCIC. If you forgot to check the checkbox, try again",
        "it seems that you have skipped one or more of your assignments!"
      );
    } else {
      setQuantity(e.target.asQuantity.value);
      setDisplayField(true);
    }
  };

  return (
    <div>
      <h2 className="text-center text-info mt-5 mb-3">SCIC Predictor</h2>
      <div className="form-wrapper">
        <form onSubmit={continueProcess}>
          <input className="form-control" onChange={handleError} name="asQuantity" type="number" />
          {
            error && <small className="text-danger my-1">{error}</small>
          }
          <br />
          <input
            type="checkbox"
            onClick={() => setChecked(!checked)}
            aria-label="Checkbox for following text input"
          />{" "}
          
          <span>I have not skipped any assignments</span>
          {/* <input  type="checkbox" />  */}
          <br />
          <button className="btn btn-info mt-3" disabled={error} type="submit">
            continue
          </button>
        </form>
        <br />
      </div>
      <div className={!displayField ? 'd-none' : 'd-block container'}>
        <Fields quantity={quantity} setDisplayField={setDisplayField}></Fields>
      </div>
      <p className="text-center text-info mt-5">Copyright: Faridul Haque Murshed</p>
    </div>
  );
};

export default Home;
