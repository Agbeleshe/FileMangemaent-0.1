import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FAQ } from "../../pages/Paperlink/resources/PaperLinkFAQ";
import { AiOutlineDown } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";

interface SecondModalJunologixProps {
  setModalTwo: (value: boolean) => void;
  handleModalClose: () => void;
  setFAQs: React.Dispatch<React.SetStateAction<FAQ[]>>;
  FAQs: FAQ[];
  endpoint: string;
  onAddFAQ: (faq: FAQ) => void;
  onSubmitSuccess: () => void;
}

interface Category {
  id: number;
  name: any;
}

const SecondModalJunologix: React.FC<SecondModalJunologixProps> = ({
  setModalTwo,
  handleModalClose,
  setFAQs,
  FAQs,
  endpoint,
  onAddFAQ,
  onSubmitSuccess,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | string>("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [endpoint]); // Include 'endpoint' as a dependency

  const fetchCategories = () => {
    setisLoading(true);

    axiosInstance
      .get(`/categories?$sort[position]=1&for=` + endpoint)
      .then((res) => {
        setCategories(res.data);
        setSelectedCategory("");
      })
      .catch((error) => {
        console.error("Error fetching Junologix FAQs:", error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const handleAdd = async () => {
    if (!isSubmitting) {
      setIsSubmitting(true);

      try {
        const requestPayload = {
          categoryId: selectedCategory,
          question,
          answer,
          for: endpoint, // Make sure this is set correctly
        };

        console.log("Request Payload:", requestPayload);

        const response = await axiosInstance.post(
          `/faq?$sort[position]=1&for=` + endpoint,
          requestPayload
        );

        console.log("Response:", response);

        // Call the callback function to update the FAQ state
        onAddFAQ(response.data);

        // Reset form fields
        setSelectedCategory("");
        setQuestion("");
        setAnswer("");

        // Close modal
        setModalTwo(false);

        // Reload categories
        fetchCategories();
        onSubmitSuccess();
      } catch (error) {
        console.error("Error while saving data:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-black opacity-5"></div>
      <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl w-auto md:min-w-[800px]">
        <div className="flex justify between px-5 mb-3 w-full border-b-2 pb-2">
          <div className="text-black font-semibold">
            Add New Question & Answers
          </div>
          <p className="cursor-pointer" onClick={handleModalClose}>
            <TfiClose />
          </p>
        </div>

        <div className="px-5 w-full">
          <form action="">
            <div className="h-auto px-5">
              {/* input field one */}
              <div>
                <label className="mb-5">Category</label>
                <div
                  className="w-full align-middle items-center justify-center flex  mb-5 relative"
                  style={{ zIndex: 1 }}
                >
                  {isLoading && (
                    <div className="text-sm flex gap-2 bg-slate-50 w-full py-4 px-8 rounded-lg outline-none mt-3">
                      <ClipLoader color="red" size={15} />
                      <p> please wait...</p>
                    </div>
                  )}
                  {!isLoading && (
                    <select
                      className="bg-slate-50 w-full py-4 px-8  border  border-transparent rounded-lg outline-none mt-3"
                      style={{ appearance: "none" }}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  )}

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <AiOutlineDown />
                  </div>
                </div>
              </div>

              {/* input field two */}
              <div>
                <label className="mb-5">Question</label>
                <textarea
                  className="w-full px-3 py-2  bg-slate-50   border border-transparent rounded-lg focus:outline-none"
                  placeholder="What is.....?"
                  rows={2}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                ></textarea>
              </div>

              {/* input field three */}
              <div>
                <label className="mb-5">Answer</label>
                <textarea
                  className="w-full px-4 py-3 text-slate-700 bg-slate-50 border border-slate-100 rounded-lg focus:outline-none"
                  placeholder="What is.....?"
                  rows={4}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                ></textarea>
              </div>

              {/* buttons */}
              <div className="flex justify-center mt-5">
                <button
                  type="button"
                  className={`${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-green-500 hover-bg-green-600"
                  } text-white font-bold py-2 px-4 rounded`}
                  onClick={handleAdd}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondModalJunologix;
