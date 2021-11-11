import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styled from "styled-components";

const MapBox = styled(MapContainer) `
	border: solid 1px black;
	border-radius: 6px;
	box-shadow: 5px 5px 15px 5px #757575;
`;


const Maps = ({ positions, zoom, markers, style }) => {
	const [position, setPosition] = useState(positions);

	
	useEffect(() => {
		setPosition(positions);
	}, [positions]);
	
	function MyComponent() {
		const map = useMap()

		map.flyTo(positions.reverse(), zoom)
		return null
	}
	
	const renderMap = () => {
		return (
			<MapBox
				center={positions.reverse()}
				zoom={zoom}
				style={style}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<Marker position={positions.reverse()}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
				<MyComponent />
			</MapBox>
		)
	}

	return (

		renderMap()

	);
}

export default Maps;