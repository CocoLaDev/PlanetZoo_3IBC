import { ChangeEvent, useEffect, useState } from "react";
import { User, UserRole } from "../../../dto";
import { Users } from "../../../services";
import axios, { CancelToken } from "axios";

const UsersList = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState<UserRole>(UserRole.VISITOR);
    const [userModified, setUserModified] = useState<User | null>(null);

    const fetchUsers = async (cancelToken?: CancelToken) => {
        const data = await Users.getAll(cancelToken);
        if (data) setUsers(data);
    };

    useEffect(() => {
        if (userModified) {
            const x = setTimeout(() => {
                setUserModified(null);
            }, 2000);
            return () => clearTimeout(x);
        }
        const cancelTokenSource = axios.CancelToken.source();
        fetchUsers(cancelTokenSource.token);
        return () => cancelTokenSource.cancel();
    }, [userModified]);

    async function deleteUser(id: string) {
        const response = await Users.delete(id);
        if (response) {
            setUsers(users.filter(user => user._id !== id));
        }
    }

    async function updateUser(user: User, password: string, role: UserRole) {
        const selectElement = document.getElementById(`AssignedDays${user._id}`) as HTMLSelectElement;
        const selectedValues = Array.from(selectElement.selectedOptions).map(option => option.value);
        console.log(selectedValues);
        const newUser: User = {
            ...user,
            password,
            role,
            assignedDays: selectedValues.length > 0 ? selectedValues : undefined
        }
        const response = await Users.update(newUser);
        if (response) {
            setUserModified(newUser);
        }
    }

    return (
        <div className="w-full m-16 h-[71vh] bg-white rounded-xl">
            <div className="m-8 h-[calc(100%-112px)]">
                <h1 className="text-2xl font-bold">Users</h1>
                <div className="flex justify-end w-full h-10 mb-2">
                    <select className="rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" onChange={(e) => setRole(e.target.value as UserRole)}>
                        <option value={UserRole.VISITOR}>Visitors</option>
                        <option value={UserRole.VETERINARIAN}>Veterinarians</option>
                        <option value={UserRole.EMPLOYEE}>Employees</option>
                        <option value={UserRole.ENTRETIENAGENT}>Entretien Agents</option>
                        <option value={UserRole.SELLER}>Sellers</option>
                        <option value={UserRole.ADMIN}>Admins</option>
                    </select>
                </div>
                <div className="overflow-x-auto h-[calc(100%-32px)]">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    UserName
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Reset password
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Role
                                </th>
                                {role !== UserRole.VISITOR &&
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Assigned Days
                                    </th>
                                }
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Update
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Delete
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {users.filter(user => user.role === role).map((user) => (
                                <tr className="odd:bg-gray-50" key={user._id}>
                                    <td className="text-center px-4 py-2 text-gray-700">{user.username}</td>
                                    <td className="text-center px-4 py-2 text-gray-700">
                                        <input type="password" id={`Password${user._id}`} required className="rounded-xl border p-2 mr-2 text-sm focus:outline-none focus:border-teal-500 transition" placeholder="New password" />
                                    </td>
                                    <td className="text-center px-4 py-2 text-gray-700">
                                        <select className="rounded-xl border p-2 text-sm focus:outline-none focus:border-teal-500 transition" defaultValue={user.role} id={`Role${user._id}`}>
                                            <option value={UserRole.VISITOR}>Visitor</option>
                                            <option value={UserRole.VETERINARIAN}>Veterinarian</option>
                                            <option value={UserRole.EMPLOYEE}>Employee</option>
                                            <option value={UserRole.ENTRETIENAGENT}>Entretien Agent</option>
                                            <option value={UserRole.SELLER}>Seller</option>
                                            <option value={UserRole.ADMIN}>Admin</option>
                                        </select>
                                    </td>
                                    {role !== UserRole.VISITOR &&
                                        <td className="text-center px-4 py-2 text-gray-700">
                                            <select multiple className="rounded-xl border p-2 text-sm focus:outline-none focus:border-teal-500 transition h-12" id={`AssignedDays${user._id}`} defaultValue={user.assignedDays}>
                                                <option value="Sunday">Sunday</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                            </select>
                                        </td>
                                    }
                                    <td className="text-center px-4 py-2 text-teal-700">
                                        <button onClick={() => updateUser(user, (document.getElementById(`Password${user._id}`) as HTMLInputElement).value, (document.getElementById(`Role${user._id}`) as HTMLSelectElement).value as UserRole)}>
                                            {userModified?._id === user._id ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                                            }
                                        </button>
                                    </td>
                                    <td className="text-center px-4 py-2 text-rose-500">
                                        <button onClick={() => deleteUser(user._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersList;