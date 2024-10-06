

const CustomerProfile = () => {
  return (
    <div className="p-6 flex space-x-6">

      <div className="w-1/3 space-y-4">


        <div className="bg-white p-4 shadow rounded-lg">
          <img
            src="https://via.placeholder.com/150"
            alt="Customer"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-center mt-4 text-xl font-semibold">John Doe</h2>
          <p className="text-center text-gray-500">Joined: 2024-09-20</p>
          <p className="text-center mt-2 text-lg font-bold">Order Quantity: 10</p>
        </div>


        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p><strong>Address:</strong> 123 Main St, New York, NY</p>
          <p><strong>Email:</strong> john@example.com</p>
        </div>


        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Notes on Customer</h3>
          <form>
            <textarea
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Enter notes here..."
            ></textarea>
            <button
              type="submit"
              className="bg-teal-500 text-white mt-4 px-4 py-2 rounded"
            >
              Save Notes
            </button>
          </form>
        </div>
      </div>




      <div className="w-2/3">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Order Status</th>
                <th className="border px-4 py-2">Order Date</th>
                <th className="border px-4 py-2">Sold Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">1001</td>
                <td className="border px-4 py-2">Pending</td>
                <td className="border px-4 py-2">2024-09-18</td>
                <td className="border px-4 py-2">Not Sold</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">1002</td>
                <td className="border px-4 py-2">Completed</td>
                <td className="border px-4 py-2">2024-09-15</td>
                <td className="border px-4 py-2">Sold</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">1003</td>
                <td className="border px-4 py-2">Processing</td>
                <td className="border px-4 py-2">2024-09-19</td>
                <td className="border px-4 py-2">Not Sold</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
