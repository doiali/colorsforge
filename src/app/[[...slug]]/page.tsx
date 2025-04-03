import { ColorProvider } from '@/components/color-provider'
import MainPanel from '@/components/main-panel'

export default async function Home({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  console.log('slug', slug)
  return (
    <ColorProvider>
      <MainPanel />
    </ColorProvider>
  )
}