import { createBrowserRouter } from 'react-router-dom';
import NotFound from "../views/NotFound/NotFound";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { EmployeesList } = await import('../views/EmployeesList');
        return { Component: EmployeesList };
      },
    },

    {
      path: '/employee',
      children: [
        {
          path: 'list',
          lazy: async () => {
            const { EmployeesList } = await import('../views/EmployeesList');
            return { Component: EmployeesList };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { ContactForm } = await import(
              '../views/ContactForm/ContactFormPage'
            );
            return { Component: ContactForm };
          },
        },
        {
          path: 'edit/:id',
          lazy: async () => {
            const { EditContactForm } = await import(
              '../views/EditContactForm/EditContactForm'
            );
            return { Component: EditContactForm };
          },
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);