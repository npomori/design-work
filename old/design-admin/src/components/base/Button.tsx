import type { ButtonAttr } from '@/types/component'
import { Icon } from '@iconify/react'
import type { AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  default:
    'border text-gray-900 bg-white border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-primary-300',
  primary: 'text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300',
  secondary:
    'text-white bg-secondary-700 hover:bg-secondary-800 focus:ring-4 focus:ring-secondary-300',
  accent: 'text-white bg-accent-700 hover:bg-accent-800 focus:ring-4 focus:ring-accent-300',
  info: 'text-white bg-info-700 hover:bg-info-800 focus:ring-4 focus:ring-info-300',
  success: 'text-white bg-success-700 hover:bg-success-800 focus:ring-4 focus:ring-success-300',
  warning: 'text-white bg-warning-700 hover:bg-warning-800 focus:ring-4 focus:ring-warning-300',
  error: 'text-white bg-error-700 hover:bg-error-800 focus:ring-4 focus:ring-error-300',
  icon: 'rounded p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
}
const baseClass = 'inline-flex items-center justify-center text-center font-medium rounded-lg'
const disabledClass = 'pointer-events-none opacity-50'

/**
 * 公開画面のボタン。取得処理は持たず、見た目だけを再現する。
 */
const Button = ({
  variant = 'default',
  size = 'lg',
  target,
  text,
  icon = '',
  isIconRight = false,
  class: classProp = '',
  className,
  type = 'button',
  children,
  disabled,
  ...rest
}: ButtonAttr) => {
  const extraClass = className ?? classProp
  let mergedClass = twMerge(baseClass, variants[variant])
  if (disabled) mergedClass = twMerge(mergedClass, disabledClass)

  if (size === 'sm') {
    mergedClass = twMerge(mergedClass, 'px-1 py-1')
  } else if (size === 'md') {
    mergedClass = twMerge(mergedClass, 'px-3 py-2')
  } else if (size === 'lg') {
    mergedClass = twMerge(mergedClass, 'px-5 py-2.5')
  }

  return type === 'button' || type === 'submit' || type === 'reset' ? (
    <span className={disabled ? 'cursor-not-allowed' : ''}>
      <button
        type={type}
        className={twMerge(mergedClass, extraClass, !disabled && 'cursor-pointer')}
        disabled={disabled}
        {...rest}
      >
        {icon && !isIconRight ? <Icon icon={icon} className="mr-1 h-4 w-4" /> : ''}
        {text ? text : children}
        {icon && isIconRight ? <Icon icon={icon} className="ml-1 h-4 w-4" /> : ''}
      </button>
    </span>
  ) : variant === 'icon' ? (
    <a
      className={twMerge(mergedClass, extraClass, 'cursor-pointer')}
      {...(target ? { target, rel: 'noopener noreferrer' } : {})}
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {icon && <Icon icon={icon} className="h-8 w-8" />}
    </a>
  ) : (
    <a
      className={twMerge(mergedClass, extraClass, 'cursor-pointer')}
      {...(target ? { target, rel: 'noopener noreferrer' } : {})}
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {icon && !isIconRight ? <Icon icon={icon} className="mr-1 h-4 w-4" /> : ''}
      {text ? text : children}
      {icon && isIconRight ? <Icon icon={icon} className="ml-1 h-4 w-4" /> : ''}
    </a>
  )
}

export default Button
