import proptype from "prop-types"
function Button({
  text,
  id,
  type,
  action = () => {},
  variant
})
{
  let buttonClass = "bg-primary text-white text-xl py-3 px-8 rounded-xl"

  if (variant=== "primary"){
    buttonClass = "bg-primary text-white text-xl py-3 px-8 rounded-xl"
  }if (variant=== "secondary"){
    buttonClass = "bg-secondary text-white text-xl py-3 px-8 rounded-xl"
  }else if(variant === "tertiary"){
    buttonClass = "bg-tertiary text-white text-xl py-3 px-8 rounded-xl"
  }else if(variant === "auxiliar"){
    buttonClass = "bg-auxiliar text-white text-xl py-3 px-8 rounded-xl"
  }else if(variant === "support"){
    buttonClass = "bg-support text-white text-xl py-3 px-8 rounded-xl"
  }

  return(
    <button id={id} type={type} onClick={action} className={buttonClass}>
      {text}
    </button>
  )
}

Button.propTypes = {
  text: proptype.string.isRequired,
  type: proptype.string,
  action: proptype.func,
  variant: proptype.oneOf(["primary","secondary","tertiary", "auxiliar", "support"])
}

export default Button
