'use client'

import { useEffect, useState } from 'react';
import FilterItem from './components/FilterItem';
import './styles/layout.css'
import { Filter } from './models/Filter';
import { useDispatch, useSelector } from 'react-redux';
import CompanyService from './services/CompanyService';
import { setLocations } from './redux/reducers/LocationsReducer';
import { Location } from './models/Location';
import { setAssets } from './redux/reducers/AssetsReducer';
import { Asset } from './models/Asset';

export default function Home() {

  const dispatch = useDispatch()
  
  const company = useSelector((state) => state.company.value)
  const locations = useSelector((state) => state.locations.value)
  const assets = useSelector((state) => state.assets.value)

  const [filters, setFilters] = useState<Array<Filter>>([{
    slug: 'filter-sensor',
    icon: 'bolt',
    label: 'Sensor de Energia'
  }, {
    slug: 'filter-status',
    icon: 'warning',
    label: 'Crítico'
  }])

  useEffect(() => {
    if (company) {
      CompanyService.locations(company.id)
        .then((response) => {
          dispatch(setLocations(response.data))
        })
        .catch((error) => {
          console.log('Something is wrong', error.response.data)
        })
      
      CompanyService.assets(company.id)
        .then((response) => {
          dispatch(setAssets(response.data))
        })
        .catch((error) => {
          console.log('Something is wrong', error.response.data)
        })
    }
  }, [company])

  return (
    <div className="main-wrapper m-3 p-3 rounded">
      <div className="grid grid-cols-2 items-center">
        <div className="company-name">
          <span className="font-bold">Ativos</span><small> / {company?.name || 'Select a company'}</small>
        </div>
        
        { company && <div className="main-filters flex justify-end">
          { filters.map((item: Filter) => <FilterItem key={item.slug} item={item} onClick={() => {
            console.log('oi')
          }} />) }
        </div> }
      </div>

      { !company && <div className='p-5 m-5 text-center'>
        Please, <b>select a company</b> at the <b>top right menu</b> to start.
      </div> }

      { company && <div className='mt-3 flex'>
        <aside className='main-sidebar w-2/5 border-2 rounded mr-3 p-3'>
          {/* { locations.map((location: Location) => <div>{location.name}</div>) } */}
          { assets.map((asset: Asset) => <div>{asset.name}</div>) }
        </aside>

        <section className='main-content w-3/5'>
          oi
        </section>
      </div> }
    </div>
  );
}
