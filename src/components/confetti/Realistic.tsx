import { CreateTypes } from "canvas-confetti";
import { Component } from "react";
import ReactCanvasConfetti from "./ReactCanvasConfetti";

interface RealisticProps {}

export default class Realistic extends Component<RealisticProps> {
  private isAnimationEnabled: boolean;
  private animationInstance: CreateTypes | null = null;

  constructor(props: RealisticProps) {
    super(props);
    this.isAnimationEnabled = false;
    this.fire = this.fire.bind(this);
  }

  makeShot(particleRatio: number, opts: object) {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.8 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }

  fire() {
    this.makeShot(0.1, {
      spread: 200,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    this.makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }

  handlerFire = () => {
    if (!this.isAnimationEnabled) {
      this.isAnimationEnabled = true;
    }
    requestAnimationFrame(this.fire);
    this.fire();
  };

  getInstance = (instance: CreateTypes | null) => {
    this.animationInstance = instance;
  };

  componentDidMount() {
    this.handlerFire(); // Trigger confetti on mount
    setInterval(this.handlerFire, 3000); // Execute handlerFire every 3 seconds
  }

  render() {
    return (
      <ReactCanvasConfetti
        refConfetti={this.getInstance}
        className="canvas"
      />
    );
  }
}
