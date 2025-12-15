import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center">
        {/* Background image – put your own image in /public/hero-books.jpg */}
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[url('/hero-books.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight">
            Your books. <span className="text-purple-300">Delivered.</span>
          </h1>
          <p className="text-sm md:text-base text-slate-200 mb-6">
            Find pre-loved textbooks, novels and tech books from local sellers.
            Browse, compare and get them delivered to your door.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              to="/browse"
              className="inline-flex items-center rounded-full bg-purple-600 hover:bg-purple-700 px-6 py-2 text-sm font-medium text-white shadow-sm shadow-purple-900/40 transition"
            >
              Start browsing
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center rounded-full border border-slate-600 hover:border-purple-500 px-6 py-2 text-sm font-medium text-slate-100 bg-slate-950/70"
            >
              Sign in to continue
            </Link>
          </div>
        </div>
      </section>

      {/* SHORT COPY + CTA */}
      <section className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl font-medium mb-3">
            Curated by students, for students.
          </p>
          <p className="text-sm md:text-base text-slate-300 mb-6">
            Easily discover second-hand and new books from trusted sellers.
            Transparent prices, secure checkout and a clean, focused reading
            experience.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 px-5 py-2 text-sm text-slate-100 transition"
          >
            Browse all books
          </Link>
        </div>
      </section>

      {/* FEATURED CATEGORIES (3 cards like the sample) */}
      <section className="bg-slate-950 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col">
              <div className="aspect-square bg-slate-800/80 rounded-xl mb-4 flex items-center justify-center text-xs text-slate-400">
                Textbooks
              </div>
              <h3 className="text-sm font-semibold mb-1">University notes</h3>
              <p className="text-xs text-slate-400">
                Find engineering, IT and business textbooks at student-friendly
                prices.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col">
              <div className="aspect-square bg-slate-800/80 rounded-xl mb-4 flex items-center justify-center text-xs text-slate-400">
                Tech & Coding
              </div>
              <h3 className="text-sm font-semibold mb-1">Learn new skills</h3>
              <p className="text-xs text-slate-400">
                Stay ahead with books on Java, React, algorithms and clean code.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col">
              <div className="aspect-square bg-slate-800/80 rounded-xl mb-4 flex items-center justify-center text-xs text-slate-400">
                Fiction & More
              </div>
              <h3 className="text-sm font-semibold mb-1">Read beyond exams</h3>
              <p className="text-xs text-slate-400">
                Novels, self-help and non-fiction to relax between lectures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION (image + text like sample bottom part) */}
      <section className="bg-slate-950 border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          {/* Left image */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            {/* Put another image here: /public/student-reading.jpg */}
            <div className="h-72 md:h-80 bg-[url('/student-reading.jpg')] bg-cover bg-center" />
          </div>

          {/* Right text */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Built for Sri Lankan students
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              This platform connects buyers and sellers inside the local
              community. Reduce your costs, recycle good books, and help other
              students succeed.
            </p>
            <p className="text-sm text-slate-400 mb-6">
              You can sign up as a buyer or seller, manage your own listings and
              track your orders in a clean dashboard.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center rounded-full bg-purple-600 hover:bg-purple-700 px-6 py-2 text-sm font-medium text-white shadow-sm shadow-purple-900/40 transition"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
