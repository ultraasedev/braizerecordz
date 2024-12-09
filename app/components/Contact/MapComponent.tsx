"use client"

import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

type MarkerIcon = {
  url: string
  scaledSize: google.maps.Size
}

const MapComponent = () => {
  const [markerIcon, setMarkerIcon] = useState<google.maps.Icon | null>(null)
  
  const mapCenter = { lat: 48.0898, lng: -1.6457 }
  const mapStyles = {
    height: "400px",
    width: "100%"
  }

  const darkMapStyle = [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }]
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { lightness: 13 }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }]
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#144b53" }, { lightness: 14 }, { weight: 1.4 }]
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#08304b" }]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }]
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#0b434f" }, { lightness: 25 }]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#021019" }]
    }
  ]

  const onLoad = (map: google.maps.Map) => {
    if (window.google) {
      const icon: google.maps.Icon = {
        url: "/images/map-marker.svg",
        scaledSize: new window.google.maps.Size(40, 40)
      }
      setMarkerIcon(icon)
    }
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={mapCenter}
        onLoad={onLoad}
        options={{
          styles: darkMapStyle,
          scrollwheel: false,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        }}
      >
        {markerIcon && (
          <Marker
            position={mapCenter}
            icon={markerIcon}
          />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent