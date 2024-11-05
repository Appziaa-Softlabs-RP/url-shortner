"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useMemo } from "react";
import { Button } from "../ui/button";
import PlacesAutocomplete from "./location-autocomplete";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { MapPin } from "lucide-react";


export default function MapLocationPicker({
    lat,
    lng,
    setLat,
    setLng,
}: {
    lat: number;
    lng: number;
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;

}) {

    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
            draggable: true,
            zoomControl: true,
            fullscreenControl: true,
            streetViewControl: true,
            scaleControl: true,
            panControl: true,
            rotateControl: true,
            mapTypeControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER,
            },
            fullscreenControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM,
            },

        }),
        []
    );

    const handleMapClick = (e: any) => {
        setLat(e.latLng.lat())
        setLng(e.latLng.lng())
    };

    return <>
        <Dialog>
            <DialogTrigger>
                <Button type="button" className="text-xs">
                    Pick in Map
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Pick Location From Map</DialogTitle>
                    <DialogDescription>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                navigator.geolocation.getCurrentPosition((position) => {
                                    setLat(position.coords.latitude);
                                    setLng(position.coords.longitude);
                                });
                            }}
                            className="flex items-center space-x-1 text-xs"
                        >
                            <MapPin size={16} />
                            <span>Use My Location</span>
                        </Button>
                        <div className="my-3">
                            <PlacesAutocomplete
                                lat={lat}
                                lng={lng}
                                onAddressSelect={(address) => {
                                    getGeocode({ address: address }).then((results) => {
                                        const { lat, lng } = getLatLng(results[0]);
                                        setLat(lat);
                                        setLng(lng);
                                    });
                                }}
                            />
                        </div>
                        <div className="max-w-[300px] sm:max-w-[400px] mx-auto max-h-[300px] sm:max-h-[400px] overflow-hidden flex items-center justify-center">
                            <GoogleMap
                                options={mapOptions}
                                zoom={14}
                                center={mapCenter}
                                mapTypeId={google.maps.MapTypeId.ROADMAP}
                                mapContainerStyle={{ width: '800px', height: '800px' }}
                                // onLoad={(map) => console.log('Map Loaded')}
                                onClick={handleMapClick}
                            >
                                <MarkerF
                                    position={mapCenter}
                                // onLoad={() => console.log('Marker Loaded')}
                                />
                            </GoogleMap>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </>
}