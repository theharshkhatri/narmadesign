# ObsidianUI Art Gallery integration

The homepage category image gallery uses the published ObsidianUI Art Gallery source,
downloaded from:

<https://www.obsidianui.dev/r/art-gallery.json>

ObsidianUI publishes the component repository under the MIT license:

<https://github.com/Atharvsinh-codez/ObsidianUI/blob/main/LICENSE>

The integrated files are kept under `components/vendor/obsidianui/`,
`components/ui/`, and `lib/effects/shared/`. The demo image URLs and demo
captions were not used. The gallery receives the locally supplied category
images and category labels instead.

The published component includes:

- WebGL texture atlas rendering and the lensed grid treatment.
- Pointer drag and zoom behavior.
- WebGL capability fallback.
- Reduced-motion handling.
- Loading and cleanup states.

The NARMA wrapper adds the project visual treatment. The supplied PNGs are
preserved, and the site uses optimized WebP copies for responsive delivery and
the WebGL texture atlas.
