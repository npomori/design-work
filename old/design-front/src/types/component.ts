import type { HTMLAttributes, ReactNode } from 'react'

/** ボタンの見た目バリアント */
export interface ButtonAttr extends HTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'icon'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  icon?: string
  isIconRight?: boolean | string
  class?: string
  type?: 'button' | 'submit' | 'reset' | 'link'
  children?: ReactNode
  disabled?: boolean
  target?: string
}
