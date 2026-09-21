import { useSelector } from 'react-redux'
import logoImageDark from '../../assets/bloglioLogo.png'
import logoImageLight from '../../assets/bloglioLogoDark.png'

function Logo({
  width="100%" ,
  className="",
}) {

  const theme = useSelector(state => state.theme.themeMode)

  return (
    theme === "dark" ? (
      <div className={`text-white ${className}`}>
        <img src={logoImageDark} alt="Bloglio" width={width}/>
      </div>
    ) : (
      <div className={`text-white ${className}`}>
        <img src={logoImageLight} alt="Bloglio" width={width}/>
      </div>
    )
  )
}

export default Logo