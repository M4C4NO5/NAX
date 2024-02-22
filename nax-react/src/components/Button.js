import proptype from "prop-types"
function Button({
  text,
  type,
  action = () => {}
})
{
  return(
    <button type={type} onClick={action} className="bg-primary text-white text-xl py-4 px-8 rounded-xl">
      {text}
    </button>
  )
}

Button.propTypes = {
  text: proptype.string.isRequired,
  type: proptype.string,
  action: proptype.func,
}

export default Button
