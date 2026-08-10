# Third-party notices

Both notices below were read off the projects' own `LICENSE` files, not off a
badge, a README or a marketing page.

Neither is a runtime dependency. Nothing here is installed from npm; the
relevant material is inlined into this repo's source, which is exactly why the
notices have to travel with it.

---

## Tabler Icons

**Attribution is required here.** Every 24x24 glyph in
`src/components/icons.tsx` is Tabler path data, copied verbatim from the
`outline` pack at v3.46.0. Verbatim copying of a substantial portion is the
case MIT's notice condition is written for. The only edits are the stroke
weight, which is set to TAK's measured 1.5 rather than Tabler's 2, and the
removal of each file's transparent `M0 0h24v24H0z` bounding path.

Source: https://tabler.io/icons

```
MIT License

Copyright (c) 2020-2026 Paweł Kuna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Watermelon UI

**Attribution is not strictly required here, and is recorded anyway.** No
Watermelon code is present in this repo. Their components are built on Radix
through shadcn's `Accordion`, which this project does not use and did not add;
what was taken from `accordion-03` and `accordion-05` is structure, described in
the header comment of `src/components/faq-accordion.tsx`. Adapting a structure
into a different implementation and a different token set does not trigger the
notice condition. It is written down because "we only took the structure" is a
judgement, and a judgement is worth stating in public rather than leaving in a
commit message.

Two things were deliberately not taken: their `text-foreground/20` treatment for
collapsed rows, which fails text contrast, and their palette.

Source: https://github.com/WatermelonCorp/watermellon-registry

```
MIT License

Copyright (c) 2025-present Watermelon Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
