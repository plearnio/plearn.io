const moveWindow = ({ stage, heroWalk }) => {
  stage.x = -heroWalk.animate.x
}

export default moveWindow
