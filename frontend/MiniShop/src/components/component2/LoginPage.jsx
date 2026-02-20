import { LoginBrowserImage, LoginMobileImage } from "../../context/loginImage.js"
function LoginPage() {
  return (
    <div>
      <div>
        <div className="hidden sm:block w-screen h-screen overflow-hidden">
          <img
            src={LoginBrowserImage}
            alt="Login Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <div className="md:hidden w-screen h-screen overflow-hidden">
          <img src={LoginMobileImage} alt="Login Background" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
