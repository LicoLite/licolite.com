(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hero = document.querySelector(".hero");
  const canvas = document.querySelector("#mesh-field");
  const context = canvas?.getContext("2d", { alpha: true });

  const pointer = { x: 0.72, y: 0.38, targetX: 0.72, targetY: 0.38 };
  let frame = 0;
  let heroVisible = true;
  let width = 0;
  let height = 0;
  let ratio = 1;

  const updatePointerTokens = (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    root.style.setProperty("--mx", `${x}%`);
    root.style.setProperty("--my", `${y}%`);

    if (!hero) return;
    const bounds = hero.getBoundingClientRect();
    pointer.targetX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    pointer.targetY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
  };

  hero?.addEventListener("pointermove", updatePointerTokens, { passive: true });

  const resizeCanvas = () => {
    if (!canvas || !context || !hero) return;
    const bounds = hero.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(bounds.width));
    height = Math.max(1, Math.round(bounds.height));
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawField(true);
  };

  const drawField = (staticFrame = false) => {
    if (!context || !width || !height) return;

    if (!staticFrame) {
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;
    }

    context.clearRect(0, 0, width, height);
    context.save();
    context.globalCompositeOperation = "source-over";

    const focalX = width * pointer.x;
    const focalY = height * pointer.y;
    const lineCount = width < 720 ? 20 : 34;
    const span = Math.max(width, height) * 0.78;
    const time = staticFrame || reduceMotion.matches ? 0 : performance.now() * 0.00022;

    for (let index = 0; index < lineCount; index += 1) {
      const phase = index / (lineCount - 1);
      const y = height * (0.12 + phase * 0.78);
      const bend = Math.sin(phase * Math.PI + time) * height * 0.065;
      const proximity = 1 - Math.min(1, Math.abs(y - focalY) / (height * 0.48));
      const alpha = 0.055 + proximity * 0.12;

      context.beginPath();
      context.moveTo(width * 0.42 - span, y + bend * 0.25);
      context.bezierCurveTo(
        focalX - width * 0.22,
        y - bend,
        focalX - width * 0.08,
        focalY + (y - focalY) * 0.18,
        focalX,
        focalY + (y - focalY) * 0.08,
      );
      context.bezierCurveTo(
        focalX + width * 0.12,
        focalY + (y - focalY) * 0.12,
        focalX + width * 0.26,
        y + bend,
        width + span * 0.32,
        y - bend * 0.2,
      );
      context.strokeStyle = `rgba(242, 244, 239, ${alpha})`;
      context.lineWidth = index % 7 === 0 ? 1.2 : 0.55;
      context.stroke();
    }

    const slashLength = Math.min(width, height) * 0.48;
    context.translate(focalX, focalY);
    context.rotate(Math.PI * 0.235);
    context.fillStyle = "rgba(200, 255, 52, 0.82)";
    context.fillRect(-1.2, -slashLength / 2, 2.4, slashLength);
    context.fillStyle = "rgba(255, 92, 26, 0.7)";
    context.fillRect(7, slashLength * 0.08, 1.2, slashLength * 0.22);
    context.restore();
  };

  const animate = () => {
    if (!heroVisible || reduceMotion.matches) {
      frame = 0;
      return;
    }

    drawField();
    frame = window.requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (!frame && heroVisible && !reduceMotion.matches) {
      frame = window.requestAnimationFrame(animate);
    }
  };

  if (hero && canvas && context) {
    const canvasResize = new ResizeObserver(resizeCanvas);
    canvasResize.observe(hero);

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      if (!heroVisible) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        return;
      }

      if (reduceMotion.matches) {
        drawField(true);
      } else {
        startAnimation();
      }
    });
    heroObserver.observe(hero);

    resizeCanvas();
    startAnimation();

    reduceMotion.addEventListener("change", () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      if (reduceMotion.matches) {
        drawField(true);
      } else {
        startAnimation();
      }
    });
    window.addEventListener(
      "pagehide",
      () => {
        window.cancelAnimationFrame(frame);
        canvasResize.disconnect();
        heroObserver.disconnect();
      },
      { once: true },
    );
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );

  document.querySelectorAll(".reveal, .control").forEach((element) => {
    revealObserver.observe(element);
  });

  const magneticElements = document.querySelectorAll("[data-magnetic]");
  magneticElements.forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      if (reduceMotion.matches || event.pointerType === "touch") return;
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      element.style.transform = `translate3d(${x * 0.13}px, ${y * 0.16}px, 0)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "translate3d(0, 0, 0)";
    });
  });
})();
