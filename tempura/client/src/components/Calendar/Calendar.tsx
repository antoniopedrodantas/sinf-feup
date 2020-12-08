import React, { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import './styles/Calendar.css';

function Calendar(){

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    function handleSelect(ranges:any){
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    return (
        <>
            <div className="date-picker">
                <DateRangePicker 
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    minDate={new Date()}
                />
            </div>
        </>
    );
    
};

export default Calendar;