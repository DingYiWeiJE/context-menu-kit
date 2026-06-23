export type ContextMenuItem<T = unknown> = {
  id: string
  label?: string
  disabled?: boolean
  children?: ContextMenuItem<T>[]
  onClick?: (item: ContextMenuItem) => void

  /**
   * 允许用户挂载任意业务数据
   */
  data?: T
}

export type ContextMenuOpenOptions = {
  /**
   * 当前右键菜单实例 id
   * 用来支持一个页面多个区域注册不同菜单
   */
  id: string

  /**
   * 鼠标右键位置
   */
  x: number
  y: number

  /**
   * 菜单项
   */
  items: ContextMenuItem[]

  /**
   * 触发右键的原始事件
   */
  event?: MouseEvent
  bodyClass?: string
  itemClass?: string
  renderItem?: unknown
  renderBody?: unknown
}

export type ContextMenuState = {
  isOpen: boolean
  id: string | null
  x: number
  y: number
  items: ContextMenuItem[]
  event?: MouseEvent
  bodyClass?: string
  itemClass?: string
  renderItem?: unknown
  renderBody?: unknown
}

export type ContextMenuListener = (state: ContextMenuState) => void

const state: ContextMenuState = {
  isOpen: false,
  id: null,
  x: 0,
  y: 0,
  items: []
}

const listeners = new Set<ContextMenuListener>()

export function openContextMenu(options: ContextMenuOpenOptions) {
  state.isOpen = true
  state.id = options.id
  state.x = options.x
  state.y = options.y
  state.items = options.items
  state.event = options.event
  state.bodyClass = options.bodyClass
  state.itemClass = options.itemClass
  state.renderItem = options.renderItem
  state.renderBody = options.renderBody

  emit()
}

export function closeContextMenu() {
  state.isOpen = false
  state.id = null
  state.items = []
  state.event = undefined

  emit()
}

export function getContextMenuState() {
  return state
}

export function subscribeContextMenu(listener: ContextMenuListener) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

function emit() {
  listeners.forEach((listener) => {
    listener({ ...state })
  })
}
