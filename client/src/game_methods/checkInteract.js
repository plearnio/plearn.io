const checkInteract = ({ stage, object, heroWalk, setStore, setAction, showObject, bg }) => {
  if (!bg) {
    object.Element.on('pointerup', (event) => {
      setStore()
      showObject(object)
      setAction(null)
      heroWalk.setMousePoint({ x: object.Element.x + (object.Element.width / 2), y: object.Element.y })
    })
  } else {
    for (let i = 0; i < object.Element.length; i += 1) {
      object.Element[i].on('pointerup', (event) => {
        setStore()
        setAction(null)
      })
    }
  }
}

export default checkInteract
