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

  const [search, setSearch] = useState<string>('');
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

  const findParentIds = (resources: Array<Resource>): Array<string> => {
    return Array.from(
      new Set(
        resources.map((resource) => resource.parentId || resource.locationId).filter(Boolean)
      )
    ) as string[];
  };

  const addUniqueResources = (newResources: Array<Resource>, existingResources: Array<Resource>): Array<Resource> => {
    const existingIds = new Set(existingResources.map((resource) => resource.id));
    return [...existingResources, ...newResources.filter((resource) => !existingIds.has(resource.id))];
  };

  const parents = (ids: Array<string>) => {
    ids.forEach((id) => {
      const filteredResources = resources.filter((resource) => resource.id === id);
  
      const parentIds = findParentIds(filteredResources);
  
      if (parentIds.length > 0) parents(parentIds);
  
      setFiltered((prevState) => addUniqueResources(filteredResources, prevState));
    });
  };

  const filter = () => {
    if (!filters.some((filter: Filter) => filter.active) && !search.trim()) {
      setFiltered(resources);
      return;
    }
  
    let filteredResources: Array<Resource> = [...resources];
  
    if (search.trim()) {
      filteredResources = filteredResources.filter((resource: Resource) =>
        resource.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    const activeFilters = new Set(filters.filter((filter: Filter) => filter.active).map((filter) => filter.slug));
  
    if (activeFilters.has("filter-sensor-energy")) {
      filteredResources = filteredResources.filter((resource: Resource) => resource.sensorType === "energy");
    }
  
    if (activeFilters.has("filter-status-alert")) {
      filteredResources = filteredResources.filter((resource: Resource) => resource.status === "alert");
    }
  
    filteredResources = Array.from(new Map(filteredResources.map((resource: Resource) => [resource.id, resource])).values());
  
    const parentIds = findParentIds(filteredResources);
    
    if (parentIds.length > 0) parents(parentIds);
  
    setFiltered((prevState) => addUniqueResources(filteredResources, prevState));
  };

  useEffect(() => {
    if (company) {
      setSearch('')
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
    filter();
  }, [resources, filters, search]);


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
        <aside className='main-sidebar w-2/5 border-2 rounded mr-3 max-h-screen overflow-y-scroll'>
          <div className="p-3 border-b-2">
            <input
              className='outline-none w-full'
              type="search"
              placeholder="Buscar por Ativo ou Local"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setFiltered([]);
              }}
            />
          </div>
          <div className="p-3">
            { filtered
                .filter((pResource: Resource) => !pResource.parentId && !pResource.locationId)
                .map((pResource: Resource) =>
                  <TreeItem key={pResource.id} resource={pResource} resources={filtered} />
            )}
            { filtered.length === 0 && <span>Nothing to show with selected filters</span> }
          </div>
        </aside>

        <section className='main-content w-3/5'>
          Please, select one component
        </section>
      </div> }
    </div>
  );
}
