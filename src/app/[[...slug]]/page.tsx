import MainPanel from '@/components/main-panel'
import { colorPickers } from '@/components/color-pickers'

export const generateStaticParams = async () => {
  const pickerModes = colorPickers.map(p => p.name)
  const routes: { slug: string[] }[] = [{ slug: [] }]
  for (const mode1 of pickerModes) {
    routes.push({ slug: [mode1] })
    for (const mode2 of pickerModes) {
      if (mode1 !== mode2) {
        routes.push({ slug: [mode1, mode2] })
      }
    }
  }
  return routes
}

export const dynamicParams = false

export default async function Home() {

  return (
    <MainPanel />
  )
}