import type { Metadata } from "next"
import TeachingsPage from "./teachings-page"

export const metadata: Metadata = {
  title: "Buddhist Teachings & Resources - Burmese Vihar Bodhgaya",
  description:
    "Explore our collection of Dhamma talks, meditation guides, and Buddhist texts from the Burmese Vihar monastery in Bodhgaya.",
}

export default function Teachings() {
  return <TeachingsPage />
}
