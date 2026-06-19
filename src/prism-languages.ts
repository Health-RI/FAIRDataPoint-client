import PrismJs from 'prismjs'
import 'prismjs/components/prism-turtle'
import 'prismjs/components/prism-sparql'

const prismGlobal = globalThis as typeof globalThis & { Prism?: typeof PrismJs }

export function registerPrismLanguages(): void {
  prismGlobal.Prism = PrismJs
}
