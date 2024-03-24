import {useState} from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function CustomTimePicker({handleTime, valueOfTime}) {
    const [time, setTime] = useState(valueOfTime);

    const handleTimePiker = (e) => {
        if (e === null) {
            setTime(valueOfTime);
            return;
        }
        console.log(e);
        setTime(e);
        handleTime(e);
    }

    return (
        <div>
            <TimePicker onChange={(e) => handleTimePiker(e)} value={time}/>
        </div>
    );
}

export default CustomTimePicker;