function Frame (frameNumber) {
  this.frameNumber = frameNumber
  this.rollOne = null
  this.rollTwo = null
  this.bonus = null
  this.bonusTwo = null
}

Frame.prototype.rollOneScore = function (rollScore) {
  this.rollOne = rollScore
}

Frame.prototype.rollTwoScore = function (rollScore) {
  if (this.rollOne + rollScore > 10)  { throw new Error('You can\'t knock down more than 10 pins') }
  this.rollTwo = rollScore
}

Frame.prototype.addBonus = function (bonusScore) {
  this.bonus = bonusScore
}

Frame.prototype.addBonusTwo = function (bonusScore) {
  this.bonusTwo = bonusScore
}

Frame.prototype.frameScore = function () {
  return this.rollOne + this.rollTwo + this.bonus + this.bonusTwo
}
