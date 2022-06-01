import React, { createContext, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { Alert } from "react-st-modal";
import Fields from "./Fields";


const Home = () => {
  const [checked, setChecked] = useState(false);
const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(0);
const handleError = (e) => {
    if(e.target.value > 12 || e.target.value < 1){
        setError('Input value must be from 1 to 12');
    }
    else{
        setError('');
    }
}

  const continueProcess = async (e) => {
    await e.preventDefault();

    if (!checked) {
      await Alert(
        "Skipping an assignment has made you ineligible for the SCIC. If you forgot to check the checkbox, try again",
        "it seems that you have skipped one or more of your assignments!"
      );
    } else {
      setQuantity(e.target.asQuantity.value);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={continueProcess}>
          <input onChange={handleError} name="asQuantity" type="number" />
          <br />
          <InputGroup.Checkbox onClick={() => setChecked(!checked)} aria-label="Checkbox for following text input" /> I have
          not skipped any assignments
          {/* <input  type="checkbox" />  */}
          <br />
          <button className="btn btn-primary"disabled={error} type="submit">continue</button>
          
        </form>
        <br />
      </div>
      <div>
            <Fields quantity={quantity}></Fields>
      </div>
      
    </div>
  );
};

export default Home;
