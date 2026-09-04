/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'remark-gfm' {
  import type { Plugin } from 'unified'
  const gfm: Plugin<[]>
  export default gfm
}
