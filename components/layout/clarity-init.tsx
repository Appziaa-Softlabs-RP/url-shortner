"use client"
import { useEffect } from "react";
import { clarity } from "react-microsoft-clarity";

export function ClarityInit() {
    useEffect(() => {
        clarity.init("pvrvh3nle7");
    }, []);

    return null;
}