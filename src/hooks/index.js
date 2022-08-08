import { useEffect, useRef, useState } from 'react'
/**
 * 
 * @param {number} maxSeconds 
 * @returns 
 */
const useCountDown = (maxSeconds) => {
    const [seconds, setSeconds] = useState(maxSeconds)
    const intervalRef = useRef(null)
    useEffect(() => {
        if (seconds <= 0)
            stopInterval()
    }, [seconds])
    const startInterval = () => {
        clearInterval(intervalRef.current)
        setSeconds(maxSeconds)
        intervalRef.current = setInterval(() => {
            setSeconds(seconds => seconds - 1)
        }, 1000)
    }
    const stopInterval = () => {
        clearInterval(intervalRef.current)
        setSeconds(0)
    }
    return { startInterval, seconds, secondsStr: seconds < 10 ? '0' + seconds : seconds, stopInterval, isExpired: seconds <= 0 }
}
export { useCountDown }
