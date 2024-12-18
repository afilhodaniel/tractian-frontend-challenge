'use client'

import { useState } from 'react';
import FilterItem from './components/FilterItem';
import './styles/layout.css'
import { Filter } from './models/Filter';

export default function Home() {

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
          <span className="font-bold">Ativos</span><small> / Company</small>
        </div>
        
        <div className="main-filters flex justify-end">
          { filters.map((item: Filter) => <FilterItem key={item.slug} item={item} onClick={() => {
            console.log('oi')
          }} />) }
        </div>
      </div>
    </div>
  );
}
