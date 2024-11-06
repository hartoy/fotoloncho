export const processImage = async (file) => {
  const image = await createImageBitmap(file)

  const canvas = document.createElement('canvas')
  canvas.width = 80
  canvas.height = 80
  const ctx = canvas.getContext('2d')

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  const webpBlob = await new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob)
      },
      'image/webp',
      0.5
    )
  })

  return webpBlob
}
