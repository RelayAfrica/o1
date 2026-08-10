import { createContext, useContext, useState, ReactNode } from "react";
import DemoModal from "./DemoModal";

interface DemoModalContextType {
  openDemo: () => void;
}

const DemoModalContext = createContext<DemoModalContextType>({ openDemo: () => {} });

export function useDemoModal() {
  return useContext(DemoModalContext);
}

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DemoModalContext.Provider value={{ openDemo: () => setOpen(true) }}>
      {children}
      <DemoModal open={open} onClose={() => setOpen(false)} />
    </DemoModalContext.Provider>
  );
}
