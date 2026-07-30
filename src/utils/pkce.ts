function base64UrlEncode(buffer: Uint8Array): string {
  let str = ''
  buffer.forEach((byte) => (str += String.fromCharCode(byte)))

  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32)

  crypto.getRandomValues(array)

  return base64UrlEncode(array)
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return base64UrlEncode(new Uint8Array(digest))
}

export async function createPkcePair() {
  const verifier = generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)
  return { verifier, challenge }
}
