import {
  Input,
  Button,
  Form,
  Space,
  Typography,
  Breadcrumb,
} from "antd";
import {
  CotainerPage,
  StyledFormContainer,
  SpacedStyle,
  ImageContainer,
} from "../../component/styledComponent";
import { WrappedSEO } from "../../component/WrappedSEO";
import { useUpdateEmployees } from "./hooks";


export const EditContactForm: React.FC = () => {
  const {
    handleUpdate,
    firstName, setFirstName,
    lastName, setLastName,
    phones, setPhones,
    email, setEmail
  } = useUpdateEmployees()
  return (
    <CotainerPage>
      <WrappedSEO title="Edit Employee" />
      <StyledFormContainer>
        <div>
          <Typography.Title>Edit Employee</Typography.Title>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/employee/list">Employees List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit Employee</Breadcrumb.Item>
          </Breadcrumb>

          <SpacedStyle>
            <Form layout="vertical">
              
            <Form.Item label="Email" required>
                <Input
                  disabled
                  type="email"
                  data-testid="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="First Name">
                <Input
                  value={firstName}
                  data-testid="firstNameInput"
                  id="firstNameInput"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item label="Last Name">
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </Form.Item>
              <Form.Item label="Phone Number" required>
                <Input
                  value={phones}
                  data-testid="phoneInput"
                  onChange={(e) => setPhones(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" onClick={handleUpdate}>
                    Update Contact
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </SpacedStyle>
        </div>
        <ImageContainer>
          <img
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
            alt="Description of the image"
          />
        </ImageContainer>
      </StyledFormContainer>
    </CotainerPage>
  );
};
