import { ContextMenu, ContextMenuProvider } from "@context-menu-kit/react"

const items = [
  {
    id: "copy",
    label: "Copy",
    onClick: () => {
      console.log("copy")
    }
  },
  {
    id: "delete",
    label: "Delete",
    disabled: true
  }
]
const items2 = [
  {
    id: "copy2",
    label: "复制",
    onClick: () => {
      console.log("copy")
    }
  },
  {
    id: "delete2",
    label: "删除",
    disabled: true
  }
]

export default function App() {
  return (
    <ContextMenuProvider>
      <ContextMenu
        items={items}
        renderBody={({ items, close }) => (
          <div
            style={{
              background: "#222",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 4
            }}
          >
            {items.map((item) => (
              <button
                key={item.id}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return
                  item.onClick?.(item)
                  close()
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      >
        <div
          style={{
            width: 300,
            height: 180,
            border: "1px solid #ccc",
            padding: 24
          }}
        >
          Right click here
        </div>
      </ContextMenu>
      <ContextMenu
        items={items2}
        renderBody={({ items, close }) => (
          <div
            style={{
              background: "#222",
              padding: 12,
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              gap: 4
            }}
          >
            {items.map((item) => (
              <button
                key={item.id}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return
                  item.onClick?.(item)
                  close()
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      >
        <div
          style={{
            width: 300,
            height: 180,
            border: "1px solid #ccc",
            padding: 24
          }}
        >
          点这里
        </div>
      </ContextMenu>
    </ContextMenuProvider>
  )
}
