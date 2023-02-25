import { useState } from "react";

function Timer()
{
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [sconds, setSeconds] = useState(0);
    
    const getTime = () =>
    {
        const time = Date.now();
    }

    Date.now()

    return(
        <h1>timer</h1>
    )
}

export default Timer