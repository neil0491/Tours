import { gsap } from "gsap";
import { tsParticles } from "tsparticles";

const cloudFirst = document.querySelector("#cloud-first");
const cloudSecond = document.querySelector("#cloud-second");
const first = document.querySelector("#first");
const second = document.querySelector("#second");
const third = document.querySelector("#third");
const heroTitle = document.querySelectorAll(".hero__title");
const box = document.querySelectorAll("#box");
const circules = document.querySelectorAll("#circules");

let tl = gsap
  .timeline({ repeat: -1 })
  .fromTo(
    first,
    19,
    { x: "-100%", duration: 1, opacity: 1, ease: "slow" },
    { x: -100, duration: 10, opacity: 0 },
    0.5
  )
  .fromTo(
    second,
    { x: -1000, duration: 3, opacity: 0 },
    { x: 500, duration: 10, opacity: 1 },
    0.2
  );

tl = gsap
  .timeline({ repeat: 0 })
  .to(third, { x: 900, duration: 8, opacity: 1, ease: "back" })
  .to(
    box,
    {
      y: 20,
      scale: 1.15,
      duration: 4,
      repeat: 100,
      repeatDelay: 1,
      yoyo: true,
      ease: "power1.inOut",
    },
    -0.1
  )
  .to(
    circules,
    {
      y: 20,
      x: -50,
      scale: 1.1,
      translateX: -100,
      duration: 5,
      repeat: -1,
      repeatDelay: 1,
      yoyo: true,
      ease: "power1.inOut",
    },
    1
  )
  .fromTo(
    heroTitle,
    { x: "100%", duration: 3, opacity: 0 },
    { x: 100, duration: 5, opacity: 1, ease: "back" },
    -0.2
  )
  .from(
    cloudFirst,
    { duration: 3, x: 500, y: -100, scale: 0.5, skewX: 45 },
    -0.1
  )
  .from(
    cloudSecond,
    { y: -100, scaleY: 0, opacity: 0, duration: 1, ease: "back" },
    3
  );

tsParticles.load("tsparticles", {
  fpsLimit: 60,
  background: {
    color: {
      value: "",
    },
  },
  fullScreen: {
    enable: false,
    zIndex: -1,
  },
  particles: {
    color: {
      value: "#84aabb80",
    },
    links: {
      color: "#c7c7c773",
      distance: 150,
      enable: true,
      opacity: 1,
      width: 1
    },
    number: { value: 120 },
    move: {
      enable: true,
      speed: 5,
      outModes: {
        default: "bounce",
      },
    },
    size: {
      value: 4,
      random: {
        enable: true,
        minimumValue: 1
      },
      animation: {
        enable: true,
        speed: 10,
        minimumValue: 1
      }
    },
    opacity: {
      value: 0.8,
      random: {
        enable: true,
        minimumValue: 0.1
      }
    }
  },
});
