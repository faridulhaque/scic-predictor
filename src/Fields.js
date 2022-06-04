import React, { useState } from "react";
import { Alert, Confirm } from "react-st-modal";

const Fields = ({ quantity }) => {
  const forms = parseInt(quantity);

  const [total, setTotal] = useState(0);
  const [increasing, setIncreasing] = useState(0);
  const [lastFivePercentageTotal, setLastFivePercentageTotal] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = parseInt(e.target.asn.value) - 1;
    const sequence = id + 1;
    const mark = parseInt(e.target.mark.value);
    const option = parseInt(e.target.option.value);

    if (mark === "" || isNaN(mark)) {
      await Alert("Don't leave the input field empty", "Error!");
    } else if (mark < 0) {
      await Alert("Please avoid negative numbers as input value", "Error!");
    } else if (option === 0) {
      await Alert(
        "You might have left a field unchosen from the right row",
        "Unchosen field!"
      );
    } else if (mark > option) {
      await Alert(
        "Input value should not be greater than the option value",
        "Go Carefully!"
      );
    } else if (mark < option / 2) {
      await Alert(
        "As you got less than 50% marks in one of your assignments, you are no more eligible for SCIC.",
        "Not eligible"
      );
    } else {
      setTotal(total + mark);
      setIncreasing(increasing + 1);
      if (
        sequence === 12 ||
        sequence === 11 ||
        sequence === 10 ||
        sequence === 9 ||
        sequence === 8
      ) {
        let lastFivePercentage = (mark / option) * 100;

        setLastFivePercentageTotal(
          lastFivePercentageTotal + lastFivePercentage
        );
      }
      document.getElementById("input-" + id).disabled = true;
      document.getElementById("select-" + id).disabled = true;
      document.getElementById("btn-" + id).disabled = true;
    }
  };

  const handlePredict = async () => {
    if (forms !== increasing) {
      await Alert(
        "you have to click all submit buttons to get the result",
        "Error!"
      );
    } else if (forms < 12) {
      if (total / forms >= 50) {
        await Alert(
          "You are on the right track, keep working hard to fulfil your dream",
          "Congratulations!"
        );
      } else if (total / forms < 50) {
        await Alert(
          "Your performance in not impressive. Try your best to improve the situation with your next assignments",
          "Warning!"
        );
      }
    } else if (forms === 12) {
      if (total / forms >= 48) {
        await Alert(`You have been selected for SCIC with ${(total/forms).toFixed(2)} average mark`, "Congratulations!");
      } else if (total / forms <= 45) {
        await Alert(
          `Unfortunately you are not eligible for SCIC as your average mark ${total/forms} is less than 50`,
          "Sorry!"
        );
      } else {
        if (lastFivePercentageTotal / 5 >= 80) {
          Alert(
            `You have have been selected for SCIC under special selection criteria with ${(total/forms).toFixed(2)} average marks on your all assignments and ${(lastFivePercentageTotal/5).toFixed(2)} average percentage of the last five assignments' marks`,
            "congratulations"
          );
        } else {
          await Alert(
            `Unfortunately you are not eligible for SCIC as your average mark ${total/forms} is less than 50`,
            "Sorry!"
          );
        }
      }
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
          * Fill out the input boxes from the left row with your marks you got
          with the examiners' feedback.
        </p>
        <p className="text-center text-danger">
          * Select the deadlines of your assignments' submission days from the
          middle row.
        </p>
        <p className="text-center text-danger">
          * Click all buttons from the right row.
        </p>
        <p className="text-center text-danger">
          * Finally click the 'Predict' button.
        </p>
        <div>
          <h3 className="text-center">Total: {total}</h3>
          <h4 className="text-center">
            Average:{" "}
            {isNaN(total / increasing) ? 0 : (total / increasing).toFixed(2)}
          </h4>
          <h5 className="text-center">Average percentage of last five assignments' marks: {(lastFivePercentageTotal/5).toFixed(2)}</h5>
          {[...Array(forms)].map((form, i) => (
            <div className="form-wrapper" key={i}>
              <form className="my-2 form" onSubmit={handleSubmit}>
                <input
                  className="input-serial"
                  name="asn"
                  value={i + 1}
                  disabled
                />
                <input
                  className="form-control mx-2 w-25"
                  id={"input-" + i}
                  name="mark"
                  type="number"
                />

                <select
                  className="form-select mx-1 w-50"
                  id={"select-" + i}
                  name="option"
                >
                  <option value="0">select</option>
                  <option value="60">60</option>
                  <option value="50">50</option>
                  <option value="30">30</option>
                </select>

                <button
                  className="btn btn-primary mx-1"
                  id={"btn-" + i}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          ))}
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
