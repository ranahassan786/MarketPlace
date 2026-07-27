
import { Astroid, Eye, EyeOff, ChevronRight } from 'lucide-react';
import images from "../assets/images";
import Login from '../pages/Login';

const LoginScreen = ({ formik, showPassword, setShowPassword, navigate, loading }) => {




    return (

        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <form onSubmit={formik.handleSubmit} autoComplete="on">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-#070b0e mb-3 flex items-center gap-2">
                            <Astroid />

                            Log In
                        </h1>
                        <p className="text-gray-700 text-medium">Free forever. No credit card needed.</p>


                    </div>


                    <div className="space-y-4 mb-8">

                        <button className="w-full flex items-center  justify-center gap-3 py-3 
                                px-4 border border-gray-300 rounded-lg hover:bg-gray-50 h-10
                                transition-colors text-gray-900 font-medium">
                            <img className="w-6 h-6" src={images.googleLogo} alt="" />
                            <a href="https://google.com" className="text-gray-900 font-medium"> Login with Google</a>

                        </button>
                        <button className="w-full flex items-center justify-center gap-3 py-3 h-10
                                px-4 border border-gray-300 rounded-lg hover:bg-gray-50 
                                transition-colors text-gray-900 font-medium">
                            <img className="w-6 h-6" src={images.appleLogo} alt="" />
                            <a href="https://icloud.com" className="text-gray-900 font-medium"> Login with apple</a>
                        </button>
                        <div className="w-full justify-center items-center text-center text-gray-300 flex gap-2">
                            <hr className='w-full' />
                            <span>OR</span>
                            <hr className='w-full' />
                        </div>
                        <div>
                            <label className="block text-gray-900 font-medium mb-2 flex items-left">Your E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Your E-mail"
                                className="w-full h-10 px-4 py-3 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 
                                focus:ring-purple-500 focus:border-transparent"
                            />
                            {formik.touched.email && formik.errors.email ? <p className="text-red-600">{formik.errors.email}</p> : null}
                        </div>
                        <div>
                            <label className="block text-gray-900 font-medium flex items-left mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
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

                                {formik.touched.password && formik.errors.password ? <p className="text-red-600"> {formik.errors.password} </p> : null}
                            </div>
                        </div>
                        <br />


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 flex items-center justify-between bg-[#874dff] hover:bg-[#870fff] 
                            text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        >
                            <span className="flex items-center justify-center ml-38"  >
                                {loading ? "Connecting..." : "Continue"}
                             
                                </span>
                            <span>
                                <ChevronRight />
                            </span>
                        </button>



                        <br />
                        <div >
                            <p>
                                Don't have account? <button onClick={() => navigate("/Signup")} className="text-[#874dff] font-medium">Sing Up </button>

                            </p>
                        </div>
                    </div>
                </form>
            </div >
        </div >

    )
}
export default LoginScreen


