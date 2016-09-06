import { expect } from 'chai';
import BowlingGame from '../src/BowlingGame';

describe('Bowling Game', () => {
  let playerOne;

  beforeEach(() => {
    playerOne = new BowlingGame();
  });

  describe('Game player creation', () => {
    it('creates player', () => {
      expect(playerOne).to.be.an.instanceof(BowlingGame);
    });
  });

  describe('Regular game without getting any pin(s) down', () => {
    it('should NOT have any pin(s) down and ZERO score', () => {
      playerOne.rollRange(20, 0);
      expect(playerOne.getTotalScore()).to.equal(0);
    });
  });

  describe('Regular game with one pin down on each frame', () => {
    it('should have 20 Points', () => {
      playerOne.rollRange(20, 1);
      expect(playerOne.getTotalScore()).to.equal(20);
    });
  });

  describe('Regular game with spare(s)', () => {
    it('should validate game with one spare', () => {
      playerOne.roll(5);
      playerOne.roll(5);
      playerOne.roll(2);
      playerOne.roll(1);
      playerOne.rollRange(18, 0);
      expect(playerOne.getTotalScore()).to.equal(15);
    });
    it('should validate game with two spares', () => {
      playerOne.roll(5);
      playerOne.roll(5);
      playerOne.roll(2);
      playerOne.roll(1);
      playerOne.roll(5);
      playerOne.roll(5);
      playerOne.roll(2);
      playerOne.roll(1);
      playerOne.rollRange(16, 0);
      expect(playerOne.getTotalScore()).to.equal(30);
    });
  });
  describe('Regular game with strike(s)', () => {
    it('should validate game with one strike', () => {
      playerOne.roll(10);
      playerOne.roll(2);
      playerOne.roll(1);
      playerOne.rollRange(18, 0);
      expect(playerOne.getTotalScore()).to.equal(16);
    });
    it('should validate game with two strikes', () => {
      playerOne.roll(10);
      playerOne.roll(2);
      playerOne.roll(1);
      playerOne.roll(10);
      playerOne.roll(2);
      playerOne.roll(1);
      playerOne.rollRange(16, 0);
      expect(playerOne.getTotalScore()).to.equal(32);
    });
  });
  describe('Regular game with a strike and a spare', () => {
    it('should validate game with one strike and a spare', () => {
      playerOne.roll(10);
      playerOne.roll(5);
      playerOne.roll(5);
      playerOne.roll(1);
      playerOne.roll(1);
      playerOne.rollRange(17, 0);
      expect(playerOne.getTotalScore()).to.equal(33);
    });
  });
});
