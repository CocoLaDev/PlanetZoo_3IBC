import { Link } from "wouter";

const SideBar = () => {
    return (
        <aside className="fixed bottom-0 left-0 bg-white shadow-md h-[90vh] w-60">
            <div className="flex flex-col justify-between h-full">
                <div className="flex-grow">
                    <div className="px-4 py-6 text-center border-b">
                        <h1 className="text-xl font-bold leading-none"><span className="text-teal-700">Task Manager</span> App</h1>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-1">
                            <li>
                                <Link to="/Admin/Spaces" id="/Admin/Spaces" className="flex items-center target:bg-teal-600 bg-white rounded-xl font-bold text-sm target:text-white py-3 px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="text-lg mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                                    Spaces
                                </Link>
                            </li>
                            <li>
                                <Link to="/Admin/Animals" className="flex bg-white hover:bg-teal-50 target:bg-teal-600 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className="text-lg mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                    Animals
                                </Link>
                            </li>
                            <li>
                                <a href="javascript:void(0)" className="flex bg-white hover:bg-teal-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                                        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                                    </svg>Projects
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" className="flex bg-white hover:bg-teal-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>Tags
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;