'use client'

import { useState } from 'react';
import FilterItem from './components/FilterItem';
import './styles/layout.css'
import { Filter } from './models/Filter';
import { useSelector } from 'react-redux';

export default function Home() {
  
  const company = useSelector((state) => state.company.value)

  const [filters, setFilters] = useState<Array<Filter>>([{
    slug: 'filter-sensor',
    icon: 'bolt',
    label: 'Sensor de Energia'
  }, {
    slug: 'filter-status',
    icon: 'warning',
    label: 'Crítico'
  }])

  return (
    <div className="main-content m-3 p-3 rounded">
      <div className="grid grid-cols-2 items-center">
        <div className="company-name">
          <span className="font-bold">Ativos</span><small> / {company?.name || 'Select a company'}</small>
        </div>
        
        <div className="main-filters flex justify-end">
          { filters.map((item: Filter) => <FilterItem key={item.slug} item={item} onClick={() => {
            console.log('oi')
          }} />) }
        </div>
      </div>

      <div className='p-5 m-5 text-center'>
        Please, <b>select a company</b> at the <b>top right menu</b> to start.
      </div>
    </div>
  );
}
