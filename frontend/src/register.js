import './styles/App.module.scss';
import Navbar from "./components/Navbar"
import cidade from './images/Cidade.jpg';
import Footer from "./components/Footer"


function Register() {
  return (
    <>

        <div className="relative flex h-full w-full">
          <div className="h-screen w-1/2 bg-black">
            <div className="mx-auto flex h-full w-2/3 flex-col justify-center text-white xl:w-1/2">
              <div className="text-center">
                <p className="text-2xl">Register Now!</p>
              </div>
              <div>
                <fieldset className="border-t border-solid border-gray-600">
                  <div className="mx-auto px-2 text-center text-sm"></div>
                </fieldset>
              </div>
              <div className="mt-7">
                <form>
                  <div>
                    <label className="mb-2.5 block font-extrabold" for="email">First Name</label>
                    <input type="name" id="name" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"/>
                  </div>
                  <div>
                    <label className="mb-2.5 block font-extrabold" for="email">Last Name</label>
                    <input type="last_name" id="last_name" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30" />
                  </div>
                  <div>
                    <label className="mb-2.5 block font-extrabold" for="email">Email</label>
                    <input type="email" id="email" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30" />
                  </div>
                  <div className="mt-4">
                    <label className="mb-2.5 block font-extrabold" for="email">Password</label>
                    <input type="password" id="email" className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow" />
                  </div>
                  <div className="mt-4 flex w-full flex-col justify-between sm:flex-row">
                    <div><input type="checkbox" id="remember" /><label for="remember" className="mx-2 text-sm">Remember me</label></div>
                    <div>
                      <a href="#" className="text-sm hover:text-gray-200">Forgot password?</a>
                    </div>
                  </div>
                  <div className="form-control my-4">
                    <a href='./dashboard'  className=" inline-flex justify-center items-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-pink-500 hover:to-yellow-500 h-10 w-24 mx-auto">Login </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="h-screen w-1/2 bg-blue-600">
            <img src={cidade} alt="cidade" className="h-full w-full object-cover" />
          </div>
        </div>
      <Footer />
    </>
  )
}


export default Register;
