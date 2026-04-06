"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type DateContextType = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

const DateContext = createContext<DateContextType>({
  selectedDate: new Date().toISOString().split("T")[0],
  setSelectedDate: () => {},
});

export function DateProvider({ children }: { children: ReactNode }) {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);

  return <DateContext value={{ selectedDate, setSelectedDate }}>{children}</DateContext>;
}

export function useDate() {
  return useContext(DateContext);
}
