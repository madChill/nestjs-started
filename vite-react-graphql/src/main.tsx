import ReactDOM from "react-dom/client";
import { ApolloWrapper } from "./lib/apolloProvider";
import App from "./views/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloWrapper>
    <App/>
  </ApolloWrapper>
);
