"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";

export default function ZipCodeWithLocation({ heading, zipCode, setZipCode }: { heading: string, zipCode: number | null, setZipCode: (zipCode: number) => void }) {

    const [state, setState] = useState<string | null>(null);
    const [district, setDistrict] = useState<string | null>(null);

    const debouncedGetDetails = useCallback(
        async (debouncedZipCode: number) => {
            if (debouncedZipCode) {
                const formData = new FormData();
                formData.append('zip_code', debouncedZipCode.toString());

                const res = await fetch(`/api/getMatchedZipCodeDetails`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                    cache: 'no-cache'
                });
                const json = await res.json();
                if (json?.data.length === 1) {
                    setState(json?.data[0]?.name);
                    setDistrict(json?.data[0]?.district?.name);
                } else {
                    setState(null);
                    setDistrict(null);
                }
            } else {
                setState(null);
                setDistrict(null);
            }
        },
        []
    );

    useEffect(() => {
        if (zipCode) {
            const timeoutId = setTimeout(() => debouncedGetDetails(zipCode), 100);
            return () => clearTimeout(timeoutId);
        }
    }, [zipCode, debouncedGetDetails]);

    return <div className="space-y-3">
        <p>
            {heading}
        </p>
        <div className="md:grid md:grid-cols-3 gap-8 w-full">
            <div className="flex flex-col space-y-2 m-2">
                <Label>
                    Zip Code
                </Label>
                <Input
                    type="number"
                    placeholder="Zip Code"
                    required
                    value={zipCode ? zipCode.toString() : ""}
                    onChange={(e) => setZipCode(parseInt(e.target.value))}
                />
            </div>
            <div className="flex flex-col space-y-2 m-2">
                <Label>
                    State
                </Label>
                <Input
                    type="text"
                    placeholder="State"
                    value={state ?? ''}
                    disabled
                />
            </div>
            <div className="flex flex-col space-y-2 m-2">
                <Label>
                    District
                </Label>
                <Input
                    type="text"
                    placeholder="District"
                    value={district ?? ''}
                    disabled
                />
            </div>
        </div>
    </div>
}