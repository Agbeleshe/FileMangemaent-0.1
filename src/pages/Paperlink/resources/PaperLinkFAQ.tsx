export interface PaperLinkFAQ {
    id: number;
    position: number | null;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
    name: string;
    faqs: {
      id: number;
      question: string;
      answer: string;
      position: number | null;
      createdAt: string;
      updatedAt: string;
      categoryId: number;
    }[];
  }


  export interface FAQ {
    id: number;
    question: string;
    answer: string;
    position: number | null;
    createdAt: string;
    updatedAt: string;
    categoryId: number;
  }