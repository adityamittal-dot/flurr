export const INSTAGRAM_HANDLE = 'flurr_co'
/** International format, digits only, e.g. '919876543210'. Leave empty to hide WhatsApp options. */
export const WHATSAPP_NUMBER = ''

export const PROFILE_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`
export const DM_URL = `https://ig.me/m/${INSTAGRAM_HANDLE}`

export const hasWhatsApp = WHATSAPP_NUMBER.trim().length > 0

export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER.trim()}?text=${encodeURIComponent(text)}`
}
