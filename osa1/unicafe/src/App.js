import React, { useState } from "react";

const Button = ({ text, onButtonClickHandler }) => {
  return (
    <button style={{ margin: "5px" }} onClick={onButtonClickHandler}>
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const statSum = good + neutral + bad;
  return (
    <div>
      {statSum ? (
        <div>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={statSum} />
              <StatisticLine text="average" value={(good - bad) / statSum} />
              <StatisticLine text="positive" value={100 * (good / statSum)} />
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSetGoodClick = () => setGood(good + 1);

  const handleSetNeutralClick = () => setNeutral(neutral + 1);

  const handleSetBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h3>Give feedback</h3>
      <Button text="good" onButtonClickHandler={handleSetGoodClick} />
      <Button text="neutral" onButtonClickHandler={handleSetNeutralClick} />
      <Button text="bad" onButtonClickHandler={handleSetBadClick} />
      <h3>Statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
