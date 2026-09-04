import 'flowbite/dist/flowbite.min.js'

// 地図フォーカス機能のグローバル関数
window.focusOnMap = function (locationName) {
  console.log('focusOnMap called with:', locationName)

  // カスタムイベントを発火
  const event = new CustomEvent('focusLocation', {
    detail: { location: locationName }
  })
  window.dispatchEvent(event)

  // 地図セクションまでスクロール
  const mapSection = document.querySelector('.map-section')
  if (mapSection) {
    const offset = 100 // ナビゲーションバーの高さ分のオフセット
    const targetPosition = mapSection.offsetTop - offset

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}
