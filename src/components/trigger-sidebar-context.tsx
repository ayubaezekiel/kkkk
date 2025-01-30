"use client"

import * as React from "react"

type TriggerSidebarContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

const TriggerSidebarContext = React.createContext<TriggerSidebarContextType | undefined>(undefined)

export function TriggerSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = React.useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <TriggerSidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>{children}</TriggerSidebarContext.Provider>
  )
}

export function useTriggerSidebar() {
  const context = React.useContext(TriggerSidebarContext)
  if (!context) {
    throw new Error("useTriggerSidebar must be used within a TriggerSidebarProvider")
  }
  return context
}

