import { colorPickers, PickerMode } from '@/components/color-pickers'
import { defaultMode1, defaultMode2 } from '@/components/color-provider'
import MainPanel from '@/components/main-panel'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata: (data: {
  params: Promise<{ slug: PickerMode[] }>
}) => Promise<Metadata> = async ({ params }) => {
  const { slug = [] } = await params
  const [mode1, mode2] = slug
  if (!pickerModes.includes(mode1)) return {
    alternates: {
      canonical: `https://colorsforge.com`,
    }
  }

  const title = `ColorsForge - ${mode1.toUpperCase()} Color Picker`
  const description = pickerModes.includes(mode2)
    ? `Pick ${mode1.toUpperCase()} color. Convert ${mode1.toUpperCase()} to ${mode2.toUpperCase()} and vice versa.`
    : `Pick ${mode1.toUpperCase()} color.`
  const canonicalUrl = `https://colorsforge.com/${mode1}${mode2 ? '/' + mode2 : ''}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    }
  }
}

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
  const [mode1 = defaultMode1, mode2 = defaultMode2] = slug
  const isValid = pickerModes.includes(mode1) && pickerModes.includes(mode2)
  if (!isValid)
    return notFound()

  return (
    <MainPanel />
  )
}