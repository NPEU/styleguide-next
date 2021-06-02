---
layout: structure--basic
title: NPEU Styleguide
project_base_url: styleguide
---

* [Elements](elements)
* [Pages](pages)
* [Patterns](patterns)


Notes
-----

### Script

There isn't much script used on this site (deliberately) and where it is used it's used in a progressivley-enhanced way.

Patterns are styled with assumption that script is unavailable.
The script itself is responsible for adding a js-xyz class to the HTML tag (for reasons explained later) and styling that's dependant on the JS being avaialbe is scoped to that class.
E.g. `.js-xyc c-xyz {...}`

#### Why the HTML Tag for .js-xyz Classes?

The reason for this is so that we can inform the entire document that the the given script has loaded.
Whilst each pattern is meant to be self-contained in that it's base and js styles are included in the same SCSS file, we can't say for sure that there may be other changes elsewhere in the page not related to the pattern that may need to occure only if the script is avaialble.

For example, a complex map may need comprehesive instructions, perhaps even explanatory images to instruct a user how to use the map.
It may well be desireable for the whole instruction section to be hidden if the map hasn't loaded.
