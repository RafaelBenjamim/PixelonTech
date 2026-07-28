import { AnimatePresence, motion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  navItems: Array<{ label: string; id: string }>;
  visibleSection: string;
  scrollTo: (id: string) => void;
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  tapSpring: {
    type: "spring";
    stiffness: number;
    damping: number;
  };
}

export default function Header({
  navItems,
  visibleSection,
  scrollTo,
  menuOpen,
  setMenuOpen,
  tapSpring,
}: HeaderProps) {
  return (
    <header className="pxl-header sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button
          onClick={() => scrollTo("topo")}
          className="flex items-center gap-2"
        >
          <span className="pxl-mark">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="pxl-logo-text">
            pixelon<span className="pxl-cyan">Tech</span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`pxl-nav-link ${visibleSection === item.id ? "active" : ""}`}
            >
              {item.label}
              <span className="pxl-underline" />
            </button>
          ))}
        </nav>

        <motion.button
          onClick={() => scrollTo("contato")}
          className="pxl-btn-ghost hidden px-4 py-1.5 text-sm md:block"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          transition={tapSpring}
        >
          Falar agora
        </motion.button>

        <button
          className="pxl-burger md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            className="pxl-burger-line"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="pxl-burger-line"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="pxl-burger-line"
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -8 : 0,
              width: menuOpen ? 24 : 16,
            }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 0.8, 0.24, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="pxl-mobile-menu flex flex-col gap-4 px-5 py-4 text-sm">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="pxl-mobile-link text-left"
                  whileTap={{ scale: 0.97, x: 4 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("contato")}
                className="pxl-btn-primary mt-1 px-4 py-2 text-sm"
                whileTap={{ scale: 0.96 }}
                transition={tapSpring}
              >
                Falar agora
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
