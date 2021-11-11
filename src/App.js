import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

import Maps from './components/Map'
import { fetchLocalMapBox } from './services/apiMapBox';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  select {
    width: 100%;
    border-radius: 4px;

    option{
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 1rem;
      border-radius: 4px;
    }
  }
`;

const MapBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: 1rem;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #e1e1e1;
width: 20%;
height: 200px;
padding: 1rem;

`;

const App = () => {
  const [incidentes, setIncidentes] = useState([]);

  const [local, setLocal] = useState('');
  const [userLocal, setUserLocal] = useState([]);
  const [position, setPosition] = useState([-22.9617, -43.1669]);


  useEffect(() => {
    async function fetchData(local) {
      const response = await fetchLocalMapBox(local || 'Leme');
      setIncidentes(response);
    }
    fetchData(local);


    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position.coords.latitude, position.coords.longitude);
      setUserLocal([Number(position.coords.latitude), Number(position.coords.longitude)]);
    });

  }, [local]);

  // useEffect(() => {
  //   setOptions(incidentes.features.map(incidente => ({
  //     value: incidente.center,
  //     label: incidente.place_name
  //   })));
  //   console.log(incidentes.features)
  // }, [incidentes])

  const handleInputChange = (e) => {
    setLocal(e.target.value);

  };

  const handleSelectChange = (e) => {

    const splitedArray = e.target.value.split(',');
    const numberArray = splitedArray.map(item => parseFloat(item));

    setPosition([...numberArray.reverse()]);

  };

  const handleClickSelect = (e) => {
    setPosition([e.target.value.split(',')[1], e.target.value.split(',')[0]]);
  }

  return (
    <Container>

      <Form>
        <label htmlFor='123'>
          digite um local:
        </label>
        <input type="text" id='123' onChange={handleInputChange} />
        <select onChange={handleSelectChange} onClick={handleClickSelect}>
          {incidentes?.features?.map(incidente => (
            <option value={incidente.center}
              key={incidente.id}
            >{incidente.place_name} </option>
          ))}
        </select>

      </Form>
      <MapBox>
        <Maps
          positions={position}
          zoom={8}
          style={{ height: '50%', width: '90%' }}
        />
      </MapBox>
    </Container>
  );
}

export default App;