import type { ContextMenuItem, ContextMenuState } from "@context-menu-kit/core"
import { closeContextMenu, subscribeContextMenu } from "@context-menu-kit/core"
import { useEffect, useState } from "react"

function mergeClassNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export interface RenderItemProps {
  item: ContextMenuItem
  close: () => void
}

export interface RenderBodyProps {
  items: ContextMenuItem[]
  close: () => void
}

export interface ContextMenuRendererProps {
  bodyClass?: string
  itemClass?: string
  renderItem?: (props: RenderItemProps) => React.ReactNode
  renderBody?: (props: RenderBodyProps) => React.ReactNode
}

export function ContextMenuRenderer(props: ContextMenuRendererProps) {
  const { bodyClass, itemClass, renderItem, renderBody } = props
  const [state, setState] = useState<ContextMenuState | null>(null)

  useEffect(() => {
    return subscribeContextMenu((nextState) => {
      setState(nextState)
    })
  }, [])

  if (!state?.isOpen) {
    return null
  }

  if (renderBody) {
    return (
      <div
        className={mergeClassNames("cmk-body", bodyClass)}
        style={{
          position: "fixed",
          left: state.x,
          top: state.y
        }}
      >
        {renderBody({
          items: state.items,
          close: closeContextMenu
        })}
      </div>
    )
  }

  return (
    <div
      className={mergeClassNames("cmk-body", bodyClass)}
      style={{
        position: "fixed",
        left: state.x,
        top: state.y
      }}
    >
      {state.items.map((item) => {
        if (renderItem) {
          return (
            <div key={item.id}>
              {renderItem({
                item,
                close: closeContextMenu
              })}
            </div>
          )
        }
        return (
          <div
            key={item.id}
            className={mergeClassNames("cmk-item", itemClass, item.disabled && "cmk-item-disabled")}
            onClick={() => {
              if (item.disabled) return
              item.onClick?.(item)
              closeContextMenu()
            }}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}
