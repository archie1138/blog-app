import logoImage from '../../assets/BloglioLogo.png'

function Logo({
  width="100%" ,
  className="",
}) {
  return (
    <div className={`text-white ${className}`}>
        <img src={logoImage} alt="Bloglio" width={width}/>
    </div>
  )
}

export default Logo