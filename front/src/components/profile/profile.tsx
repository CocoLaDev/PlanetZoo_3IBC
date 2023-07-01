const Profile = () => {
    return (
        <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-8 mb-5">
                    <h1 className="text-3xl font-bold">Profile</h1>

                    <hr className="my-4" />
                    <div className="grid grid-cols-2 gap-x-20 pt-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Personnals informations</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <div className="p-4 bg-violet-100 rounded-xl text-gray-800">
                                        <p className="font-bold text-xl leading-none">Username</p>
                                        <p className="mt-2">CocoLaD</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-orange-100 rounded-xl text-gray-800">
                                    <p className="font-bold text-2xl leading-none">4</p>
                                    <p className="mt-2">Tickets available</p>
                                </div>
                                <div className="p-4 bg-orange-100 rounded-xl text-gray-800">
                                    <p className="font-bold text-2xl leading-none">5</p>
                                    <p className="mt-2">Tickets buyed</p>
                                </div>
                                <div className="col-span-2">
                                    <div className="p-4 bg-teal-100 rounded-xl">
                                        <p className="font-bold text-xl text-gray-800 leading-none w-2/3">Need to change your password ?</p>
                                        <div className="mt-5">
                                            <button type="button" className="inline-flex items-center justify-center py-2 px-3 rounded-xl bg-white text-gray-800 hover:text-teal-500 text-sm font-semibold transition">
                                                Reset password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Your tickets available</h2>

                            <div className="space-y-4">
                                <div className="p-4 bg-white border rounded-xl text-gray-800 space-y-1">
                                    <div className="flex justify-between">
                                        <p className="text-red-400 text-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="inline align-middle mr-1" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                        </svg>predefined visiting direction
                                        </p>
                                        <p className="text-gray-400 text-xs">until 01/07/2023</p>
                                    </div>
                                    <p className="font-bold hover:text-yellow-800 hover:underline">Escape game PASS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile