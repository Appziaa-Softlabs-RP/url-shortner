"use client"
import { useEffect } from "react";
import { clarity } from "react-microsoft-clarity";

export function ClarityInit() {
    useEffect(() => {
        clarity.init("omr9o18qn0");
    }, []);

    return null;
}