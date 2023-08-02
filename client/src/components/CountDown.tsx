import { Typography } from '@mui/material';
import React, {useEffect, useRef, useState} from 'react';

interface CountDownProps {
    seconds: number
    onCountdownEnd: () => void;
}

const CountDown: React.FC<CountDownProps> = ({seconds, onCountdownEnd}) => {
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef<any>();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        if (countdown < 0) {
            clearInterval(timerId.current)
            onCountdownEnd();
        }
    }, [countdown])

    return <Typography variant="h1">
        {countdown}s
    </Typography>
}
export default CountDown;