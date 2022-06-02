import React, { useState } from "react";
import { Alert, Confirm } from "react-st-modal";

const Fields = ({ quantity, setDisplayField }) => {
  const forms = parseInt(quantity);

  const [mark, setMark] = useState(0);
  const [option, setOption] = useState(0);
  const [total, setTotal] = useState(0);
  const [increasing, setIncreasing] = useState(0);

  let final = total;
  console.log(mark)
  console.log(option)

  const handlePredict = async () => {
    if (forms !== increasing) {
      await Alert(
        "you have to click all submit buttons to get the result",
        "Error!"
      );
    } else if (forms < 12) {
      if (final / forms >= 50) {
        await Alert(
          "You are on the right track, keep working hard to fulfil your dream",
          "congratulations!"
        );
      } else if (final / forms >= 48.5 && final < 50) {
        await Alert(
          "Your average mark is below 50 but there are still some hope to come back!. Work hard with next assignments",
          "warning!"
        );
      } else if (final / forms < 48.5) {
        await Alert(
          "your performance in not impressive. Try your best to improve the situation with your next assignments",
          "Danger!"
        );
      }
    } else if (forms === 12) {
      if (final / forms >= 50) {
        await Alert("You have been selected for SCIC", "congratulations!");
      } else if (final / forms >= 48.5 && final < 50) {
        await Alert(
          "Your total score is below average though you may have a last chance, please contact the moderators to review your position",
          "Warning!"
        );
      } else if (final / forms < 48.5) {
        await Alert(
          "Unfortunately you are not eligible for SCIC as your average mark is low",
          "Sorry!"
        );
      }
    }
  };

  const handleCalculation = async (i) => {
    if(isNaN(mark)){
      return Alert("Don't leave the input field empty")
    }
    if (option ===0) {
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
        `As you have got less than 50% marks in one of your assignments, you have lost your chance to join SCIC`,
        "You are not allowed to SCIC!"
      );
    } else {
      setTotal(total + mark);
      setIncreasing(increasing + 1);
      document.getElementById("select-" + i).style.display = "none";
      document.getElementById("input-" + i).disabled = true;
      document.getElementById("button-" + i).disabled = true;
      setMark(0)
      setOption(0)
      
      
    }
  };
  const handleRefresh = async () => {
    const isConfirm = await Confirm(
      "The page will reload and all action will restart",
      "Are you sure?"
    );

    if (isConfirm) {
      window.location.reload(false);
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-center text-danger my-3">Read carefully</h2>
        <p className="text-center text-danger">
          * Fill out the input boxes in the left row with your marks you got
          with examiners feedback
        </p>
        <p className="text-center text-danger">
          * Select the deadline of your assignment submission day from the
          middle row
        </p>
        <p className="text-center text-danger">
          * Click the button from the right row
        </p>
        <p className="text-center text-danger">
          * Finally click the 'Predict' button
        </p>
        <div>
          <table className="table">
            <thead>
              {}
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Marks</th>
                <th scope="col">Deadline</th>
                <th scope="col">Calculate</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(forms)].map((form, i) => (
                <tr key={i} id={"display-" + i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <input
                      id={"input-" + i}
                      
                      className="form-control w-50"
                      onChange={(e) => setMark(parseInt(e.target.value))}
                      name="mark"
                      type="number"
                    />
                  </td>
                  <td>
                    <select
                      id={"select-" + i}
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setOption(parseInt(e.target.value))}
                      name="option"
                    >
                      <option value="0">Select</option>
                      <option value="60">60</option>
                      <option value="50">50</option>
                      <option value="30">30</option>
                    </select>
                  </td>
                  <td>
                    <button
                      id={"button-" + i}
                      className="btn btn-info text-white"
                      onClick={() => handleCalculation(i)}
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-wrapper">
          <button className="btn btn-success" onClick={handlePredict}>
            predict
          </button>
          <button onClick={handleRefresh} className="btn btn-primary ms-2">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fields;
