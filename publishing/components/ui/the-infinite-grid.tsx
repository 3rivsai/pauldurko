"use client";

import { WebGLShader } from "@/components/ui/web-gl-shader";

export const Component = () => {
  return (
    <section
      className="wave-hero relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-4 py-28 text-foreground"
      id="top"
    >
      <WebGLShader className="hero-wave-canvas absolute inset-0 z-0 h-full w-full" />

      <div className="hero-copy-stack relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="hero-pill">For people with audiences who want to create real change</p>
        <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-foreground drop-shadow-sm md:text-7xl">
          You could be making a much bigger impact
        </h1>
        <p className="hero-subcopy max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
          I help you make it a reality by turning what your audience already
          values about you into a structured product, program, or platform they
          can actually use.
        </p>

        <div className="hero-actions flex flex-wrap justify-center gap-3">
          <a className="button secondary" href="#problem">
            See The Opportunity
          </a>
        </div>
      </div>
    </section>
  );
};
