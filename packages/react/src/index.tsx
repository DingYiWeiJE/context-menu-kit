import "./styles.css"
import type { ContextMenuItem } from "@context-menu-kit/core"
import { closeContextMenu, openContextMenu } from "@context-menu-kit/core"
import type { ReactNode } from "react"
import { ContextMenuRenderOptions } from "./types"

export type ContextMenuProps<T = unknown> = ContextMenuRenderOptions<T> & {
  items: ContextMenuItem<T>[]
  children: ReactNode
}

export function ContextMenu<T = unknown>({
  items,
  bodyClass,
  itemClass,
  renderItem,
  renderBody,
  children
}: ContextMenuProps<T>) {
  return (
    <div
      onContextMenu={(event) => {
        event.preventDefault()

        openContextMenu({
          id: crypto.randomUUID(),
          x: event.clientX,
          y: event.clientY,
          items,
          event: event.nativeEvent,
          bodyClass,
          itemClass,
          renderItem,
          renderBody
        })
      }}
    >
      {children}
    </div>
  )
}

export { closeContextMenu }
export { ContextMenuRenderer } from "./ContextMenuRenderer"
export type { ContextMenuRenderOptions, RenderItemProps, RenderBodyProps } from "./types"
export { ContextMenuProvider } from "./ContextMenuProvider"
export type { ContextMenuProviderProps } from "./ContextMenuProvider"
