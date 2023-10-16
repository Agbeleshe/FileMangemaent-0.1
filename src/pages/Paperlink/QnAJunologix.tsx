import React, { useState, useEffect } from "react";
import Dots from "../../components/svg-icons/Dots";
import PlusGreen from "../../components/svg-icons/PlusGreen";
import DeleteIcon from "../../components/svg-icons/DeleteIcon";
import EditIcon from "../../components/svg-icons/EditIcon";
import axiosInstance from "../../utils/axiosInstance";
import { PaperLinkFAQ, FAQ } from "./resources/PaperLinkFAQ";
import FirstModalJunologix from "../../components/FQAModals/FirstModalJunologix";
import SecondModalJunologix from "../../components/FQAModals/SecondModalJunologix";
import EditFqaJunologix from "../../components/FQAModals/EditFqaJunologix";
import EditCategoryJunologix from "../../components/FQAModals/EditCategoryJunologix";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
  DraggableProvided,
} from "react-beautiful-dnd";
//import { constants } from "http2";
import Loader from "./resources/Loader";

const QnAJunologix = () => {
  const [modalOne, setModalOne] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [paperLinkFAQs, setPaperLinkFAQs] = useState<PaperLinkFAQ[]>([]);
  const [showPaperLinks, setShowPaperLinks] = useState<boolean[]>([]);
  const [FAQs, setFAQs] = useState<FAQ[]>([]);
  const [showFQA, setShowFQA] = useState<boolean[]>([]);
  const [editFAQ, setEditFAQ] = useState<FAQ | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState<PaperLinkFAQ | null>(null);
  const [loading, setLoading] = useState(false); // Set it to true initially or use an appropriate initial value

  // State for dragged item for category
  const [draggedItem, setDraggedItem] = useState<FAQ | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  //for the dragged item for faq
  const [draggedFAQ, setDraggedFAQ] = useState<FAQ | null>(null);
  const [draggedFAQIndex, setDraggedFAQIndex] = useState<number | null>(null);

  // Calling APIs
  useEffect(() => {
    // Fetch PaperLink FAQs
        setLoading(true);

    axiosInstance
      .get(`/categories?$sort[position]=1&for=junologix`)
      .then((response) => {
        setPaperLinkFAQs(response.data as PaperLinkFAQ[]);
        setShowPaperLinks(new Array(response.data.length).fill(false));
                setLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching PaperLink FAQs:", error);
                setLoading(false);

      });

    // Fetch FAQs
    axiosInstance
      .get(`/faq?$sort[position]=1&for=junologix`)
      .then((response) => {
        setFAQs(response.data as FAQ[]);
                setLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
                setLoading(false);

      });
  }, []);

  // Modal functions

  // Toggle category
  const togglePaperLink = (index: number) => {
    const updatedShowPaperLinks = [...showPaperLinks];
    updatedShowPaperLinks[index] = !updatedShowPaperLinks[index];
    setShowPaperLinks(updatedShowPaperLinks);
  };

  // Toggle FAQ
  const toggleFQA = (index: number) => {
    const updatedShowFQA = [...showFQA];
    updatedShowFQA[index] = !updatedShowFQA[index];
    setShowFQA(updatedShowFQA);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalOne(false);
    setModalTwo(false);
  };

  const handleModalOne = () => {
    setModalOne(!modalOne);
  };

  const handleModalTwo = () => {
    setModalTwo(!modalTwo);
  };

  // Function to delete a category
  const handleDeleteCategory = (categoryId: number) => {
    axiosInstance
      .delete(`/categories/${categoryId}`)
      .then((response) => {
        // Filter out the category with the specified ID
        const updatedCategories = paperLinkFAQs.filter(
          (category) => category.id !== categoryId
        );
        setPaperLinkFAQs(updatedCategories);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  // Deleting question and answer icon
  const handleDeleteFAQ = (faqId: number) => {
    axiosInstance
      .delete(`/faq/${faqId}`)
      .then((response) => {
        const updatedFAQs = FAQs.filter((faq) => faq.id !== faqId);
        setFAQs(updatedFAQs);
      })
      .catch((error) => {
        console.error("Error deleting FAQ:", error);
      });
  };

  // Open edit modal
  const openEditModal = (faq: FAQ) => {
    setEditFAQ(faq);
    setIsEditing(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditFAQ(null);
    setIsEditing(false);
  };

  // Handle drag over for category item
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
  };

  // Handle drop for category item
  const handleDrop = (index: number) => {
    if (draggedItem && draggedItemIndex !== null) {
      const updatedFAQs = [...FAQs];
      updatedFAQs.splice(draggedItemIndex, 1);

      const updatedCategory = paperLinkFAQs[index];
      updatedCategory.faqs.push(draggedItem);

      setFAQs(updatedFAQs);
      setDraggedItem(null);
      setDraggedItemIndex(null);
    }
  };

  // Handle drag end for categories
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedCategories = Array.from(paperLinkFAQs);
    const [removedCategory] = reorderedCategories.splice(
      result.source.index,
      1
    );
    reorderedCategories.splice(result.destination.index, 0, removedCategory);
    let extractedreorderCategory = reorderedCategories.map((item, index) => {
      return {
        id: item.id,
        position: ++index,
      };
    });
    setPaperLinkFAQs(reorderedCategories);

    // Send a POST request to update the server with the new category order
    try {
      await axiosInstance.post(`/categories?$sort[position]=1&for=junologix`, {
        action: "orderCategories",
        order: extractedreorderCategory,
      });
    } catch (error) {
      console.error("Error updating categories:", error);
    }
  };

  // Handle drag over for FAQ item
  const handleFAQDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
  };

  // Handle drop for FAQ item
  const handleFAQDrop = (index: number) => {
    if (draggedFAQ && draggedFAQIndex !== null) {
      const updatedFAQs = [...FAQs];
      updatedFAQs.splice(draggedFAQIndex, 1);

      updatedFAQs.splice(index, 0, draggedFAQ);

      setFAQs(updatedFAQs);
      setDraggedFAQ(null);
      setDraggedFAQIndex(null);
    }
  };

  // Handle drag end for FAQs
  const handleFAQDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // Dropped outside the list

    // Reorder the FAQ items in the state
    const reorderedFAQs = Array.from(FAQs);
    const [removedFAQ] = reorderedFAQs.splice(result.source.index, 1);
    reorderedFAQs.splice(result.destination.index, 0, removedFAQ);

    setFAQs(reorderedFAQs);

    // Send a POST request to update the server with the new FAQ order
    try {
      await axiosInstance.post(`/faq?$sort[position]=1&for=junologix`, {
        action: "orderFAQ",

        order: reorderedFAQs.map((faq, index) => ({
          id: faq.id,
          position: index + 1,
        })),
      });
    } catch (error) {
      console.error("Error updating FAQs:", error);
    }
  };

  // Function to update an FAQ in the state for editing
  const handleFAQUpdated = (updatedFAQ: FAQ) => {
    const updatedFAQIndex = FAQs.findIndex((faq) => faq.id === updatedFAQ.id);
    if (updatedFAQIndex !== -1) {
      const updatedFAQs = [...FAQs];
      updatedFAQs[updatedFAQIndex] = updatedFAQ;
      setFAQs(updatedFAQs);
    }
  };

  // Function to update category data
  const updateCategories = () => {
    axiosInstance
      .get("/categories?$sort[position]=1&for=junologix")
      .then((response) => {
        setPaperLinkFAQs(response.data as PaperLinkFAQ[]);
        setShowPaperLinks(new Array(response.data.length).fill(false));
      })
      .catch((error) => {
        console.error("Error fetching PaperLink FAQs:", error);
      });
  };

  // Function to handle FAQ updates for the question and answer
  const handleAddFAQ = async (faq: FAQ) => {
    try {
      const response = await axiosInstance.post(
        "/faq?$sort[position]=1&for=junologix",
        faq
      );
      setFAQs([...FAQs, response.data]);
      setModalTwo(false);
    } catch (error) {
      console.error("Error adding FAQ:", error);
    }
  };
  //  console.log("FAQs:", FAQs);
  // Handle category update
  const handleCategoryUpdated = (updatedCategory: PaperLinkFAQ) => {
    // Update the category in the state
    const updatedCategories = [...paperLinkFAQs];
    const categoryIndex = updatedCategories.findIndex(
      (category) => category.id === updatedCategory.id
    );

    if (categoryIndex !== -1) {
      updatedCategories[categoryIndex] = updatedCategory;
      setPaperLinkFAQs(updatedCategories);
    }
  };

  return (
    <div className="mb-32 md:mb-0 border-radius-[0.9375rem] bg-white width-[65.75rem] h-auto overflow-hidden font-Poppins rounded-lg">
      <div className="bg-secondaryColor flex justify-between h-[4.1875rem] rounded-t-lg px-4 py-2">
        <div className="border-b-0 text-black font-medium leading-normal text-2xl">
          QnA Junologix
          
        </div>

        <div className="">
          <span
            onClick={handleModalOne}
            className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current active:bg-slate-300 bg-white rounded-full shadow-drop"
          >
            <PlusGreen />
          </span>
        </div>
      </div>
      {/**HERE THE MAIN */}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {modalOne ? (
            <FirstModalJunologix
              setModalOne={setModalOne}
              handleModalClose={handleModalClose}
              updateCategories={updateCategories}
            />
          ) : (
            ""
          )}

          <div className="p-3">
            <div className="shadow-full mb-4 ">
              <h1 className="font-semibold py-3  px-4  text-black">Category</h1>
              <div className="shadow-full shadow-sm shadow-gray-200 border border-gray-100 rounded-lg text-sm">
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="categories" direction="vertical">
                    {(provided: DroppableProvided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {/* Ensure that the placeholder is rendered within the Droppable */}
                        {provided.placeholder}
                        {paperLinkFAQs.map((faq, index) => (
                          <Draggable
                            key={faq.id}
                            draggableId={faq.id.toString()}
                            index={index}
                          >
                            {(provided: any) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => togglePaperLink(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={() => handleDrop(index)}
                                className="bg-white rounded-lg border-t border-gray-200 p-2 gap-3 flex items-center"
                              >
                                <div className="w-full">
                                  <div className="'w-full p-2 flex justify-between ">
                                    <p className="flex gap-3">
                                      <span className="ml-2">
                                        <Dots />
                                      </span>
                                      {faq.name}
                                    </p>
                                    <p className="flex gap-5 px-2 z-10">
                                      <span
                                        className="cursor-pointer"
                                        onClick={() => setEditCategory(faq)}
                                      >
                                        <EditIcon />
                                      </span>

                                      <span
                                        className="cursor:pointer z-20"
                                        onClick={() =>
                                          handleDeleteCategory(faq.id)
                                        }
                                      >
                                        <DeleteIcon />
                                      </span>
                                    </p>
                                  </div>
                                  {editCategory && (
                                    <EditCategoryJunologix
                                      categoryToEdit={editCategory}
                                      onClose={() => setEditCategory(null)}
                                      onCategoryUpdated={(updatedCategory) => {
                                        handleCategoryUpdated(updatedCategory);
                                        setEditCategory(null);
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>

          {/* Send side */}
          <div className="shadow-full">
            <div className="flex justify-between mb-1">
              <h1 className="font-semibold px-5 text-black">
                Questions & Answers
              </h1>

              <span
                onClick={handleModalTwo}
                className="inline-flex items-center justify-center w-12 h-12 flex-shrink-0 fill-current active:bg-slate-300 bg-white rounded-full shadow-full drop-shadow-lg"
              >
                <PlusGreen />
              </span>
            </div>
            {modalTwo ? (
              <SecondModalJunologix
                setModalTwo={setModalTwo}
                handleModalClose={handleModalClose}
                setFAQs={setFAQs}
                FAQs={FAQs}
              />
            ) : (
              ""
            )}
            <div className="shadow-full shadow-sm shadow-gray-200 border border-gray-100 rounded-lg text-sm mb-5">
              {/* Mapped arrays */}
              <DragDropContext onDragEnd={handleFAQDragEnd}>
                <Droppable droppableId="faq-list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <div className="shadow-full w-full shadow-sm shadow-gray-200 border border-gray-100 rounded-lg text-sm ">
                        {FAQs.map((qna, index) => (
                          <Draggable
                            key={qna.id}
                            draggableId={qna.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex w-full justify-between border border-gray-50"
                              >
                                <div className="bg-white w-full hover:bg-gray-200 rounded-lg border-t border-gray-200 p-2 gap-3 flex items-center">
                                  <div
                                    className="w-full"
                                    onClick={() => toggleFQA(index)}
                                  >
                                    <p className="flex gap-3">
                                      <span className="ml-2">
                                        <Dots />
                                      </span>
                                      {qna.question}
                                    </p>
                                    {showFQA[index] && (
                                      <div className="py-5">
                                        <div className="px-5">
                                          <p className="text-gray-700">
                                            Answers: {qna.answer}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <p className="flex gap-5 px-2">
                                    <span
                                      onClick={() => openEditModal(qna)}
                                      className="cursor-pointer"
                                    >
                                      <EditIcon />
                                    </span>
                                    <span
                                      onClick={() => handleDeleteFAQ(qna.id)}
                                      className="cursor-pointer"
                                    >
                                      <DeleteIcon />
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          {isEditing && (
            <EditFqaJunologix
              faqToEdit={editFAQ}
              onClose={closeEditModal}
              onFAQUpdated={handleFAQUpdated}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QnAJunologix;
//
