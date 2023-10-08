import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { JunologixData } from "./resources/JunologixData";
import DeleteIcon from "../../components/svg-icons/DeleteIcon";
import EditIcon from "../../components/svg-icons/EditIcon";
import EditJunologix from "../../components/FQAModals/EditJunologix";

const JunologixReports = () => {
  const [formData, setFormData] = useState({
    abr: "",
    state: "",
    return: "",
    status: "",
  });
  const [junologiXData, setJunologixData] = useState<JunologixData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showJunologix, setShowJunologix] = useState<boolean[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<JunologixData | null>(null);
  const [editedItemIndex, setEditedItemIndex] = useState<number | null>(null); // Add this line

  useEffect(() => {
    // Fetch initial Junologix data when the component mounts
    fetchJunologixData();
  }, []);

  const fetchJunologixData = () => {
    setLoading(true);

    axiosInstance
      .get(`/junologix-states`)
      .then((response) => {
        setJunologixData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make a POST request to your API endpoint
      const response = await axiosInstance.post(`/junologix-states`, formData);
      console.log("Post request response:", response);

      // Assuming the response contains the newly created item, you can update the state
      const newJunologixItem = response.data; // Adjust this based on your API response structure
      setJunologixData((prevData) => [...prevData, newJunologixItem]);

      // Clear the form after successful submission
      setFormData({
        abr: "",
        state: "",
        return: "",
        status: "",
      });
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  };

  // Delete a row by its index
  const handleDelete = (index: number) => {
    const itemToDelete = junologiXData[index];

    // Send a DELETE request to the server to remove the item
    axiosInstance
      .delete(`/junologix-states/${itemToDelete.id}`)
      .then(() => {
        // If the delete request is successful, update the local state
        const updatedData = [...junologiXData];
        updatedData.splice(index, 1);
        setJunologixData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  //the Junologix edit
  const handleEditClick = (index: number) => {
    setIsEditModalOpen(true);
    setEditItem(junologiXData[index]);
    setEditedItemIndex(index); // Store the index of the item being edited
  };

  //update the junologix edit

  return (
    <div className="mb-[150px] border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins rounded-t-lg ">
      <div className="bg-secondaryColor flex justify-between height-[5.3125rem] px-4 py-2 rounded-t-lg">
        <div className="border-b-0 text-lightGray font-medium leading-normal  text-lg md:text-2xl ">
          JunologixReports
        </div>
      </div>

      <div className="flex ">
        <div className="w-1/2 border bg-slate-50 shadow-md p-1">
          {/**this is the form place for post i.e to create the data */}
          <form onSubmit={handleSubmit}>
            <div className="w-[90%] mt-4 mx-auto">
              <label className="md:text-sm text-xs ">abr</label>
              <input
                title="Please fill in your email address "
                placeholder="Enter an Abr"
                className="w-full bg-white md:px-3 md:py-4 p-2 text-xs md:text-sm rounded-md border-solid  mt-2 outline-none"
                type="text"
                value={formData.abr}
                onChange={(e) =>
                  setFormData({ ...formData, abr: e.target.value })
                }
              />
            </div>
            <div className="w-[90%] mt-4 mx-auto">
              <label className="md:text-sm text-xs ">state</label>
              <input
                title="Please fill in your email address "
                placeholder="Enter a state"
                className="w-full bg-white md:px-3 md:py-4 p-2 text-xs md:text-sm rounded-md border-solid mt-2 outline-none"
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>
            <div className="w-[90%] mt-4 mx-auto">
              <label className="md:text-sm text-xs "> return</label>
              <input
                title="Please fill in your email address "
                placeholder="Enter text"
                className="w-full bg-white md:px-3 md:py-4 p-2 text-xs md:text-xs rounded-md border-solid mt-2 outline-none"
                type="text"
                value={formData.return}
                onChange={(e) =>
                  setFormData({ ...formData, return: e.target.value })
                }
              />
            </div>

            <div className="w-[90%] mt-4 mx-auto">
              <label className="md:text-sm text-xs ">status</label>
              <input
                title="Please fill in your email address "
                placeholder="Enter status"
                className="w-full bg-white md:px-3 md:py-4 p-2 text-xs md:text-sm rounded-md border-solid mt-2 outline-none"
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
            </div>
            <div className="w-full  my-4 flex justify-center items-center">
              <button
                type="submit"
                disabled={loading} // Disable the button while loading
                className=" bg-[#75C05F] shadow-2xl outline-none hover:bg-[#6b9558] hover:ease-in-out hover:transition-all text-white font-bold w-[70%] py-3 rounded-lg"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
        {/**Table side toget the information */}
        <div className="w-full  p-4 ">
          <div className="container mx-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr>
                  <th className="border-b px-4 py-3 text-left font-medium text-darkGray text-sm">
                    Abr
                  </th>

                  <th className="border-b px-4 py-3 text-left font-medium text-darkGray text-sm">
                    state
                  </th>
                  <th className="border-b px-4 py-3 text-left font-medium text-darkGray text-sm">
                    return
                  </th>
                  <th className="border-b px-4 py-3 text-left font-medium text-darkGray text-sm">
                    status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-xs">
                {Array.isArray(junologiXData) && junologiXData.length > 0 ? (
                  junologiXData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.abr}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.return}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.status}
                      </td>
                      <div className="flex gap-2 m-2">
                        <span onClick={() => handleEditClick(index)}>
                          <EditIcon />
                        </span>
                        <span onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </span>
                      </div>
                      {isEditModalOpen && (
                        <EditJunologix
                          junologixToEdit={editItem}
                          onClose={() => {
                            setIsEditModalOpen(false);
                            setEditItem(null);
                            setEditedItemIndex(null); // Reset the edited item index
                          }}
                          onJunologixUpdated={(updatedJunologix) => {
                            // Find the index of the edited item in the data array
                            const index = editedItemIndex;

                            if (index !== null) {
                              // Update the junologiXData state with the edited data
                              const updatedData = [...junologiXData];
                              updatedData[index] = updatedJunologix;
                              setJunologixData(updatedData);
                            }

                            setIsEditModalOpen(false);
                          }}
                        />
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JunologixReports;
