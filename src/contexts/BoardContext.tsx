import { categoriesData } from "@/assets/categories-data";
import { Category } from "@/types/category";
import { createContext, ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";

interface CreateNewCategoryProps {
  title: string;
}

interface BoardContextProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  createNewCategory: (props: CreateNewCategoryProps) => void;
  deleteCategory: (categoryId: string) => void;
}

export const BoardContext = createContext({} as BoardContextProps);

interface BoardContextProviderProps {
  children: ReactNode;
}

export function BoardProvider({ children }: BoardContextProviderProps) {
  const [categories, setCategories] = useState(categoriesData);

  function createNewCategory({ title }: CreateNewCategoryProps) {
    setCategories((prevState) => [
      ...prevState,
      { id: uuid(), title, todos: [] },
    ]);
  }

  function deleteCategory(categoryId: string) {
    setCategories((prevState) =>
      prevState.filter((category) => category.id !== categoryId),
    );
  }

  return (
    <BoardContext.Provider
      value={{
        categories,
        setCategories,
        createNewCategory,
        deleteCategory,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
