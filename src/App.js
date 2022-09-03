import { React, useState } from "react";

const CalcBtn = ({ value, handleClick, className }) => {
  if (value === "π") {
    return (
      <button className={className} onClick={handleClick} value={Math.PI}>
        {value}
      </button>
    );
  }

  return (
    <button className={className} onClick={handleClick} value={value}>
      {value}
    </button>
  );
};

const App = () => {
  const [calculatedValue, setCalculatedValue] = useState(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [operator, setOperator] = useState(null);

  const [resetDisplayValue, setResetDisplayValue] = useState(true);

  const [isInitialDisplayValue, setIsInitialDisplayValue] = useState(true);

  const [
    operatorSwitchedBeforeCalculation,
    setOperatorSwitchedBeforeCalculation,
  ] = useState(false);

  const [secondOperandIsChosen, setSecondOperandIsChosen] = useState(false);

  const [displayValueIsNaN, setDisplayValueIsNaN] = useState(false);

  const [crazyModeActivated, setCrazyModeActivated] = useState(false);

  const [showEasterEgg, setShowEasterEgg] = useState(true);

  const handleNumberClick = (event) => {
    if (displayValueIsNaN) {
      return;
    }

    if (isInitialDisplayValue) {
      if (resetDisplayValue) {
        setDisplayValue(event.target.value);
        setCalculatedValue(event.target.value);
        setResetDisplayValue(false);
      } else {
        if (operator == null) {
          if (String(displayValue).includes(".")) {
            if (event.target.value === "0") {
              setDisplayValue(String(displayValue) + "0");
              setCalculatedValue(String(displayValue) + "0");
              return;
            }
          }

          setDisplayValue(Number(displayValue + String(event.target.value)));
          setCalculatedValue(Number(displayValue + String(event.target.value)));
        }
      }
    } else if (!isInitialDisplayValue) {
      if (resetDisplayValue) {
        setDisplayValue(event.target.value);
        setSecondOperandIsChosen(true);
        setResetDisplayValue(false);
      } else {
        if (String(displayValue).includes(".")) {
          if (event.target.value === "0") {
            setDisplayValue(String(displayValue) + "0");
            return;
          }
        }
        setDisplayValue(Number(displayValue + String(event.target.value)));
      }
    }
  };

  const handleOperation = (calculatedValue, displayValue, operator) => {
    switch (operator) {
      case "+":
        setCalculatedValue(Number(calculatedValue) + Number(displayValue));
        break;

      case "X":
        setCalculatedValue(Number(calculatedValue) * Number(displayValue));
        break;

      case "/":
        setCalculatedValue(Number(calculatedValue) / Number(displayValue));
        break;

      case "-":
        setCalculatedValue(Number(calculatedValue) - Number(displayValue));
        break;
    }

    setSecondOperandIsChosen(false);
  };

  const handleOperatorClick = (event) => {
    if (displayValueIsNaN) {
      return;
    }

    if (operatorSwitchedBeforeCalculation) {
      setOperator(event.target.value);

      if (!secondOperandIsChosen) {
        return;
      }
    }

    if (calculatedValue === 0) {
      handleOperation(calculatedValue, displayValue, operator);
      setSecondOperandIsChosen(false);
      setResetDisplayValue(true);
    } else if (calculatedValue !== 0) {
      setOperator(event.target.value);

      if (isInitialDisplayValue) {
        setIsInitialDisplayValue(false);
        setResetDisplayValue(true);
        setOperatorSwitchedBeforeCalculation(true);
      } else if (!isInitialDisplayValue) {
        setResetDisplayValue(true);
        handleOperation(calculatedValue, displayValue, operator);
      }
    }
  };

  const handleEqualsClick = (event) => {
    if (operator) {
      if (isInitialDisplayValue) {
        setDisplayValue(calculatedValue);
      } else if (!isInitialDisplayValue) {
        handleOperation(calculatedValue, displayValue, operator);
        setOperator(null);
        setSecondOperandIsChosen(false);
        setResetDisplayValue(true);
      }
    } else if (!operator) {
      setDisplayValue(displayValue);
    }
  };

  const handleClearClick = (event) => {
    if (event.target.value === "C") {
      setDisplayValue(0);
      setCalculatedValue(0);
      setOperator(null);
      setIsInitialDisplayValue(true);
      setOperatorSwitchedBeforeCalculation(false);
      setSecondOperandIsChosen(false);
      setResetDisplayValue(true);
      setDisplayValueIsNaN(false);
    } else if (event.target.value === "CE") {
      if (displayValueIsNaN) {
        setDisplayValue(0);
        setCalculatedValue(0);
        setOperator(null);
        setIsInitialDisplayValue(true);
        setOperatorSwitchedBeforeCalculation(false);
        setSecondOperandIsChosen(false);
        setResetDisplayValue(true);
        setDisplayValueIsNaN(false);
      } else {
        setDisplayValue(0);
        if (isInitialDisplayValue) {
          setCalculatedValue(0);
        }
      }
    }
  };

  const handleBackSpace = (event) => {
    if (displayValueIsNaN) {
      setDisplayValue(0);
      setCalculatedValue(0);
      setOperator(null);
      setIsInitialDisplayValue(true);
      setOperatorSwitchedBeforeCalculation(false);
      setSecondOperandIsChosen(false);
      setResetDisplayValue(true);
      setDisplayValueIsNaN(false);
      return;
    }

    let str = String(displayValue);

    str = str.substring(0, str.length - 1);

    setDisplayValue(Number(str));

    if (isInitialDisplayValue) {
      setCalculatedValue(Number(str));
    }
  };

  const handleSignChangeClick = (event) => {
    if (displayValueIsNaN) {
      return;
    }

    if (String(displayValue) === "0.") {
      setDisplayValue("-0.");
      return;
    } else if (String(displayValue) === "-0.") {
      setDisplayValue("0.");
      return;
    }

    setDisplayValue(displayValue * -1);

    if (isInitialDisplayValue) {
      setCalculatedValue(displayValue * -1);
      return;
    }
  };

  const handleSquareClick = (event) => {
    if (displayValueIsNaN) {
      return;
    }

    setDisplayValue(displayValue * displayValue);

    if (isInitialDisplayValue) {
      setCalculatedValue(displayValue * displayValue);
    }
  };

  const handleDotClick = (event) => {
    if (displayValueIsNaN) {
      return;
    }

    if (resetDisplayValue && !secondOperandIsChosen) {
      setDisplayValue("0.");
      setResetDisplayValue(false);
      setSecondOperandIsChosen(true);
      return;
    }

    setResetDisplayValue(false);

    if (!secondOperandIsChosen) {
      if (!isInitialDisplayValue) {
        setSecondOperandIsChosen(true);
        setDisplayValue("0.");
      }
    }

    if (String(displayValue).includes(".")) {
      return;
    }

    if (isInitialDisplayValue) {
      setDisplayValue(displayValue + ".");
      setCalculatedValue(displayValue + ".");
      return;
    }

    setDisplayValue(displayValue + ".");
  };

  const handleSquareRootClick = (event) => {
    if (isNaN(Math.sqrt(displayValue))) {
      setDisplayValue("Undefined");
      setDisplayValueIsNaN(true);
      return;
    }

    setDisplayValue(Math.sqrt(displayValue));

    if (isInitialDisplayValue) {
      setCalculatedValue(Math.sqrt(displayValue));
    }
  };

  const handleSmileyClick = (event) => {
    setCrazyModeActivated(!crazyModeActivated);
  };

  if (showEasterEgg) {
    console.log("Nothing to see here... ( ˘ ³˘)ノ°ﾟº❍｡…");
    setShowEasterEgg(false);
  }

  return (
    <div>
      <div className={crazyModeActivated ? "crazy-outer-box" : "outer-box"}>
        <div>
          <div className="display-value">{displayValue}</div>
          <CalcBtn
            value={crazyModeActivated ? "😎" : "😜"}
            handleClick={handleSmileyClick}
            className="button"
          />
          <CalcBtn
            value = "CE"
            handleClick={handleClearClick}
            className = {crazyModeActivated ? 'crazy-button row1' : 'button'}
          />
          <CalcBtn
            value = "C"
            handleClick={handleClearClick}
            className = {crazyModeActivated ? 'crazy-button row1' : 'button'}
          />
          <CalcBtn value = '←' handleClick = {handleBackSpace} className = {crazyModeActivated ? 'crazy-button row1' : 'button'}/>
        </div>
        <div>
        <CalcBtn
            value = "π"
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row2' : 'button'}
          />
          <CalcBtn
            value = "x²"
            handleClick={handleSquareClick}
            className = {crazyModeActivated ? 'crazy-button row2' : 'button'}
          />
          <CalcBtn
            value = "√"
            handleClick={handleSquareRootClick}
            className = {crazyModeActivated ? 'crazy-button row2' : 'button'}
          />
          <CalcBtn
            value = "/"
            handleClick={handleOperatorClick}
            className = {crazyModeActivated ? 'crazy-button row2' : 'button'}
          />
        </div>
        <div>
        <CalcBtn
            value = {7}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row3' : 'button'}
          />
        <CalcBtn
            value = {8}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row3' : 'button'}
          />
          <CalcBtn
            value = {9}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row3' : 'button'}
          />
          <CalcBtn
            value = "X"
            handleClick={handleOperatorClick}
            className = {crazyModeActivated ? 'crazy-button row3' : 'button'}
          />
        </div>
        <div>
        <CalcBtn
            value = {4}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row4' : 'button'}
          />
        <CalcBtn
            value = {5}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row4' : 'button'}
          />
          <CalcBtn
            value = {6}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row4' : 'button'}
          />
          <CalcBtn
            value = "-"
            handleClick={handleOperatorClick}
            className = {crazyModeActivated ? 'crazy-button row4' : 'button'}
          />
        </div>
        <div>
        <CalcBtn
            value = {1}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row5' : 'button'}
          />
        <CalcBtn
            value = {2}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row5' : 'button'}
          />
          <CalcBtn
            value = {3}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row5' : 'button'}
          />
          <CalcBtn
            value = "+"
            handleClick={handleOperatorClick}
            className = {crazyModeActivated ? 'crazy-button row5' : 'button'}
          />
        </div>
        <div>
        <CalcBtn
            value = "+-"
            handleClick={handleSignChangeClick}
            className = {crazyModeActivated ? 'crazy-button row6' : 'button'}
          />
        <CalcBtn
            value = {0}
            handleClick={handleNumberClick}
            className = {crazyModeActivated ? 'crazy-button row6' : 'button'}
          />
          <CalcBtn
            value = "."
            handleClick={handleDotClick}
            className = {crazyModeActivated ? 'crazy-button row6' : 'button'}
          />
          <CalcBtn
            value = "="
            handleClick={handleEqualsClick}
            className = {crazyModeActivated ? 'crazy-button crazy-equals-button row6' : 'button'}
          />
        </div>
        <div key = {Math.random()} className = "calculated-value">
          Calculated value: {calculatedValue}
        </div>
      </div>
    </div>
  );
};

export default App;
