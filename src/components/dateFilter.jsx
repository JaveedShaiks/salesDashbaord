// import React, { useState } from "react";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // Main style
// import "react-date-range/dist/theme/default.css"; // Theme
// import { addDays, format } from "date-fns";

// const DateRangeFilter = ({ onChange }) => {
//   const [range, setRange] = useState([
//     {
//       startDate: addDays(new Date(), -7),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   const handleSelect = (ranges) => {
//     setRange([ranges.selection]);
//     onChange([ranges.selection.startDate, ranges.selection.endDate]);
//   };

//   return (
//     <div>
//       <DateRange
//         ranges={range}
//         onChange={handleSelect}
//         moveRangeOnFirstSelection={false}
//       />
//       <p>
//         Selected Range: {format(range[0].startDate, "MMM dd, yyyy")} -{" "}
//         {format(range[0].endDate, "MMM dd, yyyy")}
//       </p>
//     </div>
//   );
// };

// export default DateRangeFilter;

import React, { useState, useRef } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, addDays } from "date-fns";

const DateRangeFilter = ({ onChange, dateRange }) => {
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date('3/1/2022'), -7),
      endDate: new Date('8/1/2022'),
      key: "selection",
    },
  ]);

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
    setShowCalendar(false); 
    onChange([ranges.selection.startDate, ranges.selection.endDate]);
  };
  
  const clearFitler = () => {
    onChange(null)
  }
  return (
    <div className="filterWrapper">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        style={{
          padding: "8px 12px",
          fontSize: "16px",
          cursor: "pointer",
          border: "1px solid #ccc",
          background: "#fff",
        }}
      >
        {format(range[0].startDate, "MMM dd, yyyy")} -{" "}
        {format(range[0].endDate, "MMM dd, yyyy")}
      </button>


      {showCalendar && (
        <div
          ref={calendarRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 10,
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <DateRange
            ranges={range}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
          />
        </div>
      )}
          {dateRange && <><span style={{padding: '0 10px'}}>
         Selected Range: {format(range[0].startDate, "MMM dd, yyyy")} -{" "}
         {format(range[0].endDate, "MMM dd, yyyy")}
        </span>
          <button onClick={clearFitler}>clear Filters</button>
        </>
        }
        {!dateRange && <p>No filters applied</p>} 
    </div>
  );
};

export default DateRangeFilter;

