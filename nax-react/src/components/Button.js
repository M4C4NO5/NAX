import proptype from "prop-types"
function Button({
  text,
  type,
  action = () => {}
})
{
  return(
    <button type={type} onClick={action} className="btn bg-primary text-white text-2xl font-bold py-5 px-10 rounded-xl">
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
