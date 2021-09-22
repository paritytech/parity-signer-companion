export const checkCameraAccess = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices
      .filter((d) => d.kind === 'videoinput')
      .some((d) => d.deviceId)
  } catch (error) {
    console.error(error)
    return false
  }
}
