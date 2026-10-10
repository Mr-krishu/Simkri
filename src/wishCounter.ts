// Shared lantern wishes use Supabase's public Data API with a publishable key.
// No secret/service-role keys belong in the browser or this repository.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.trim().replace(/\/$/, '')
const SUPABASE_KEY = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY
)?.trim()

export const sharedWishesConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY)

const LOCAL_WISHES_KEY = 'simkri-wedding-lantern-wishes-v1'

export function readLocalWishCount(): number {
  try {
    const value = Number(localStorage.getItem(LOCAL_WISHES_KEY))
    return Number.isSafeInteger(value) && value > 0 ? value : 0
  } catch {
    return 0
  }
}

export function saveLocalWishCount(count: number): void {
  try {
    localStorage.setItem(LOCAL_WISHES_KEY, String(count))
  } catch {
    // Private browsing, disabled storage, or quota errors must not break wishes.
  }
}

async function counterRpc(functionName: 'get_wedding_wishes' | 'release_wedding_lantern'): Promise<number> {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Shared lantern counter not configured')

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${functionName}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json',
    },
    body: '{}',
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error(`Lantern counter request failed (${response.status})`)
  }

  const payload: unknown = await response.json()
  if (typeof payload !== 'number' || !Number.isSafeInteger(payload) || payload < 0) {
    throw new Error('Lantern counter returned an unexpected value')
  }
  return payload
}

export const getSharedWishCount = () => counterRpc('get_wedding_wishes')
export const releaseSharedWish = () => counterRpc('release_wedding_lantern')
