import React from 'react'

const HomePageLoading = () => {
    return (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">

                <div className="bg-gray-200 rounded-2xl h-64 w-full mb-10" />

                <div className="flex gap-5 justify-center mb-10">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-gray-200 rounded-xl h-16 w-32" />
                    ))}
                </div>

                {/* Who We Do */}
                <div className="flex gap-8 items-center mb-10">
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="bg-gray-200 rounded h-5 w-3/5" />
                        <div className="bg-gray-200 rounded h-4 w-full" />
                        <div className="bg-gray-200 rounded h-4 w-11/12" />
                        <div className="bg-gray-200 rounded h-4 w-4/5" />
                        <div className="bg-gray-200 rounded-full h-10 w-28 mt-2" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-2xl h-52" />
                </div>

                {/* Why Choose Us */}
                <div className="mb-10">
                    <div className="bg-gray-200 rounded h-5 w-48 mb-5" />
                    <div className="flex gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex-1 bg-gray-100 rounded-2xl p-5 flex flex-col gap-3">
                                <div className="bg-gray-200 rounded-lg h-9 w-9" />
                                <div className="bg-gray-200 rounded h-4 w-4/5" />
                                <div className="bg-gray-200 rounded h-3 w-full" />
                                <div className="bg-gray-200 rounded h-3 w-3/4" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Professional Services */}
                <div className="mb-10">
                    <div className="bg-gray-200 rounded h-5 w-56 mb-5" />
                    <div className="flex gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex-1 bg-gray-200 rounded-2xl h-44" />
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePageLoading