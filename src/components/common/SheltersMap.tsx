import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";

const Container = styled.section`
  width: 100%;
  margin-bottom: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export interface IShelter {
  SHTER_NM: string;
  REFINE_WGS84_LAT: string;
  REFINE_WGS84_LOGT: string;
}

interface IProps {
  shelters: IShelter[];
  setShelterName?: React.Dispatch<React.SetStateAction<string>>;
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

  // 마커 클릭시 클릭된 보호소 저장하고 맵 바운드 재설정하는 함수
  const handleMarkerClick = (marker: IShelter) => {
    if (!setShelterName) return;
    setShelterName(marker.SHTER_NM);
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      new kakao.maps.LatLng(+marker.REFINE_WGS84_LAT, +marker.REFINE_WGS84_LOGT)
    );
    map.setBounds(bounds);
  };

  // 초기 지도 설정
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

  return (
    <Container>
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
            onClick={() => handleMarkerClick(marker)}
          ></MapMarker>
        ))}
      </Map>
    </Container>
  );
};

export default SheltersMap;
