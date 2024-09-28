import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

const Container = styled.section`
  width: 100%;
  margin-bottom: 3rem;
`;

const H2 = styled.h2`
  font-size: 2rem;
`;

export interface IShelter {
  SHTER_NM: string;
  REFINE_WGS84_LAT: string;
  REFINE_WGS84_LOGT: string;
}

interface IProps {
  shelters: IShelter[];
  setShelterName: React.Dispatch<React.SetStateAction<string>>;
}

const SheltersMap = ({ shelters, setShelterName }: IProps) => {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<IShelter[]>([]);

  const markerImage = {
    src: `/assets/logo.svg`,
    size: {
      width: 30,
      height: 30,
    },
  };

  useEffect(() => {
    if (!map) return;
    const bounds = new kakao.maps.LatLngBounds();
    let markers: IShelter[] = [];
    shelters.forEach((value) => {
      markers.push({
        SHTER_NM: value.SHTER_NM,
        REFINE_WGS84_LAT: value.REFINE_WGS84_LAT,
        REFINE_WGS84_LOGT: value.REFINE_WGS84_LOGT,
      });
      bounds.extend(
        new kakao.maps.LatLng(+value.REFINE_WGS84_LAT, +value.REFINE_WGS84_LOGT)
      );
    });
    setMarkers(markers);
    map.setBounds(bounds);
  }, [shelters, map]);

  const handleClick = (marker: IShelter) => {
    setShelterName(marker.SHTER_NM);
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      new kakao.maps.LatLng(+marker.REFINE_WGS84_LAT, +marker.REFINE_WGS84_LOGT)
    );
    map.setBounds(bounds);
  };

  return (
    <Container>
      <H2>나와 가까운 보호소를 클릭해 보세요</H2>
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "30rem",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker, index) => (
          <MapMarker
            key={index}
            position={{
              lat: +marker.REFINE_WGS84_LAT,
              lng: +marker.REFINE_WGS84_LOGT,
            }}
            image={markerImage}
            onClick={() => handleClick(marker)}
          ></MapMarker>
        ))}
      </Map>
    </Container>
  );
};

export default SheltersMap;
