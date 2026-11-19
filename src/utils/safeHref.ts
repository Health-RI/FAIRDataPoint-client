// Metadata values that become link targets (RdfLink and the other components below)
// come straight out of RDF the client did not author: a record's own fields, or an
// index entry supplied by another FAIR Data Point. RDF has no rule that a named node
// must be http(s), so a stored value such as `javascript:...` is a legal term and
// reaches these bindings untouched. Browsers execute a javascript: URL's body when a
// link using it is activated, in the page's own origin, so binding such a value
// straight to :href is an click-triggered XSS sink regardless of Vue's attribute
// escaping (escaping does not help here — the scheme itself is the problem, not any
// character in it).
//
// Only allow the two schemes a metadata link is actually meant to carry; anything
// else (javascript:, data:, vbscript:, a bare scheme-relative string that resolves
// to one of those, ...) is rejected outright so the browser never navigates to it.
export default function safeHref(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length === 0) {
    return undefined
  }

  try {
    const url = new URL(value, window.location.origin)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return value
    }
  } catch {
    // Not a parseable URL at all — fall through to returning undefined below.
  }

  return undefined
}
