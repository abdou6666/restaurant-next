"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from 'react'
import AuthModalInputs from './AuthModalInputs'
import useAuth from '../hooks/useAuth'
import { AuthenticationContext } from '../context/AuthContext'


export default function AuthModal({ isSignIn, setShowModal }: { isSignIn: boolean, setShowModal: Dispatch<SetStateAction<string>> }) {
    const [isOpen, setIsOpen] = useState(true)
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        password: ''
    })
    const [disabled, setDisabled] = useState(true)

    const { data, error, loading } = useContext(AuthenticationContext);

    const renderContent = (signInContent: string, signUpContent: string) => {
        return isSignIn ? signInContent : signUpContent
    }

    const { SignIn, SignUp } = useAuth();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        isSignIn ?
            await SignIn({ email: inputs.email, password: inputs.password, handleClose: closeModal }) :
            await SignUp({ email: inputs.email, password: inputs.password, city: inputs.city, first_name: inputs.firstName, last_name: inputs.lastName, phone: inputs.phone, handleClose: closeModal })
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    useEffect(() => {
        if (isSignIn) {
            if (inputs.password && inputs.email) {
                setDisabled(false)
                return;
            }

        } else {
            if (inputs.password && inputs.email && inputs.city && inputs.lastName && inputs.firstName && inputs.phone) {
                setDisabled(false)
                return;
            }
        }
        setDisabled(true)

    }, [inputs, isSignIn])

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    className={`${renderContent('border p-1 px-4 rounded', '')} bg-blue-400 text-white border p-1 px-4 rounded mr-3`}
                    onClick={() => {
                        isSignIn ? setShowModal('sign-in') : setShowModal('sign-up')
                        openModal();
                    }}
                >
                    {renderContent('Sign in', 'Sign up')}
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {
                    setShowModal('')
                    closeModal()
                }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto h-[600px]">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2lg font-bold uppercase leading-6 text-gray-900 text-center"
                                    >
                                        {renderContent('Sign In', 'Sign Up')}
                                        {data?.firstName} {data?.lastName}

                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className='m-auto'>
                                            <h2 className='text-2xl font-light text-center'>
                                                {renderContent('Login into your account', 'Create Your Account')}
                                            </h2>
                                            {loading && <p>Loading...</p>}
                                            {!loading && <AuthModalInputs inputs={inputs} setInputs={setInputs} isSignIn={isSignIn} />}

                                            <button
                                                disabled={disabled}
                                                onClick={handleSubmit}
                                                className='uppercase bg-red-600 w-full text-white p-3 mb-5 rounded text-sm disabled:bg-gray-400'>
                                                {renderContent('Sign In', 'Sign Up')}
                                            </button>
                                            {error && error?.length > 0 ?
                                                <p className='text-red-500' key={error}>{error}</p>
                                                : null}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
