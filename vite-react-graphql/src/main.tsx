import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";

import { ApolloWrapper } from "./lib/apolloProvider";

import { ContactForm } from "./containers/ContactForm/ContactFormPage";
import { EmployeesList } from "./containers/EmployeesList";
import { EditContactForm } from "./containers/EditContactForm/EditContactForm";
import NotFound from "./containers/NotFound/NotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloWrapper>
    <Router>
      <Routes>
        <Route path="/employee/list" element={<EmployeesList />} />
        <Route path="/employee/create" element={<ContactForm />} />
        <Route path="/employee/edit/:id" element={<EditContactForm />} />
        <Route path="/" element={<EmployeesList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </ApolloWrapper>
);
