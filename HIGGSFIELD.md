# Hero and section videos with Higgsfield

The site is ready for short, silent, looping videos. Generate them in Higgsfield, export MP4 (H.264),
**1920×1080, 6–10 s, seamless loop, under ~6 MB**, and drop them into `public/media/`.

To switch the hero from photo to video, set in `src/content/site.ts`:

```ts
heroVideo: "/media/hero.mp4",
```

The hero photo stays as the poster frame and the fallback on slow connections.

> Workbook rule: AI footage is fine for **atmosphere**, but it must never be presented as a real Serviceberry project.
> Use genuine company photos for projects, equipment and case studies.

## Prompts

Keep a consistent look: dusk / blue hour, deep navy shadows, warm amber highlights, slow camera, no text, no logos.

**1. `hero.mp4`: offshore platform**
> Slow cinematic drone orbit around an offshore oil and gas production platform at blue hour, calm dark ocean,
> warm amber deck lights, light sea haze, subtle waves, photorealistic, steady gimbal motion, no people close up,
> no text, seamless loop.

**2. `pipeline.mp4`: pipeline right-of-way (alternative hero)**
> Low aerial tracking shot flying along a large steel pipeline through lush tropical Niger Delta vegetation at sunrise,
> mist over the ground, golden rim light on the pipe, slow forward motion, photorealistic, no text, seamless loop.

**3. `pigging.mp4`: pig launcher (for the pigging section or service page)**
> Close cinematic shot of a pipeline pig launcher on an industrial site, engineer in orange coveralls and white hard hat
> closing the launcher door, steam and soft light, shallow depth of field, slow push-in, photorealistic, no text.

**4. `academy.mp4`: learning**
> Young West African engineers in PPE reviewing a tablet beside process equipment, warm natural light, slow
> parallax camera move, hopeful mood, photorealistic, no text, seamless loop.

Use Higgsfield's camera presets (orbit, slow dolly-in, FPV glide) for the motion; keep moves slow so headlines stay readable.
