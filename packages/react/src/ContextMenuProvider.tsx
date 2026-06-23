import type { ReactNode } from "react"
import { ContextMenuRenderer } from "./ContextMenuRenderer"

export interface ContextMenuProviderProps {
  children: ReactNode
}
/**
 * Global provider for context menu rendering.
 *
 * Automatically mounts ContextMenuRenderer.
 */

export function ContextMenuProvider({ children }: ContextMenuProviderProps) {
  return (
    <>
      {children}
      <ContextMenuRenderer />
    </>
  )
}
