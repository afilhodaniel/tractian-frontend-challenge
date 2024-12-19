import { useState } from "react";
import { Resource } from "../models/Resource";

interface TreeItemInterface {
  resource: Resource,
  resources: Array<Resource>
}

type TreeItemProps = TreeItemInterface

export default function TreeItem(props: TreeItemProps) {

  const { resource, resources } = props

  const [active, setActive] = useState<boolean>(false)

  const hasChildren = () => {
    return resources.filter((cResource: Resource) => cResource.locationId === resource.id || cResource.parentId === resource.id).length > 0
  }

  return (
    <div className={`tree-item ${active ? 'active' : ''}`}>
      <div className="tree-item-button flex items-center" onClick={() => setActive(!active)}>
        <span className="tree-item-caret inline-block">
          { hasChildren() && <img src="/imgs/caret.svg" /> }
        </span>
        <img src={`/imgs/${resource.kind}-icon.svg`} />
        <span className="ml-2">{resource.name}</span>
        { resource.status === "operating" && <img className="ml-1" src="/imgs/status-green.svg" /> }
        { resource.status === "alert" && <img className="ml-1" src="/imgs/status-red.svg" /> }
        { resource.sensorType === "energy" && <img className="ml-1" src="/imgs/bolt-green.svg" /> }
      </div>
      { hasChildren() && active && <div className="ml-4">
        { resources
            .filter((cResource: Resource) => cResource.locationId == resource.id || cResource.parentId == resource.id)
            .map((cResource: Resource) =>
              <TreeItem key={cResource.id} resource={cResource} resources={resources} />
        ) }
      </div> }
    </div>
  )
}