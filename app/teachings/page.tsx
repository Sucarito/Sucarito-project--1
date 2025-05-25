import type { Metadata, Viewport } from "next"
import TeachingsPage from "./teachings-page"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Buddhist Teachings & Resources - Burmese Vihar Bodhgaya",
  description:
    "Explore our collection of Dhamma talks, meditation guides, and Buddhist texts from the Burmese Vihar monastery in Bodhgaya.",
}

export default function Teachings() {
  return <TeachingsPage />
}
