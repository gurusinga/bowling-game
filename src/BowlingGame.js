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
      this.checkFrame();
    }
  }

  checkFrame() {
    return this.isLastIndexOfFrame() ? this.getNextFrame() : false;
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

  isNextArray(nextFrame) {
    return Array.isArray(nextFrame);
  }

  isStrike(frame) {
    return this.getFirstIndex(frame) === this.maxPinsDown;
  }

  isSpare(frame) {
    return this.getPointsFrom(frame) === this.maxPinsDown;
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

  getStrikeBonus(nextFrame) {
    return this.isNextArray(nextFrame) ? this.getPointsFrom(nextFrame) : false;
  }

  getSpareBonus(nextFrame) {
    return this.rolls.length ? this.rolls[0] : this.getFirstIndex(nextFrame);
  }

  getPointsFrom(currentFrame) {
    return currentFrame.reduce((previous, current) => previous + current);
  }

  getFirstIndex(frame) {
    return frame[0];
  }
}

export default BowlingGame;
