
import { Astroid,Eye, EyeOff, ChevronRight } from 'lucide-react';
import images from "../assets/images";



const SignupScreen = ({formik, showPassword, setShowPassword, navigate, agree, setAgree})  => {


  return (

    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <form onSubmit={formik.handleSubmit} autoComplete="on">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-#070b0e mb-3 flex items-center gap-2">
              <Astroid />

              Sign Up
            </h1>
            <p className="text-gray-700 text-medium">Free forever. No credit card needed.</p>
          </div>

          <div className="space-y-4 mb-8 ">
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 
            border border-gray-300 rounded-lg hover:bg-gray-50 h-10 transition-colors text-gray-900 font-medium
            cursor-pointer" onClick={() => window.open('https://google.com', '_blank')}>
              <img className="w-6 h-6" src={images.googleLogo} alt="Google logo" />
              <span className="text-gray-900 font-medium">Sign up with Google</span>
            </button>
            <button type="button" className="w-full flex items-center justify-center gap-3 py-3 
            h-10 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-900 font-medium
            cursor-pointer" onClick={() => window.open('https://icloud.com', '_blank')}>
              <img className="w-6 h-6" src={images.appleLogo} alt="Apple logo" />
              <span className="text-gray-900 font-medium">Sign up with Apple</span>
            </button>
            <div className="w-full justify-center items-center text-center text-gray-300 flex gap-2">
              <hr className='w-full' />
              <span>OR</span>
              <hr className='w-full' />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Your Name"
                className="w-full h-10 px-4 py-3 border border-gray-300 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {formik.touched.name && formik.errors.name ? <p className="text-red-600">{formik.errors.name}</p> : null}
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Your E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Your E-mail"
                className="w-full h-10 px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {formik.touched.email && formik.errors.email ? <p className="text-red-600">{formik.errors.email}</p> : null}
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="At least 8 characters"
                  className="w-full h-10 px-4 py-3 pr-24 border border-gray-300 text-gray-500 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password ? <p className="text-red-600">{formik.errors.password}</p> : null}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-5 h-5 text-[#874dff] cursor-pointer rounded focus:ring-purple-500"
              />
              <label className="text-gray-700">
                I agree to all the <a href="#" className="text-[#874dff] font-medium">Term</a>, <a href="#" className="text-[#874dff] font-medium">Privacy Policy</a> and <a href="#" className="text-[#874dff] font-medium">Fees</a>.
              </label>
            </div>

            <button
              type="submit"
              onClick={() => navigate('/Home')}
              disabled={!agree}
              className="w-full h-10 flex items-center justify-between bg-[#874dff] 
              hover:bg-[#870fff] cursor-pointer text-white font-medium py-3 px-4 rounded-lg  "
            >
              <span className="flex items-center justify-center ml-38">Continue</span>
              <span>
                <ChevronRight />
              </span>
            </button>

            <div>
              <p>
                Have an account? <button type="button" onClick={() => navigate('/Login')} className=" cursor-pointer text-[#874dff] font-medium">Log In</button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupScreen
