import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    // 1. Outer Container:
    // - min-h-screen: Forces full viewport height
    // - bg-slate-900: Matches your "Page background" requirement
    // - text-slate-50: Sets the default text color to white/off-white
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
      <Navbar />

      {/* 2. Main Content Area:
        - flex-grow: Pushes the Footer to the bottom if content is short
        - We removed the intense purple gradient here so it doesn't conflict 
          with the Slate-950 cards in your other components.
      */}
      <main className="flex-grow w-full relative">
        {/* Optional: A very subtle purple glow in the background (ambient light) */}
        <div className="absolute inset-0 bg-purple-900/10 pointer-events-none" />

        {/* Render the page content */}
        <div className="relative z-10">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
