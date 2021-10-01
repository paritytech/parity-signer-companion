export async function checkCameraAccess() {
  try {
    const permission = await navigator.permissions.query({
      name: 'camera' as PermissionName,
    })
    return permission.state == 'granted'
  } catch (error) {
    console.error(error)
    return false
  }
}
