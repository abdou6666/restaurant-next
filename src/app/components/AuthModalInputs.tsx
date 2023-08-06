import React, { Dispatch, SetStateAction } from 'react'

interface InputsType {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    city: string,
    password: string
}

export default function AuthModalInputs({ inputs, setInputs, isSignIn }: { inputs: InputsType, setInputs: Dispatch<SetStateAction<InputsType>>, isSignIn: boolean }) {

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })

    }
    return (
        <div>
            {isSignIn ? null : <div className='my-3 flex justify-between text-sm'>
                <input
                    type="text"
                    className='border rounded p-2 py-3  w-[49%]'
                    placeholder='first name'
                    value={inputs.firstName}
                    name='firstName'
                    onChange={handleChangeInput}
                />
                <input
                    type="text"
                    className='border rounded p-2 py-3  w-[49%]'
                    placeholder='last name'
                    value={inputs.lastName}
                    name='lastName'
                    onChange={handleChangeInput}
                />
            </div>}
            <div className='my-3 flex justify-between text-sm'>
                <input
                    type="text"
                    className='border rounded p-2 py-3  w-full'
                    placeholder='email'
                    value={inputs.email}
                    name='email'
                    onChange={handleChangeInput}
                />
            </div>
            {isSignIn ? null : <div className='my-3 flex justify-between text-sm'>
                <input
                    type="text"
                    className='border rounded p-2 py-3  w-[49%]'
                    placeholder='phone'
                    value={inputs.phone}
                    name='phone'
                    onChange={handleChangeInput}
                />
                <input
                    type="text"
                    className='border rounded p-2 py-3  w-[49%]'
                    placeholder='city'
                    value={inputs.city}
                    name='city'
                    onChange={handleChangeInput}
                />
            </div>}
            <div className='my-3 flex justify-between text-sm'>
                <input
                    type="password"
                    className='border rounded p-2 py-3  w-full'
                    placeholder='password'
                    value={inputs.password}
                    name='password'
                    onChange={handleChangeInput}
                />
            </div>
        </div>
    )
}
