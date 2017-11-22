const checkInteract = ({ stage, object, heroWalk, setStore, status, showObject, bg }) => {
  if (!bg) {
    object.Element.on('pointerup', (event) => {
      setStore()
      showObject(object)
      heroWalk.setMousePoint({ x: object.Element.x, y: object.Element.y })
    })
  } else {
    for (let i = 0; i < object.Element.length; i += 1) {
      object.Element[i].on('pointerup', (event) => {
        console.log(bg)
        setStore()
        showObject(object)
        heroWalk.setMousePoint({ x: object.Element.x, y: object.Element.y })
      })
    }
  }
}

export default checkInteract
