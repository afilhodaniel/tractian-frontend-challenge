import React from 'react'
import { Company } from '../models/Company'
import '../styles/components.css'

interface CompanyItemInterface {
  company: Company
}

type CompanyItemProps = CompanyItemInterface & React.AnchorHTMLAttributes<HTMLAnchorElement>

export default function CompanyItem(props: CompanyItemProps) {

  const { id, name } = props.company

  return (
    <a className="company-link inline-flex p-1 px-2 rounded ml-3" href="#" title={name} {...props}>
      <img src="/imgs/company-item.svg" alt="Company Item" />
      <span className="ml-2 font-medium">{name}</span>
    </a>
  )
}