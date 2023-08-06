"use client"
import { FC, useState } from 'react'
import AuthModal from './AuthModal';

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {
    const [showModal, setShowModal] = useState('');
    return (
        <nav className="bg-white p-2 flex justify-between">
            <a href="" className="font-bold text-gray-700 text-2xl"> OpenTable </a>
            <div>
                <div className="flex">
                    <button
                        className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                        onClick={() => setShowModal('sign-in')}
                    >
                        Sign in
                    </button>
                    {showModal === 'sign-in' && <AuthModal isSignIn={true} setShowModal={setShowModal} />}
                    {showModal === 'sign-up' && <AuthModal isSignIn={false} setShowModal={setShowModal} />}

                    <button className="border p-1 px-4 rounded" onClick={() => setShowModal('sign-up')}>Sign up</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar