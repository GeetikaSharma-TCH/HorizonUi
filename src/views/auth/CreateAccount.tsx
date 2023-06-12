import InputField from "components/fields/InputField";
import { useState } from "react";
import { auth } from "views/firebase/firebaseConfig";
import { database } from "views/firebase/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const CreateAccount = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const navigateData = useNavigate()

    // when User clicks on any Input field
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('event', e)
        setUserData({...userData,
            [e.target.id] : e.target.value
        })
    }

    // when user click on Sign up button
    const createNewAccount = () => {
        console.log('New Account')

        // to create new user
        createUserWithEmailAndPassword(auth , userData.email, userData.password)
            .then((userCredentials) => {
                console.log('response', userCredentials)
                
                // Update Display Name of User 
                updateProfile(auth.currentUser, {
                    displayName : 'User'
                })

                // Send Email Verification
                if(!userCredentials.user.emailVerified) {
                    sendEmailVerification(userCredentials.user)

                    // add doscumnet to collection
                    setDoc(doc(database, 'users', userCredentials.user.uid), {
                        username: 'User',
                        email: userData.email,
                        password: userData.password,
                        timeStamp: serverTimestamp(),
                        id: userCredentials.user.uid
                    })
                    alert('Email Sent Successfully')
                    setUserData({
                        email: '',
                        password: ''
                    })
                    navigateData('/admin/default')
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
            
    }
    return (
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
          {/* Sign in section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              value={userData.email}
              onChange={change}
            />
    
            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              value={userData.password}
              onChange={change}

            />
            <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                onClick={createNewAccount}>
              Sign Up
            </button>
          </div>
        </div>
      );
}

export default CreateAccount