'use client'

import { useEffect, useState } from 'react';
import FilterItem from './components/FilterItem';
import './styles/layout.css'
import { Filter } from './models/Filter';
import { useDispatch, useSelector } from 'react-redux';
import CompanyService from './services/CompanyService';
import { setLocations } from './redux/reducers/LocationsReducer';
import { setAssets } from './redux/reducers/AssetsReducer';
import { Resource } from './models/Resource';
import TreeItem from './components/TreeItem';

export default function Home() {

  const dispatch = useDispatch()
  
  const company = useSelector((state) => state.company.value)
  const locations = useSelector((state) => state.locations.value)
  const assets = useSelector((state) => state.assets.value)

  const [resources, setResources] = useState<Array<Resource>>([])

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
      setResources([])

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

  useEffect(() => {
    if (locations) {
      setResources((prevState) => [...prevState, ...locations.map((resource: Resource) => {
        return {
          ...resource,
          kind: "location"
        }
      })])
    }
  }, [locations])
  
  useEffect(() => {
    if (assets) {
      setResources((prevState) => [...prevState, ...assets.map((resource: Resource) => {
        return {
          ...resource,
          kind: resource.sensorType !== null ? "component" : "asset"
        }
      })])
    }
  }, [assets])


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
        <aside className='main-sidebar w-2/5 border-2 rounded mr-3 p-3 max-h-screen overflow-y-scroll'>
          { resources
              .filter((pResource: Resource) => !pResource.parentId && !pResource.locationId)
              .map((pResource: Resource) =>
                <TreeItem key={pResource.id} resource={pResource} resources={resources} />
          )}
        </aside>

        <section className='main-content w-3/5'>
          oi
        </section>
      </div> }
    </div>
  );
}
