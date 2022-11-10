

function App() {
  return (
    <div className="App">
      <div className="navbar bg-base-100">
          <div className="navbar-start">
              <div className="dropdown">
                  <label tabIndex={0} className="btn btn-ghost lg:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </label>
                  <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>Item 1</a></li>
                      <li tabIndex={0}>
                          <a className="justify-between">
                              Parent
                              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                          </a>
                          <ul className="p-2">
                              <li><a>Submenu 1</a></li>
                              <li><a>Submenu 2</a></li>
                          </ul>
                      </li>
                      <li><a>Item 3</a></li>
                  </ul>
              </div>
              <a className="normal-case text-xl">daisyUI</a>
          </div>

          <div className="navbar-end">
              <button className="btn btn-outline btn-error">Login</button>
          </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
              <img src="https://placeimg.com/260/400/arch" className="max-w-sm rounded-lg shadow-2xl" />
              <div>
                  <h1 className="text-5xl font-bold">Box Office News!</h1>
                  <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                  <button className="btn btn-primary">Get Started</button>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
