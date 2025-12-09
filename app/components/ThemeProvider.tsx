'use client'

import React from 'react'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Minimal passthrough provider — expand if you want to add theme state
  return <>{children}</>
}

export default ThemeProvider
