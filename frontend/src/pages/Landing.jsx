import { Link } from "react-router-dom";

/**
 * Public landing page shown before login.
 * Old browsing homepage is now at /browse.
 */
const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {/* Background gradient (you can later replace with an image) */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-purple-900">
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            Your next book. <span className="text-purple-400">Delivered.</span>
          </h1>
          <p className="max-w-xl text-sm md:text-base text-slate-200 mb-6">
            Discover hand-picked titles from tech, business and fiction. Browse,
            add to your list and get them delivered to your door.
          </p>
          <div className="flex gap-3">
            <Link
              to="/browse"
              className="inline-flex items-center rounded-full bg-purple-600 px-6 py-2 text-sm font-medium hover:bg-purple-700 transition"
            >
              Start browsing
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center rounded-full border border-slate-300/60 px-6 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900/70 transition"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>

      {/* SHORT INTRO SECTION */}
      <section className="bg-slate-900 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-slate-100 mb-4">
            Curated books for busy learners and professionals.
          </p>
          <p className="text-sm text-slate-300">
            From software engineering and design to personal growth, we bring
            together the titles people in tech actually read. No endless
            scrolling, just a clean catalog designed for focus.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center rounded-full bg-slate-50 text-slate-900 px-6 py-2 text-sm font-medium hover:bg-slate-200 transition"
            >
              Login to continue
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES / MOCK PRODUCTS */}
      <section className="bg-slate-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            What can you find inside?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold mb-2">Ultra Tech Shelf</h3>
              <p className="text-sm text-slate-300 mb-4">
                Modern titles on Java, Spring Boot, React, DevOps and system
                design—perfect for interviews and real projects.
              </p>
              <span className="inline-flex rounded-full bg-purple-900/50 px-3 py-1 text-[11px] uppercase tracking-wide text-purple-200">
                For developers
              </span>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold mb-2">Career & Mindset</h3>
              <p className="text-sm text-slate-300 mb-4">
                Books on productivity, communication and career growth to help
                you move from student to professional.
              </p>
              <span className="inline-flex rounded-full bg-purple-900/50 px-3 py-1 text-[11px] uppercase tracking-wide text-purple-200">
                For learners
              </span>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold mb-2">Inspiration Corner</h3>
              <p className="text-sm text-slate-300 mb-4">
                Hand-picked novels and non-fiction for evenings when you just
                want to relax with a good story.
              </p>
              <span className="inline-flex rounded-full bg-purple-900/50 px-3 py-1 text-[11px] uppercase tracking-wide text-purple-200">
                For inspiration
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="bg-slate-900 py-14 px-4">
        <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 items-center">
          <div className="h-72 md:h-80 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
            <div className="w-full h-full bg-linear-to-br from-purple-700 via-slate-900 to-slate-950 flex items-end">
              <p className="p-4 text-xs text-slate-200/80">
                Built by students, for students and early-career developers.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Nostrud id proident
            </h2>
            <p className="text-sm text-slate-300 mb-3">
              Duis do sunt quis anim veniam elit nostrud sint velit non ad.
              Reprehenderit sit ipsum do ipsum nostrud. Eiusmod minim velit ex
              dolor enim irure consectetur deserunt aliqua non.
            </p>
            <p className="text-sm text-slate-300 mb-6">
              Think of this as your calm library on the web: quick browsing,
              clean typography and a dark theme that is easy on your eyes.
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center rounded-full border border-slate-500 px-6 py-2 text-sm font-medium hover:bg-slate-800 transition"
            >
              Explore the catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
