const DoctorList = ({ data }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-zinc-300 to-slate-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-4xl ">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Doctors
        </h1>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Email</th>
              <th className="py-3 px-4 border-b text-left">Contact</th>
              <th className="py-3 px-4 border-b text-left">Department</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.contact}</td>
                <td className="py-2 px-4 border-b">{user.department}</td>
                <td className="py-2 px-4 border-b flex space-x-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorList;
