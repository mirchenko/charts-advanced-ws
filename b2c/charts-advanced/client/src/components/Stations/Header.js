import React from 'react';
import { TemperatureHigh, TemperatureLow, NameIcon } from '../../elements/svg';

export default ({ nameChange, name, order, orderField, changeSort }) => {

  return (
    <div className="header">
      <div className="filter-wrapper">
        <input type="text" name="name" onChange={nameChange} value={name} placeholder="Name..."/>
      </div>
      <div className="controls-wrapper">
        <div
          className={`controls-item ${orderField === 'name' ? 'active' : ''}`}
          onClick={() => changeSort('name')}
        >
          <NameIcon />
          <div className="controls-container">
            <div className={`controls-triangle ${ (orderField === 'name' && order === 'asc') ? 'active' : '' }`}/>
            <div className={`controls-triangle ${ (orderField === 'name' && order === 'desc') ? 'active' : '' }`}/>
          </div>
        </div>

        <div
          className={`controls-item ${orderField === 'max' ? 'active' : ''}`}
          onClick={() => changeSort('max')}
        >
          <TemperatureHigh />
          <div className="controls-container">
            <div className={`controls-triangle ${ (orderField === 'max' && order === 'asc') ? 'active' : '' }`}/>
            <div className={`controls-triangle ${ (orderField === 'max' && order === 'desc') ? 'active' : '' }`}/>
          </div>
        </div>

        <div
          className={`controls-item ${orderField === 'min' ? 'active' : ''}`}
          onClick={() => changeSort('min')}
        >
          <TemperatureLow />
          <div className="controls-container">
            <div className={`controls-triangle ${ (orderField === 'min' && order === 'asc') ? 'active' : '' }`}/>
            <div className={`controls-triangle ${ (orderField === 'min' && order === 'desc') ? 'active' : '' }`}/>
          </div>
        </div>
      </div>
    </div>
  );
};