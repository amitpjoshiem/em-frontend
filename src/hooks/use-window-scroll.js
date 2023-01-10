export function useWindowScrollTo() {
  function scrollTo() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  return {
    scrollTo,
  }
}
