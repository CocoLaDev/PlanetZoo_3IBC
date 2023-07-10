import { Space } from "../../../dto/spaces";

interface SpaceProps {
    space: Space;
    setSpace: React.Dispatch<React.SetStateAction<Space | null>>;
}

const EditSpace = ({ space, setSpace }: SpaceProps) => {
    return (
        <div className="m-8 h-[calc(100%-64px)]">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Edit Space</h1>
                <button onClick={() => setSpace(null)}>Back</button>
            </div>
            <div className="flex gap-4">
                <img
                    alt="Signage"
                    src="https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                    className="w-1/2 rounded-bl-3xl rounded-tr-3xl object-cover" />
                <form action="" className="space-y-4 w-1/2">
                    <input
                        className="w-full rounded-lg border-gray-200 border p-3 text-sm"
                        placeholder="Name"
                        type="text"
                        id="name"
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <input
                            className="w-full rounded-lg border-gray-200 border p-3 text-sm"
                            placeholder="Email address"
                            type="email"
                            id="email"
                        />
                        <input
                            className="w-full rounded-lg border-gray-200 border p-3 text-sm"
                            placeholder="Phone Number"
                            type="tel"
                            id="phone"
                        />
                    </div>

                    <div className="grid gap-4 text-center sm:grid-cols-2">
                        <div>
                            <input className="peer sr-only" id="option1" type="radio" tabIndex={-1} name="option" />
                            <label htmlFor="option1" className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white" tabIndex={0}>
                                <span className="text-sm">Yess</span>
                            </label>
                        </div>
                        <div>
                            <input className="peer sr-only" id="option3" type="radio" tabIndex={-1} name="option" />
                            <label htmlFor="option3" className="block w-full rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white" tabIndex={0}>
                                <span className="text-sm">No</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <textarea
                            className="w-full rounded-lg border-gray-200 border p-3 text-sm"
                            placeholder="Message"
                            rows={2}
                            id="message"
                        ></textarea>
                    </div>

                    <div className="w-full flex justify-center gap-4">
                        <button type="submit" className="inline-block w-full rounded-lg bg-teal-500 px-5 py-3 font-medium text-white sm:w-auto">
                            Edit Space
                        </button>
                        <button type="button" className="inline-block w-full rounded-lg bg-rose-500 px-5 py-3 font-medium text-white sm:w-auto">
                            Delete Space
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSpace;