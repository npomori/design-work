import React, { useEffect, useState } from 'react'

const ImageModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setImageSrc(event.detail.src)
      setImageAlt(event.detail.alt)
      setIsOpen(true)
      setShowHint(true) // モーダルが開くたびにヒントを表示
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // スクロール防止

      // 2秒後にヒントを非表示にする
      const timer = setTimeout(() => {
        setShowHint(false)
      }, 2000)

      return () => {
        clearTimeout(timer)
      }
    }

    window.addEventListener('openImageModal', handleOpenModal as EventListener)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      window.removeEventListener('openImageModal', handleOpenModal as EventListener)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div className="relative max-h-full max-w-5xl">
        {/* 画像コンテナ */}
        <div
          className="flex items-center justify-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            minHeight: '60vh',
            position: 'relative'
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-[80vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none'
            }}
          />

          {/* 閉じるボタン */}
          <button
            onClick={handleClose}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              position: 'absolute',
              top: '-0.5rem',
              right: '-0.5rem',
              zIndex: '10',
              display: 'flex',
              height: '3rem',
              width: '3rem',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              fontSize: '2rem',
              fontWeight: '300',
              color: 'white',
              transition: 'color 0.2s',
              border: 'none',
              cursor: 'pointer',
              lineHeight: '1',
              padding: '0',
              margin: '0'
            }}
            aria-label="閉じる"
          >
            <span
              style={{
                display: 'inline-block',
                lineHeight: '1',
                transform: 'translateY(-1px)',
                fontSize: '2rem',
                fontWeight: '300'
              }}
            >
              ×
            </span>
          </button>

          {/* ナビゲーションヒント */}
          {showHint && (
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '0.5rem',
                padding: '0.25rem 0.75rem',
                fontSize: '0.875rem',
                color: 'white',
                opacity: showHint ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                width: 'auto',
                minWidth: 'fit-content',
                zIndex: '10000',
                pointerEvents: 'none',
                marginTop: '0.5rem'
              }}
            >
              ESCキーまたはクリックで閉じる
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageModal
