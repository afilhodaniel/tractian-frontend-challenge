import React from 'react'
import { Company } from '../models/Company'
import '../styles/components.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCompany } from '../redux/reducers/CompanyReducer'

interface CompanyItemInterface {
  company: Company
}

type CompanyItemProps = CompanyItemInterface & React.AnchorHTMLAttributes<HTMLAnchorElement>

export default function CompanyItem(props: CompanyItemProps) {

  const dispatch = useDispatch()

  const company = useSelector((state) => state.company.value)

  const { id, name } = props.company

  return (
    <a className={`${company?.name === name ? 'active' : ''} company-link inline-flex p-1 px-2 rounded ml-3`} href="#" title={name} onClick={(e) => {
      e.preventDefault();
      dispatch(setCompany(props.company))
    }}>
      <img src="/imgs/company-item.svg" alt="Company Item" />
      <span className="ml-2 font-medium">{name}</span>
    </a>
  )
}