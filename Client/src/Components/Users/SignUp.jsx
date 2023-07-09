import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import '../../CSS/Users.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LOGIN } from '../../Redux/types/authTypes';

export default function SignUp() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isLogIn = useDispatch();

  const navigate = useNavigate();

  const [path, setPath] = useState('/');
  const [userCheck, setUserCheck] = useState(false);

  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const [checkInput, setCheckInput] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const themeValue = {
    success: "green",
    error: "red",
    warning: "red",
    normal: "blue"
  }

  const [inputTheme, setInputTheme] = useState({
    email: themeValue.normal,
    password: themeValue.normal,
    userName: themeValue.normal,
    confirmPassword: themeValue.normal
  });

  const [massageWarning, setMassageWarning] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    submit: ''
  });


  function handleName(event) {
    const name = event.target.value;
    setCheckInput({ ...checkInput, userName: false });

    if (name === '') {
      setInputTheme({ ...inputTheme, userName: themeValue.normal });
      setMassageWarning({ ...massageWarning, userName: 'Required!' });
    }
    else {
      setInputTheme({ ...inputTheme, userName: themeValue.success })
      setMassageWarning({ ...massageWarning, userName: '' });
      setUser({ ...user, userName: name });
      setCheckInput({ ...checkInput, userName: true });
    }
  }

  async function handleEmail(event) {
    const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
    setCheckInput({ ...checkInput, email: false });
    const email = event.target.value;


    if (email === '') {
      setInputTheme({ ...inputTheme, email: themeValue.normal });
      setMassageWarning({ ...massageWarning, email: 'Required!' });
    }
    else if (!patternEmail.test(email)) {
      setInputTheme({ ...inputTheme, email: themeValue.error });
      setMassageWarning({ ...massageWarning, email: 'Invalid email' });
    }
    else {
      setMassageWarning({ ...massageWarning, email: '' });
      setInputTheme({ ...inputTheme, email: themeValue.success });
      setUser({ ...user, email: email });
      setCheckInput({ ...checkInput, email: true });
    }
  }

  function handlePassword(event) {
    // more than 8 characters, with at least 1 number, uppercase, and special characters.
    const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
    setCheckInput({ ...checkInput, password: false });
    const password = event.target.value;

    if (password === '') {
      setInputTheme({ ...inputTheme, password: themeValue.normal });
      setMassageWarning({ ...massageWarning, password: 'Required!' });
    }
    else if (!patternPassword.test(password)) {
      setInputTheme({ ...inputTheme, password: themeValue.error });
      setMassageWarning({ ...massageWarning, password: 'Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters' })
    }
    else {
      setMassageWarning({ ...massageWarning, password: '' });
      setInputTheme({ ...inputTheme, password: themeValue.success });
      setUser({ ...user, password: password });
      setCheckInput({ ...checkInput, password: true });
    }
  }

  function handleConfirmPassword(event) {

    const password = event.target.value;

    setCheckInput({ ...checkInput, confirmPassword: false });

    if (password === '') {
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.normal });
      setMassageWarning({ ...massageWarning, confirmPassword: 'Required!' });
    }
    else if (password !== user.password) {
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.error });
      setMassageWarning({ ...massageWarning, confirmPassword: 'Password does not match' });
    }
    else {
      setMassageWarning({ ...massageWarning, confirmPassword: '' });
      setInputTheme({ ...inputTheme, confirmPassword: themeValue.success });
      setCheckInput({ ...checkInput, confirmPassword: true });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (checkInput.userName && checkInput.email && checkInput.password && checkInput.confirmPassword) {

      sendDataToServer(user);

      event.target.reset();
      navigate(path);
    }
    else {
      setMassageWarning({ ...massageWarning, submit: 'Please fill in all fields or verify that the input is correct.' });
    }
  }

  function sendDataToServer(user) {

    axios.post('http://localhost:7777/auth/SignUp', user).then((res) => {

      localStorage.setItem("token", res.data.jwttoken);
      console.log(res)

      isLogIn({ type: LOGIN });

    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">

      <div class="max-w-screen-lg m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">

        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 sm:w-10/12">

          <div class="mt-12 flex flex-col items-center ">
            <h1 class="text-2xl xl:text-3xl font-extrabold text-blue-600 ">
              Sign Up to Join Us!
            </h1>
            <div class="w-full flex-1 mt-8">
              <form onSubmit={(event) => handleSubmit(event)}>
                <div class="mx-auto max-w-xs">
                  <div class="mb-3">
                    <label for="name" className={`block mb-2 text-sm font-medium text-${inputTheme.userName}-700 dark:text-${inputTheme.userName}-500 `}>Full name</label>
                    <input onChange={(event) => handleName(event)} type="text" id="name" className={`border-${inputTheme.userName}-300 text-${inputTheme.userName}-900 dark:text-${inputTheme.userName}-400 placeholder-${inputTheme.userName}-700 dark:placeholder-${inputTheme.userName}-500 focus:ring-${inputTheme.userName}-500 focus:border-${inputTheme.userName}-500 dark:border-${inputTheme.userName}-500 bg-white border-2 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 focus:outline-none`} placeholder="Enter your name" />
                    <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning.name}</span></p>
                  </div>
                  <div class="mb-3">
                    <label for="email" className={`block mb-2 text-sm font-medium text-${inputTheme.email}-700 dark:text-${inputTheme.email}-500 `}>Email</label>
                    <input onChange={(event) => handleEmail(event)} type="text" id="email" className={`border-${inputTheme.email}-300 text-${inputTheme.email}-900 dark:text-${inputTheme.email}-400 placeholder-${inputTheme.email}-700 dark:placeholder-${inputTheme.email}-500 focus:ring-${inputTheme.email}-500 focus:border-${inputTheme.email}-500 dark:border-${inputTheme.email}-500 bg-white border-2 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 focus:outline-none`} placeholder="Enter your email" />
                    <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning.email}</span></p>
                  </div>
                  <div class="mb-3">
                    <label for="password" className={`text-${inputTheme.password}-700 dark:text-${inputTheme.password}-500 block mb-2 text-sm font-medium`}>Password</label>
                    <input onChange={(event) => handlePassword(event)} type="password" id="password" className={`border-${inputTheme.password}-300 text-${inputTheme.password}-900 placeholder-${inputTheme.password}-700 focus:ring-${inputTheme.password}-500 focus:border-${inputTheme.password}-500 dark:text-${inputTheme.password}-500 dark:placeholder-${inputTheme.password}-500 dark:border-${inputTheme.password}-500 bg-white border-2 text-sm rounded-lg dark:bg-gray-700 block w-full p-2.5 focus:outline-none`} placeholder="Enter your password" />
                    <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning.password}</span></p>
                  </div>
                  <div>
                    <label for="confirmPassword" className={`text-${inputTheme.confirmPassword}-700 dark:text-${inputTheme.confirmPassword}-500 block mb-2 text-sm font-medium`}>Confirm Password</label>
                    <input onChange={(event) => handleConfirmPassword(event)} type="password" id="confirmPassword" className={`border-${inputTheme.confirmPassword}-300 text-${inputTheme.confirmPassword}-900 placeholder-${inputTheme.confirmPassword}-700 focus:ring-${inputTheme.confirmPassword}-500 focus:border-${inputTheme.confirmPassword}-500 dark:text-${inputTheme.confirmPassword}-500 dark:placeholder-${inputTheme.confirmPassword}-500 dark:border-${inputTheme.confirmPassword}-500 bg-white border-2 text-sm rounded-lg dark:bg-gray-700 block w-full p-2.5 focus:outline-none`} placeholder="Confirm password" />
                    <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning.confirmPassword}</span></p>
                  </div>
                  <button type='submit'
                    class="mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-4 rounded-lg hover:text-blue-600 hover:bg-gray-200 transition-bg duration-500 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <svg
                      class="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span class="ml-3 ">
                      Sign Up
                    </span>
                  </button>
                  <p className={`mt-2 text-sm text-${themeValue.warning}-600 dark:text-${themeValue.warning}-500`}><span class="font-medium">{massageWarning.submit}</span></p>
                  <p className={`mt-2 text-sm text-${themeValue.normal}-600 dark:text-${themeValue.normal}-500`}>You already have an account! <Link to="/signIn" className={`font-bold text-${themeValue.normal}-600 transition hover:text-${themeValue.normal}-500/75`}>Sign In</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
