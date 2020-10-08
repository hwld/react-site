import * as React from 'react';
import { useContext } from 'react';
import {
  getDefaultCategoryService,
  CategoryService,
} from '../services/categories';

const CategoriesContext = React.createContext<CategoryService>(
  getDefaultCategoryService(),
);

export const CategoriesContextProvider: React.FC<{
  value: CategoryService;
}> = ({ children, value }) => {
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => useContext(CategoriesContext);
