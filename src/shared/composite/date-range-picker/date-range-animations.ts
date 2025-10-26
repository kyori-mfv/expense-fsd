/**
 * CSS animation for date picker step transitions
 * Respects user's prefers-reduced-motion setting (WCAG 2.1 compliant)
 */
export const DATE_PICKER_ANIMATIONS = `
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    @keyframes fadeSlideIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  ion-datetime::part(month-year-button) {
    text-transform: capitalize;
  }
`;

/**
 * Animation style for step transition wrapper
 */
export const STEP_TRANSITION_STYLE = {
  animation: "fadeSlideIn 0.3s ease-out",
} as const;

/**
 * Header date display transition style
 */
export const HEADER_TRANSITION_STYLE = {
  transition: "all 0.3s ease-out",
} as const;

/**
 * Header container style (prevents layout shift)
 */
export const HEADER_CONTAINER_STYLE = {
  minHeight: "80px",
} as const;
