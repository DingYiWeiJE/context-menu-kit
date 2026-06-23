import type { ContextMenuItem } from "@context-menu-kit/core"
import { closeContextMenu, openContextMenu } from "@context-menu-kit/core"
import type { ReactNode } from "react"

export type ContextMenuProps<T = unknown> = {
  items: ContextMenuItem<T>[]
  bodyClass?: string
  itemClass?: string
  renderItem?: (props: { item: ContextMenuItem<T>; close: () => void }) => ReactNode
  renderBody?: (props: { items: ContextMenuItem<T>[]; close: () => void }) => ReactNode
  children: ReactNode
}

export function ContextMenu<T = unknown>({ items, children }: ContextMenuProps<T>) {
  return (
    <div
      onContextMenu={(event) => {
        event.preventDefault()

        openContextMenu({
          id: crypto.randomUUID(),
          x: event.clientX,
          y: event.clientY,
          items,
          event: event.nativeEvent
        })
      }}
    >
      {children}
    </div>
  )
}

export { closeContextMenu }
