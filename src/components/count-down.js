"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");

function Countdown() {
    const [duration, setDuration] = (0, react_1.useState)("");
    const [timeLeft, setTimeLeft] = (0, react_1.useState)(0);
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const [isPaused, setIsPaused] = (0, react_1.useState)(false);
    const timerRef = (0, react_1.useRef)(null);

    const handleSetDuration = () => {
        const parsedDuration = Number(duration);
        if (!isNaN(parsedDuration) && parsedDuration > 0) {
            setTimeLeft(parsedDuration);
            setIsActive(false);
            setIsPaused(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const handleStart = () => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };

    const handlePause = () => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const handleReset = () => {
        const parsedDuration = Number(duration);
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(!isNaN(parsedDuration) ? parsedDuration : 0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    (0, react_1.useEffect)(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                    Countdown Timer
                </h1>
                <div className="flex items-center mb-6">
                    <input_1.Input
                        type="number"
                        id="duration"
                        placeholder="Enter duration in seconds"
                        value={duration}
                        onChange={handleDurationChange}
                        className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button_1.Button
                        onClick={handleSetDuration}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200"
                    >
                        Set
                    </button_1.Button>
                </div>
                <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                    {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center gap-4">
                    <button_1.Button
                        onClick={handleStart}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200"
                    >
                        {isPaused ? "Resume" : "Start"}
                    </button_1.Button>
                    <button_1.Button
                        onClick={handlePause}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200"
                    >
                        Pause
                    </button_1.Button>
                    <button_1.Button
                        onClick={handleReset}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200"
                    >
                        Reset
                    </button_1.Button>
                </div>
            </div>
        </div>
    );
}

exports.default = Countdown;

