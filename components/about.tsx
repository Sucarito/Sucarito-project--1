export default function About() {
  return (
    <section id="about" className="py-20 bg-stone-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-stone-800">
          About Burmese Vihar, Bodhgaya
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-stone-700 mb-6 leading-relaxed">
              The Burmese Vihar in Bodhgaya is a historic Buddhist monastery established in 1936 under the leadership of
              Venerable U Dhammetsara, the first abbot appointed by Burmese Buddhist authorities. Located near the
              Mahabodhi Temple, it is one of the earliest monasteries on the original road from Gaya to Bodhgaya,
              serving as a spiritual hub for Burmese pilgrims and international visitors.
            </p>
            <h3 className="text-xl font-semibold mb-4 text-stone-800">Mission Statement</h3>
            <ul className="list-disc pl-5 text-stone-700 space-y-2">
              <li>
                Preserve Theravada Buddhism by offering meditation facilities, study resources, and pilgrimage support
              </li>
              <li>
                Foster Global Exchange through hospitality to pilgrims, scholars, and practitioners from Myanmar, the
                West, and beyond
              </li>
              <li>
                Advocate Gender Equality by continuing its legacy of supporting Bhikkhuni ordinations and women's
                spiritual leadership
              </li>
              <li>
                Serve the Community through interfaith initiatives, such as the Prajna Vihar School, and relief efforts
                for local families
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-stone-800">Historical Timeline and Leadership</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 font-medium text-amber-700">1936–1943</div>
                <div className="flex-1">
                  Founded by Abbot U Dhammetsara, marking the vihar's early years as a pilgrimage rest house for Burmese
                  devotees
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-medium text-amber-700">1943–1966</div>
                <div className="flex-1">
                  Abbot U Otiama oversaw the monastery, maintaining its role in supporting Theravada practice
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-medium text-amber-700">1966–1976</div>
                <div className="flex-1">Abbot U Tilaka expanded accommodations for pilgrims</div>
              </div>
              <div className="flex gap-4">
                <div className="w-24 font-medium text-amber-700">1976–2021</div>
                <div className="flex-1">
                  Venerable Sayadaw U Nyaneinda transformed the vihar into a global meditation and study center
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
