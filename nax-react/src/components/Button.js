import proptype from "prop-types"
function Button({text, link, type})
{
  return(
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
      <a href={link}>
        <button type={type} style={{fontFamily: 'Poppins'}} className="btn bg-primary hover:bg-[#AB92BF] text-white text-2xl font-bold py-5 px-10 rounded-xl">
          {text}
        </button>
      </a>
    </div>
  )
}

Button.propTypes = {
  text: proptype.string.isRequired,
  link: proptype.string,
  type: proptype.string,
}

export default Button
