describe('Scorecard', function () {
  var frameOne, scorecard

  beforeEach(function () {
    scorecard = new Scorecard()
    frameOne = jasmine.createSpyObj('frameOne', ['rollOneScore', 'rollTwoScore', 'frameScore'])
  })

  describe('a new scorecard', function () {
    it('begins on frame number 1', function () {
      expect(scorecard.frameNumber).toEqual(1)
    })

    it('begins with an empty array of frames', function () {
      expect(scorecard.frames).toEqual([])
    })

    it('has a starting total score of 0', function () {
      expect(scorecard.totalScore).toEqual(0)
    })
  })

  describe('#rollOne', function () {
    it('sends the current frame a method to update the roll 1 score', function () {
      scorecard.rollOne(2, frameOne)
      expect(frameOne.rollOneScore).toHaveBeenCalledWith(2)
    })

    it('adds a new frame to the frames array', function () {
      scorecard.rollOne(2, frameOne)
      expect(scorecard.frames).toContain(frameOne)
    })
  })

  describe('#rollTwo', function () {
    it('sends the current frame a method to update the roll 2 score', function () {
      scorecard.rollOne(2, frameOne)
      scorecard.rollBall(2)
      expect(frameOne.rollTwoScore).toHaveBeenCalledWith(2)
    })
  })

  describe('calculating running score', function () {
    it('in the first frame it calculates after the 2nd roll if there are no spares or strikes', function () {
      scorecard.rollBall(2)
      scorecard.rollBall(2)
      expect(scorecard.totalScore).toEqual(4)
    })
  })

  describe('keeping track of frames', function () {
    it('increases the frame number by 1 when a new frame starts', function () {
      scorecard.rollBall(2)
      expect(scorecard.frameNumber).toEqual(2)
    })
  })

  describe('a round with a spare', function () {
    it('won\'t add a score to the total score at the end of the second roll if it was a spare', function () {
      scorecard.rollBall(2)
      scorecard.rollBall(8)
      expect(scorecard.totalScore).toEqual(0)
    })

    it('calculates the spare bonus correctly', function () {
      scorecard.rollBall(2)
      scorecard.rollBall(8)
      scorecard.rollBall(2)
      scorecard.rollBall(0)
      expect(scorecard.totalScore).toEqual(14)
    })
  })

  describe('a round with a strike', function () {
    it('calculates the strike bonus correctly when a strike is rolled on the first turn', function () {
      scorecard.rollBall(10)
      scorecard.rollBall(2)
      scorecard.rollBall(7)
      expect(scorecard.totalScore).toEqual(28)
    })

    it('calculates the strike bonus correctly when a strike is rolled on the third turn', function () {
      scorecard.rollBall(2)
      scorecard.rollBall(7)
      scorecard.rollBall(2)
      scorecard.rollBall(7)
      scorecard.rollBall(10)
      scorecard.rollBall(2)
      scorecard.rollBall(2)
      expect(scorecard.totalScore).toEqual(36)
    })

    it('calculates the strike bonus correctly when two strikes are rolled in a row', function () {
      scorecard.rollBall(10)
      scorecard.rollBall(10)
      scorecard.rollBall(5)
      scorecard.rollBall(5)
      scorecard.rollBall(7)
      scorecard.rollBall(0)
      expect(scorecard.totalScore).toEqual(69)
    })
  })

  describe('preventing a user from entering more than 10 frames', function () {
    it('should throw an error', function () {
      for (var i = 0; i < 10; i++) {
        scorecard.rollOne(1)
        scorecard.rollTwo(1)
      }
      expect(function () { scorecard.rollOne(1) }).toThrow(new Error('Cannot enter more than 10 frames'))
    })
  })
})
