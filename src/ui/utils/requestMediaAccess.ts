/**
 * Request permission for video, based on access we can hide/show import
 */
export const requestMediaAccess = async (
  cameraOn: boolean
): Promise<boolean> => {
  if (!cameraOn) return false

  try {
    await navigator.mediaDevices.getUserMedia({ video: true })
    return true
  } catch (error) {
    console.error('Permission for video declined', (error as Error).message)
    return false
  }
}
