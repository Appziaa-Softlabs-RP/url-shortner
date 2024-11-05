"use client"

import usePlacesAutocomplete from "use-places-autocomplete";
import { Input } from "../ui/input";
import { useEffect } from "react";

const PlacesAutocomplete = ({
    onAddressSelect,
    lat,
    lng
}: {
    onAddressSelect?: (address: string) => void;
    lat: number;
    lng: number;
}) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: { componentRestrictions: { country: 'in' } },
        debounce: 300,
        cache: 86400,
    });

    // adderss from lat and lng
    useEffect(() => {
        if (lat && lng) {
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({ location: latlng }, (results, status) => {
                if ((status === 'OK') && results && results[0]) {
                    setValue(results[0].formatted_address, false);
                }
            });
        }
    }, [lat, lng, setValue]);

    const renderSuggestions = () => {
        return data.map((suggestion: any) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
            } = suggestion;

            return (
                <li
                    className="p-2 cursor-pointer duration-150 ease-in-out hover:bg-gray-200"
                    key={place_id}
                    onClick={() => {
                        setValue(description, false);
                        clearSuggestions();
                        onAddressSelect && onAddressSelect(description);
                    }}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });
    };

    return (
        <div>
            <Input
                value={value}
                disabled={!ready}
                onChange={(e) => setValue(e.target.value)}
                placeholder="ABC town, XYZ city"
            />
            {status === 'OK' && (
                <ul className="absolute z-10 w-[90%] bg-gray-100 mx-auto rounded">{renderSuggestions()}</ul>
            )}
        </div>
    );
};

export default PlacesAutocomplete;