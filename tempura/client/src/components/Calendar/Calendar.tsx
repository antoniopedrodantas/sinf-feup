import React, { useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import './styles/Calendar.css';

interface CalendarProps{
    start: Date;
    end : Date;
}
const Calendar: React.FC<CalendarProps> = ({start, end}) => {

    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(start);

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };

    function handleSelect(ranges:any){
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const submit = async (event: any) => {
        event.preventDefault();
    };

    return (
        <>
            <div className="date-picker">
                <form className="date-form" onSubmit={submit}>

                    <DateRangePicker 
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        minDate={start}
                        maxDate={end}
                    />

                    <button className="dateSubmitButton" type="submit"> 
                        <span> Apply</span>
                    </button>

                </form>
            </div>
        </>
    );
    
};

export default Calendar;