import React from 'react'
import Header from './components/Header'

export default function loading() {
    return (
        <main>
            <Header />
            <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
                {Array.from({ length: 10 }).map((n, i) => (
                    <div
                        className="animate-pulse bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
                        key={i}>

                    </div>
                ))}
            </div>
        </main>
    )
}
