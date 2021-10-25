export async function checkCameraAccess() {
  try {
    const permission = await navigator.permissions.query({
      name: 'camera' as PermissionName,
    })
    return permission.state === 'granted'
  } catch (error) {
    // Firefox can't query 'camera' permission
    if (isCameraPermissionDescriptorError(error as Error)) {
      return await checkIfVideoDeviceHasLabel()
    }

    console.error(error)
    return false
  }
}

function isCameraPermissionDescriptorError(error: Error) {
  return (
    (error as Error).name === 'TypeError' &&
    (error as Error).message.startsWith("'camera'")
  )
}

// For security reasons, the `label` field is always blank
// unless the user has granted persistent permission for media device access
// @see: https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo
async function checkIfVideoDeviceHasLabel() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.some((d) => d.kind === 'videoinput' && d.label)
  } catch (error) {
    console.error(error)
    return false
  }
}
