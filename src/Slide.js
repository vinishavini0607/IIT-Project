import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import MatImage from './images/image.png';
import './Slide.css';

const Slide = () => {
  const blockData = {
    sBlock: ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'],
    pBlock: ['Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'],
    dBlock: ['Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'],
    fBlock: ['Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'],
  };

  const [searchValue, setSearchValue] = useState('');
  const [chemicalDetails, setChemicalDetails] = useState(null);

  const fetchChemicalDetails = async (element) => {
    try {
      const apiKey = 'uz3cfHOQP0EGt21cSYGMmWGMekjtYdk1';
      const headers = {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      };
  
      const response = await axios.get(`http://localhost:9000/materials/summary/?_all_fields=true&elements=${element}`, {
        headers: headers,
      });
  
      console.log('Received data:', response.data); 
  
      if (Array.isArray(response.data.data)) {
        const filteredData = response.data.data.filter(item => item.elements.includes(element));
        setChemicalDetails(filteredData.slice(0, 10)); 
      } else {
        console.error('Data received is not an array:', response.data);
        setChemicalDetails([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setChemicalDetails([]); 
    }
  };
  
  const handleSearch = async () => {
    console.log('Search button clicked with value: ' + searchValue);
    await fetchChemicalDetails(searchValue);
  };

  const handleButtonClick = async (element) => {
    setSearchValue(element);
    await fetchChemicalDetails(element);
  };

  const renderButtons = (elements, blockClass) => {
    return elements.map((element, index) => (
      <button key={index} className={blockClass} onClick={() => handleButtonClick(element)}>
        {element}
      </button>
    ));
  };

  useEffect(() => {
    if (searchValue) {
      fetchChemicalDetails(searchValue);
    }
  }, [searchValue]);

  const renderTableRows = () => {
    if (!chemicalDetails || !Array.isArray(chemicalDetails)) {
      return (
        <tr>
          <td colSpan="17">No data available</td>
        </tr>
      );
    }
  
    if (chemicalDetails.length === 0) {
      return (
        <tr>
          <td colSpan="17">No records found</td>
        </tr>
      );
    }
    return chemicalDetails.map((item) => (
      <tr key={item.id}>
        <td>{item.chemsys}</td>
        <td>{item.possible_species}</td>
        <td>{item.crystal_system}</td>
        <td>{item.is_stable}</td>
        <td>{item.theoretical}</td>
        <td>{item.ordering}</td>
        <td>{item.is_gap_direct}</td>
        <td>{item.is_metal}</td>
        <td>{item.nsites_max}</td>
        <td>{item.nsites_min}</td>
        <td>{item.nsites}</td>
        <td>{item.nsites_eq_any}</td>
        <td>{item.nsites_not_eq}</td>
        <td>{item.density_max}</td>
        <td>{item.density_min}</td>
        <td>{item.energy_above_hull_max}</td>
        <td>{item.band_gap_max}</td>
      </tr>
    ));
  };

  return (
    <div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide s-block">
          <h2>S-Block Elements</h2>
          <div className="button-container">{renderButtons(blockData.sBlock, 's-block-button')}</div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide p-block">
          <h2>P-Block Elements</h2>
          <div className="button-container">{renderButtons(blockData.pBlock, 'p-block-button')}</div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide d-block">
          <h2>D-Block Elements</h2>
          <div className="button-container">{renderButtons(blockData.dBlock, 'd-block-button')}</div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide s-block">
          <h2>F-Block Elements</h2>
          <div className="button-container">{renderButtons(blockData.fBlock, 'f-block-button')}</div>
        </SwiperSlide>
      </Swiper>

      <div className='search-bar'>
        <div className='search-container'>
          <h3>Search for materials information by Elements</h3>
          <img src={MatImage} alt="image" />
          <input
      type='text'
      placeholder='Search'
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
    <button className='search-btn' onClick={handleSearch}>
      Search
    </button>
        </div>
      </div>
      <div className="chemical-details">
      {chemicalDetails && (
        <div className="chemical-table">
        <table>
        <thead>
          <tr>
            <th>chemsys</th>
            <th>possible_species</th>
            <th>crystal_system</th>
            <th>is_stable</th>
            <th>theoretical</th>
            <th>ordering</th>
            <th>is_gap_direct</th>
            <th>is_metal</th>
            <th>nsites_max</th>
            <th>nsites_min</th>
            <th>nsites</th>
            <th>nsites_eq_any</th>
            <th>nsites_not_eq</th>
            <th>density_max</th>
            <th>density_min</th>
            <th>energy_above_hull_max</th>
            <th>chemicalDetails.band_gap_max</th>
            
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
        </div>
      )}
    </div>
    </div>
  );
}

export default Slide;

