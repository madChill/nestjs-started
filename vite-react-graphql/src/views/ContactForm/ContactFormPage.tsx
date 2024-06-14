import {
  Button,
  Input,
  Form,
  Space,
  Breadcrumb,
  Typography,
} from "antd";
import {
  CotainerPage,
  StyledFormContainer,
  SpacedStyle,
  ImageContainer,
} from "../../component/styledComponent";
import { WrappedSEO } from "../../component/WrappedSEO";
import { useFetchContactForm } from './hooks'

export const ContactForm = () => {
  const {
    firstName, setFirstName, lastName,
    setLastName, phones, setPhones,
    email, setEmail, handleSubmit, loading
  } = useFetchContactForm()

  return (
    <CotainerPage>
      <WrappedSEO title={"Create Contact"} />
      <StyledFormContainer>
        <div>
          <Typography.Title>Create Contact</Typography.Title>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/employee/list">Employees List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Contact</Breadcrumb.Item>
          </Breadcrumb>

          <SpacedStyle>
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Form.Item label="Email" required>
                <Input
                  type="email"
                  data-testid="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="First Name" required>
                <Input
                  data-testid="firstNameInput"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Last Name" required>
                <Input
                  value={lastName}
                  data-testid="lastNameInput"
                  onChange={(e) => setLastName(e.target.value)}
                />
                
              </Form.Item>
              <Form.Item label="Phone Number" required>
                <Input
                  value={phones}
                  data-testid="phoneInput"
                  onChange={(e) => setPhones(e.target.value)}
                />
              </Form.Item>

              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  data-testid="submitButton"
                  loading={loading}
                >
                  Add Contact
                </Button>
              </Space>
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
