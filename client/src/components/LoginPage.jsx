import { useEffect, useState } from 'react';
import personImg from '../assets/person.svg';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const LoginPage = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {}, [isLogin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                console.log("Logging in with", userData);
                const res = await axios.post(`https://notesme-one.vercel.app/api/v1/user/login`, userData);
                if (res.data) {
                    toast.success("Login Successfully!", { position: "top-center" });
                    const token = res.data.Token;
                    localStorage.setItem("Token", token);
                    localStorage.setItem("name", res.data.user.name);

                    setTimeout(() => {
                        navigate('/notes');
                    }, 1000);
                }
            } else {
                console.log("Signing up with", userData);
                const res = await axios.post(`https://notesme-one.vercel.app/api/v1/user/signup`, userData); // Use the appropriate signup URL
                if (res.data) {
                    toast.success("Signup Successfully!", { position: "top-center" });
                    setIsLogin(true);
                }
            }
        } catch (error) {
            console.error(error.message);
            toast.error(`Operation failed, Error: ${error.message}`, { position: "top-center" });
        }
    };

    return (
        <div className="mt-16 mx-8 md:mx-8 lg:mx-16 xl:mx-32 flex flex-col md:flex-row">

            {/* Left */}
            <div className="flex flex-col justify-center items-center md:items-start w-full md:w-[50%] text-start md:mx-16 md:mt-16 md:order-1">
                <img className="h-[280px] w-[370px]" src={personImg} alt="Person" />
                <h1 className="text-4xl font-semibold mt-10">Keep life Simple</h1>
                <p className="text-md text-gray-500 w-[360px] mt-4">
                    Store all your notes in a simple and intuitive app
                    that helps you enjoy what is most important in life.
                </p>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center items-center m-0 p-0 w-full md:w-[30%] mt-10 md:mt-32 md:order-2">
                <div className="flex gap-2 items-center justify-center">
                    <Icon className="w-[50px] h-[50px]" icon="mage:edit-pen" />
                    <p className='text-5xl'><span className="font-semibold">NOTE.</span>me</p>
                </div>
                <div className="bg-orange-600 w-full rounded-lg flex items-center justify-center gap-2 p-2 mt-6 text-white cursor-pointer">
                    <Icon className="w-[30px] h-[30px]" icon="uim:google" />
                    <p className="text-lg">Join with Google</p>
                </div>
                <div className='flex gap-2 w-full mt-4 justify-between'>
                    <hr className="border w-[25%] border-gray-700 mt-3" />
                    <p className='text-gray-500'>or Join with Email</p>
                    <hr className="border w-[25%] border-gray-700 mt-3" />
                </div>

                {/* Input Fields */}
                <form className='mt-10' onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            placeholder='Enter Your Name'
                            className='pl-4 p-1 border w-full rounded-md border-gray-500 mb-2'
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder='Enter Your Email'
                        className='pl-4 p-1 border w-full rounded-md border-gray-500 mb-2'
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder='Enter Your Password'
                        className='pl-4 p-1 border w-full rounded-md border-gray-500'
                        required
                    />

                    <button type="submit" className="bg-green-500 rounded-lg w-full flex items-center justify-center gap-2 p-1 mt-6 text-white">
                        <Icon className="w-[30px] h-[30px]" icon="tabler:login-2" />
                        <p>{isLogin ? "Login with Email" : "Sign Up with Email"}</p>
                    </button>
                    <div>
                        {isLogin ? (
                            <p onClick={() => setIsLogin(false)}>
                                Don't have an account? <span className="text-blue-700 font-semibold cursor-pointer">Sign Up</span>
                            </p>
                        ) : (
                            <p onClick={() => setIsLogin(true)}>
                                Already have an account? <span className="text-blue-700 font-semibold cursor-pointer">Login</span>
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
