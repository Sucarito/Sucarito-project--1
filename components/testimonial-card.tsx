interface TestimonialCardProps {
  quote: string
  author: string
  location: string
  avatar: string
}

export default function TestimonialCard({ quote, author, location, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-stone-50 p-8 relative shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <svg
        className="absolute -top-6 left-6 text-amber-400 w-12 h-12 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
      </svg>

      <p className="text-stone-700 italic mb-6 pt-4">{quote}</p>

      <div className="flex items-center">
        <img src={avatar || "/placeholder.svg"} alt={author} className="w-12 h-12 rounded-full object-cover mr-4" />
        <div>
          <p className="font-medium text-stone-800">{author}</p>
          <p className="text-sm text-stone-500">{location}</p>
        </div>
      </div>
    </div>
  )
}
