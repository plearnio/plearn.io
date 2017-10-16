const checkInteract = ({ object, heroWalk, setStore, status, onInteract }) => {
  object.Element.on('pointerup', (event) => {
    setStore()
    onInteract(object)
    heroWalk.setMousePoint({ ...event.data.global })
  })
}

export default checkInteract
