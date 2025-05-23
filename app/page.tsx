import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Burmese Vihar Bodhgaya - A Place of Peace and Mindfulness",
  description:
    "A historic Buddhist monastery established in 1936, offering meditation facilities, study resources, and pilgrimage support.",
}

export default function Home() {
  return <ClientPage />
}
