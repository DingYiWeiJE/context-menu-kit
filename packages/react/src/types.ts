import type { ContextMenuItem } from "@context-menu-kit/core"
import type { ReactNode } from "react"

export interface RenderItemProps<T = unknown> {
  item: ContextMenuItem<T>
  close: () => void
}

export interface RenderBodyProps<T = unknown> {
  items: ContextMenuItem<T>[]
  close: () => void
}

export interface ContextMenuRenderOptions<T = unknown> {
  bodyClass?: string
  itemClass?: string
  renderItem?: (props: RenderItemProps<T>) => ReactNode
  renderBody?: (props: RenderBodyProps<T>) => ReactNode
}
