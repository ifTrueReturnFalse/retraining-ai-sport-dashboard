import styles from "./GraphContainer.module.css"
import MonthlyKmGraph from "./MonthlyKmGraph"

export default function GraphContainer() {
  return (
    <div>
      <h3>Vos dernières performances</h3>
      <MonthlyKmGraph />
    </div>
  )
}