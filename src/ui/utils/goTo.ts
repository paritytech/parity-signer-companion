export const goTo = (addr?: string) => {
  if (addr) window.location.hash = addr
}
