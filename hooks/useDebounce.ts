import React, { useCallback, useEffect, useRef, useState } from "react"

export default function useDebaunce(callback: Function, delay: number) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const debouncedCallback = useCallback((...args: any[]) => {
        if(timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay)
    }, [callback, delay]);

    return debouncedCallback;
}