import type { ContextMenuItem, ContextMenuState } from "@context-menu-kit/core"
import { closeContextMenu, subscribeContextMenu } from "@context-menu-kit/core"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
import { ContextMenuRenderOptions, RenderItemProps } from "./types"

function mergeClassNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

export function ContextMenuRenderer() {
  const [state, setState] = useState<ContextMenuState | null>(null)

  useEffect(() => {
    return subscribeContextMenu(setState)
  }, [])

  const isOpen = state?.isOpen

  const bodyStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (!state) return undefined

    return {
      position: "fixed",
      left: state.x,
      top: state.y,
      zIndex: 9999
    }
  }, [state?.x, state?.y])

  if (!isOpen || !state) {
    return null
  }

  const { items, bodyClass, itemClass, renderItem, renderBody } = state as ContextMenuState &
    ContextMenuRenderOptions

  const close = closeContextMenu

  return (
    <div className={mergeClassNames("cmk-body", bodyClass)} style={bodyStyle} role="menu">
      {renderBody
        ? renderBody({ items, close })
        : items.map((item) => (
            <ContextMenuRendererItem
              key={item.id}
              item={item}
              itemClass={itemClass}
              renderItem={renderItem}
              close={close}
            />
          ))}
    </div>
  )
}

interface ContextMenuRendererItemProps {
  item: ContextMenuItem
  itemClass?: string
  renderItem?: (props: RenderItemProps) => ReactNode
  close: () => void
}

function ContextMenuRendererItem({
  item,
  itemClass,
  renderItem,
  close
}: ContextMenuRendererItemProps) {
  if (renderItem) {
    return <>{renderItem({ item, close })}</>
  }

  const handleClick = () => {
    if (item.disabled) return

    item.onClick?.(item)
    close()
  }

  return (
    <div
      className={mergeClassNames("cmk-item", itemClass, item.disabled && "cmk-item-disabled")}
      role="menuitem"
      aria-disabled={item.disabled || undefined}
      onClick={handleClick}
    >
      {item.label}
    </div>
  )
}
