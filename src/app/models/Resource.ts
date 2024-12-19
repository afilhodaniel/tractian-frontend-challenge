export type Resource = {
  kind: "location" | "asset" | "component",
  gatewayId: string | null,
  id: string,
  locationId: string | null,
  name: string,
  parentId: string | null,
  sensorId: string | null,
  sensorType: "vibration" | "energy" | null,
  status: "operating" | "alert" | null,
}