import React, { useState, useEffect } from "react";
import { FAQ } from "../../pages/Paperlink/resources/PaperLinkFAQ";
import { TfiClose } from "react-icons/tfi";
import axiosInstance from "../../utils/axiosInstance";

interface Category {
  id: number;
  name: string;
}

interface EditFqaJunologixProps {
  faqToEdit: FAQ | null;
  onClose: () => void;
  onFAQUpdated: (updatedFAQ: FAQ) => void;
}

const EditFqaJunologix: React.FC<EditFqaJunologixProps> = ({
  faqToEdit,
  onClose,
  onFAQUpdated,
}) => {
  const [question, setQuestion] = useState(faqToEdit?.question || "");
  const [answer, setAnswer] = useState(faqToEdit?.answer || "");
  const [selectedCategory, setSelectedCategory] = useState<number | string>(
    faqToEdit?.categoryId || ""
  );
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/categories?$sort[position]=1&for=junologix`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (faqToEdit) {
      axiosInstance
        .put(`/faq/${faqToEdit.id}`, {
          categoryId: selectedCategory,
          question,
          answer,
        })
        .then((response) => {
          console.log("FAQ updated successfully:", response.data);
          onFAQUpdated(response.data);

          onClose();
        })
        .catch((error) => {
          console.error("Error updating FAQ:", error);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-black opacity-5"></div>
      <div className="z-10 relative bg-white py-5 rounded-xl shadow-xl min-w-[150px] md:min-w-[200px]">
        <div className="flex justify-between px-5 w-full border-b-2 pb-2">
          <h2 className="text-black font-semibold">Edit Question and Answer</h2>
          <span className="cursor-pointer" onClick={onClose}>
            <TfiClose />
          </span>
        </div>
        <div className="px-5 w-full ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="category" className="mb-5">
              Category:
            </label>
            <select
              className="bg-slate-50 w-full py-4 px-8 rounded-lg mt-3"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="question" className="mb-5">
              Question:
            </label>
            <input
              className="bg-slate-50 w-full py-4 px-6 rounded-lg mt-3"
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <label htmlFor="answer" className="mb-5">
              Answer:
            </label>

            <textarea
              className="bg-slate-50 w-full h-32 py-4 px-8 rounded-lg mt-3"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            <div className="w-full align-middle items-center justify-center flex mt-10 mb-5 ">
              <button
                type="submit"
                className="px-8 py-3 text-white bg-green-500 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFqaJunologix;
