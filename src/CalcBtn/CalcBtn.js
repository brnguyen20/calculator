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

  export default CalcBtn