'use strict';

class BowlingGame {
  constructor() {
    // Default configuration of bowling game
    this.maxIndexFrame = 2;
    this.maxFrames = 10;
    this.maxPinsDown = 10;
    this.frames = [];
    this.rolls = [];
  }

  roll(pins) {
    if (this.frames.length < this.maxFrames) {
      this.rolls.push(pins);
      if (this.isLastIndexOfFrame()) {
        this.getNextFrame();
      }
    }
  }

  rollRange(attempts, pinsDown) {
    for (let count = 0; count <= attempts; count++) {
      this.roll(pinsDown);
    }
  }

  isLastIndexOfFrame() {
    return this.rolls.length >= this.maxIndexFrame || this.isStrike(this.rolls);
  }

  getNextFrame() {
    if (this.frames.length < this.maxFrames) {
      this.frames.push(this.rolls);
    }
    this.rolls = [];
  }

  isStrike(roll) {
    return roll[0] === this.maxPinsDown;
  }

  isSpare(roll) {
    return roll[0] + roll[1] === this.maxPinsDown;
  }

  getTotalScore() {
    let score = 0;
    for (let index = 0; index < this.frames.length; index++) {
      const currentFrame	= this.frames[index];
      const nextFrame = this.frames[index + 1];
      if (this.isStrike(currentFrame)) {
        score += this.getPointsFrom(currentFrame) + this.getStrikeBonus(nextFrame);
			} else if (this.isSpare(currentFrame)) {
				score += this.getPointsFrom(currentFrame) + this.getSpareBonus(nextFrame);
			} else {
        score += this.getPointsFrom(currentFrame);
			}
		}
    return score;
  }

  getStrikeBonus(frame) {
    return frame[0] + frame[1];
  }

  getSpareBonus(frame) {
    if (this.rolls.length) return this.rolls[0];
    return frame[0];
  }

  getPointsFrom(frame) {
    return frame.reduce((previous, current) => {
      return previous + current;
    });
  }
}

export default BowlingGame;
