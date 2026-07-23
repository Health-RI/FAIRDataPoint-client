import Prism from 'prismjs'

// Prism language components (prism-turtle, prism-sparql, ...) reference a free
// global `Prism` at module-evaluation time. Expose it on the global object
// before those components are imported so the bare reference resolves. This
// works in both the dev server and the production build, unlike relying on a
// bundler transform hook (which esbuild dep pre-bundling can bypass in dev).
;(globalThis as unknown as { Prism: typeof Prism }).Prism = Prism

export default Prism
