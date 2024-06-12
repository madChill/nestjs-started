
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Input, Popconfirm, Breadcrumb } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import Title from "antd/es/typography/Title";
import { WrappedSEO } from "../../component/WrappedSEO";
import { useFetchEmployees } from "./hooks";

const ITEMS_PER_PAGE = 10;

const ActionButton = styled(Button)`
  margin-right: 8px;
  &:last-of-type {
    margin-right: 0;
  }
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const CotainerPage = styled.div`
  padding: 24px;
  height: 100vh;

  @media (min-width: 768px) {
    padding: 128px;
  }
`;

const SpacedStyle = styled(Space)`
  margin-bottom: 16px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;



export const EmployeesList = () => {
  const navigate = useNavigate();
  const {
    searchTerm, setSearchTerm,
    currentPage, setCurrentPage,
    localContacts, dataSource, setDataSource,
    deleteContact, data, error, loading,
    handleTableChange, handleDelete
  } = useFetchEmployees()

  const totalCount = data?.getEmployees?.total || 0;


  const handleEdit = (id: string) => {
    navigate(`/employee/edit/${id}`);
  };


  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Phone Numbers",
      dataIndex: "phoneNumber",
      // render: (phones: { number: string }[]) =>
      //   phones.map((phone) => phone.number).join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (record: { id: string }) => (
        <Space size="middle">
          <ActionButton onClick={() => handleEdit(record.id)}>
            Edit
          </ActionButton>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              // onClick={() => handleDelete(record.id)}
              danger
              type="primary"
            >
              Delete
            </Button>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  return (
    <CotainerPage>
      <WrappedSEO title="Employees List" />
      <Title>Employees List</Title>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Employees List</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <SpacedStyle>
        <SearchBox>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for contacts"
          />
        </SearchBox>
        <Button
          icon={<PlusOutlined />}
          onClick={() => navigate("/employee/create")}
          type="primary"
        >
          Add More Contact
        </Button>
      </SpacedStyle>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: ITEMS_PER_PAGE,
            total: totalCount,
          }}
          onChange={handleTableChange}
        />
      )}
    </CotainerPage>
  );
};
