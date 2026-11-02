// Match the reference's default introSpeed and damped spring curve.
export const INTRO_SPEED = 0.7;
export const introTime = (milliseconds: number) => milliseconds / INTRO_SPEED;

function springCurve(bounce: number, duration: number) {
  const damping = Math.max(0.05, 1 - bounce);
  const frequency = Math.log(1000) / (damping * duration);
  const damped = frequency * Math.sqrt(1 - damping * damping);
  return (progress: number) => {
    if (progress === 1) return 1;
    const time = duration * progress;
    return (
      1 -
      Math.exp(-damping * frequency * time) *
        (Math.cos(damped * time) +
          ((damping * frequency) / damped) * Math.sin(damped * time))
    );
  };
}

// CSS and Web Animations can run this sampled curve on the compositor.
function sampleSpring(bounce: number, duration: number) {
  const curve = springCurve(bounce, duration);
  return `linear(${Array.from({ length: 61 }, (_, index) => +curve(index / 60).toFixed(4)).join(",")})`;
}
export const BOUNCE = sampleSpring(0.55, 0.9);
export const GLIDE = sampleSpring(0.28, 1.5);
export const ZOOM = sampleSpring(0.42, 1);
