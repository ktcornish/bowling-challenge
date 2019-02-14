describe('Scorecard', function() {
  var frameOne;

  beforeEach(function(){
    scorecard = new Scorecard();
    frameOne = jasmine.createSpyObj('frameOne', ['rollOneScore', 'rollTwoScore'])

  });

  describe('a new scorecard', function() {
    it('begins on frame number 1', function() {
      expect(scorecard.frameNumber).toEqual(1)
    });

    it('begins with an empty array of frames', function() {
      expect(scorecard.frames).toEqual([])
    });
  });

  describe('#rollOne', function() {
    it('sends the current frame a method to update the roll 1 score', function() {
      scorecard.rollOne(2, frameOne)
      expect(frameOne.rollOneScore).toHaveBeenCalledWith(2)
    })

    it('adds a new frame to the frames array', function() {
      scorecard.rollOne(2, frameOne)
      expect(scorecard.frames).toContain(frameOne)
    })
  })
});
