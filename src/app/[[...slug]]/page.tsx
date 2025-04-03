import { colorPickers, PickerMode } from '@/components/color-pickers'
import MainPanel from '@/components/main-panel'
import { notFound } from 'next/navigation'

const pickerModes = colorPickers.map(({ name }) => name)

export const generateStaticParams = async () => {
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

export default async function Home({
  params,
}: {
  params: Promise<{ slug: PickerMode[] }>
}) {
  const { slug = [] } = await params
  const [mode1 = 'hsl', mode2 = 'srgb'] = slug
  const isValid = pickerModes.includes(mode1) && pickerModes.includes(mode2)
  if (!isValid)
    return notFound()

  return (
    <MainPanel />
  )
}