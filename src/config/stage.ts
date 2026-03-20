/**
 * Stage flag — controls which features are visible on the live site.
 *
 * STAGE 0 — public-safe: hides CTAs and the API/Race Funnel sections.
 * STAGE 1 — full release: everything visible.
 *
 * To promote to Stage 1, change the value below to 1 and redeploy.
 */
export const STAGE: 0 | 1 = 0;

export const isStage1 = STAGE >= 1;
