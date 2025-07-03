import { useLayoutEffect, useEffect } from "react"

// Use useLayoutEffect in the browser, useEffect during SSR
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
