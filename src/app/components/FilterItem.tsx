import { useState } from "react"
import { Filter } from "../models/Filter"

interface FilterItemIterface {
  item: Filter
}

type FilterItemProps = FilterItemIterface & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function FilterItem(props: FilterItemProps) {

  const [active, setActive] = useState<boolean>(false)

  const { icon, label } = props.item

  return (
    <button
      className={`flex items-center filter-item border-2 rounded py-1 px-2 text-sm font-semibold ml-2 ${active ? 'active' : ''}`}
      onClickCapture={() => {
        setActive(!active)
      }}
      onClick={props.onClick}
    >
      <img src={`/imgs/${icon}${active ? '-active' : ''}.svg`} alt={label} />
      <span className="ml-1">{label}</span>
    </button>
  )
}