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
  const [filtered, setFiltered] = useState<Array<Resource>>([])

  const [filters, setFilters] = useState<Array<Filter>>([{
    active: false,
    slug: 'filter-sensor-energy',
    icon: 'bolt',
    label: 'Sensor de Energia'
  }, {
    active: false,
    slug: 'filter-status-alert',
    icon: 'warning',
    label: 'Crítico'
  }])

  const parents = (ids: Array<string>) => {
    ids.map((id: string) => {
      const filteredResources = resources.filter((resource: Resource) => resource.id === id)

      const filteredResourcesParentIds = Array.from(new Set(filteredResources.map((resource: Resource) => {
        if (resource.parentId) return resource.parentId
        if (resource.locationId) return resource.locationId
      })))
  
      if (filteredResourcesParentIds.length > 0) parents(filteredResourcesParentIds)

      setFiltered((prevState) => {
        // Adiciona apenas recursos únicos
        const uniqueResources = filteredResources.filter(
          (resource) => !prevState.some((existing) => existing.id === resource.id)
        );
        return [...prevState, ...uniqueResources];
      });
    })
  }

  const filter = () => {
    if (!filters.some((item: Filter) => item.active)) return setFiltered(resources)

    let filteredResources: Array<Resource> = []
    const uniqueResources = new Map<string, Resource>();

    if (filters.some((item: Filter) => item.active && item.slug === "filter-sensor-energy")) {
      resources
        .filter((resource: Resource) => resource.sensorType === "energy")
        .forEach((resource) => {
          uniqueResources.set(resource.id, resource); // Adiciona apenas se o ID ainda não existir
        });
    }
    
    if (filters.some((item: Filter) => item.active && item.slug === "filter-status-alert")) {
      resources
        .filter((resource: Resource) => resource.status === "alert")
        .forEach((resource) => {
          uniqueResources.set(resource.id, resource); // Adiciona apenas se o ID ainda não existir
        });
    }

    filteredResources = Array.from(uniqueResources.values());

    const filteredResourcesParentIds = Array.from(new Set(filteredResources.map((resource: Resource) => {
      if (resource.parentId) return resource.parentId
      if (resource.locationId) return resource.locationId
    })))

    if (filteredResourcesParentIds.length > 0) parents(filteredResourcesParentIds)

    setFiltered((prevState) => [...prevState, ...filteredResources]);
  }

  useEffect(() => {
    if (company) {
      setResources([])
      setFiltered([])
      setFilters(filters.map((item: Filter) => {
        return {
          ...item,
          active: false
        }
      }))

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
    if (locations.length > 0) {
      setResources((prevState) => [...prevState, ...locations.map((resource: Resource) => {
        return {
          ...resource,
          kind: "location"
        }
      })])
    }
  }, [locations])
  
  useEffect(() => {
    if (assets.length > 0) {
      setResources((prevState) => [...prevState, ...assets.map((resource: Resource) => {
        return {
          ...resource,
          kind: resource.sensorType !== null ? "component" : "asset"
        }
      })])
    }
  }, [assets])

  useEffect(() => {
    filter()
  }, [resources, filters])


  return (
    <div className="main-wrapper m-3 p-3 rounded">
      <div className="grid grid-cols-2 items-center">
        <div className="company-name">
          <span className="font-bold">Ativos</span><small> / {company?.name || 'Select a company'}</small>
        </div>
        
        { company && <div className="main-filters flex justify-end">
          { filters.map((item: Filter) => <FilterItem key={item.slug} item={item} onClick={() => {
            setFiltered([])
            setFilters(filters.map((cItem: Filter) => {
              if (cItem.slug === item.slug) {
                return {
                  ...cItem,
                  active: !cItem.active
                }
              }

              return cItem
            }))
          }} />) }
        </div> }
      </div>

      { !company && <div className='p-5 m-5 text-center'>
        Please, <b>select a company</b> at the <b>top right menu</b> to start.
      </div> }

      { company && <div className='mt-3 flex'>
        <aside className='main-sidebar w-2/5 border-2 rounded mr-3 p-3 max-h-screen overflow-y-scroll'>
          { filtered
              .filter((pResource: Resource) => !pResource.parentId && !pResource.locationId)
              .map((pResource: Resource) =>
                <TreeItem key={pResource.id} resource={pResource} resources={filtered} />
          )}
        </aside>

        <section className='main-content w-3/5'>
          oi
        </section>
      </div> }
    </div>
  );
}
