/**
 * Create a WhatsApp-compatible JPEG in the Vite public directory before the
 * production build. WhatsApp does not reliably create previews from SVGs.
 * This uses our real wedding artwork (including Om and Ek Onkar), rather
 * than an unrelated stock or placeholder illustration.
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const source = resolve(root, 'public/fusion-wedding-hero.webp')
const output = resolve(root, 'public/whatsapp-preview.jpg')

const image = await sharp(source)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .flatten({ background: '#fff7e8' })
  .jpeg({ quality: 80, progressive: true, mozjpeg: true })
  .toFile(output)

console.log(`Wedding social preview: ${image.width}×${image.height}, ${Math.round(image.size / 1024)} KB`)
