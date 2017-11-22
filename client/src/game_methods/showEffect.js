import Effect from '../classes/Effect'

const showEffect = ({ stage, object, setAction, addItem }) => {
  if (object.canGather) {
    const effect = new Effect('gather_item', 64, 92, 'gather_item', 6)
    setAction('gather')
    object.Element.visible = false;
    effect.Animate.x = object.Element.x
    effect.Animate.y = object.Element.y
    stage.addChild(effect.Animate)
    effect.Animate.gotoAndPlay(1)
    setTimeout(() => { effect.Animate.visible = false; }, 800)
    addItem(object)
  } else {
    setAction('move')
  }
}

export default showEffect
