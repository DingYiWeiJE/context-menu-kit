# Context Menu Kit API Design

## React

```tsx
<ContextMenuProvider>
  <ContextMenu items={items}>
    <div>Right click here</div>
  </ContextMenu>
</ContextMenuProvider>
```

ContextMenuProvider 会自动挂载 ContextMenuRenderer，通常用户不需要手动使用 ContextMenuRenderer。

## Vue

```vue
<ContextMenu :items="items" body-class="my-menu-body" item-class="my-menu-item">
  <div>右键触发区域</div>

  <template #item="{ item }">
    <div>{{ item.label }}</div>
  </template>

  <template #body="{ items }">
    <div>自定义 body</div>
  </template>
</ContextMenu>
```

### Vue Props

```ts
type ContextMenuProps<T = unknown> = {
  items: ContextMenuItem<T>[]
  bodyClass?: string
  itemClass?: string
}
```

### Vue Slots

```ts
type ContextMenuSlots<T = unknown> = {
  default: () => unknown
  item?: (props: { item: ContextMenuItem<T>; close: () => void }) => unknown
  body?: (props: { items: ContextMenuItem<T>[]; close: () => void }) => unknown
}
```

如果没有传入 bodyClass、itemClass、renderItem、renderBody 或 slots，ContextMenu 会使用内置默认渲染。

当同时传入 renderBody 和 renderItem 时，renderBody 生效，renderItem 不会被调用。

## React Internal Architecture

ContextMenu
└── openContextMenu()

ContextMenuRenderer
└── subscribeContextMenu()

ContextMenuProvider
└── render menu ui
