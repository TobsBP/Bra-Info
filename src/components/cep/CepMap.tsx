'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const markerIcon = L.divIcon({
	className: '',
	html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
		<path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="hsl(239,84%,67%)"/>
		<circle cx="14" cy="14" r="5.5" fill="white"/>
	</svg>`,
	iconSize: [28, 36],
	iconAnchor: [14, 36],
	popupAnchor: [0, -36],
});

const BRAZIL_CENTER: [number, number] = [-14.235, -51.925];
const BRAZIL_ZOOM = 4;
const MARKER_ZOOM = 14;

interface FlyToProps {
	coords: [number, number] | null;
}

function FlyTo({ coords }: FlyToProps) {
	const map = useMap();
	useEffect(() => {
		if (coords) {
			map.flyTo(coords, MARKER_ZOOM, { duration: 1.2 });
		} else {
			map.flyTo(BRAZIL_CENTER, BRAZIL_ZOOM, { duration: 1.2 });
		}
	}, [coords, map]);
	return null;
}

interface CepMapProps {
	coords: { latitude: string; longitude: string } | null;
	label?: string;
}

export function CepMap({ coords, label }: CepMapProps) {
	const position: [number, number] | null =
		coords?.latitude && coords?.longitude
			? [Number(coords.latitude), Number(coords.longitude)]
			: null;

	return (
		<MapContainer
			center={BRAZIL_CENTER}
			zoom={BRAZIL_ZOOM}
			className="w-full h-full rounded-xl"
			scrollWheelZoom
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<FlyTo coords={position} />
			{position && (
				<Marker position={position} icon={markerIcon}>
					{label && <Popup>{label}</Popup>}
				</Marker>
			)}
		</MapContainer>
	);
}
