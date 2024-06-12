import { useEffect, useState, useDeferredValue } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { FETCH_EMPLOYEES, DELETE_CONTACT } from "./graphql";
import { Contact } from './types';

export const useFetchEmployees = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentOffset, setCurrentOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const localContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    const [dataSource, setDataSource] = useState<Contact[]>(localContacts);
    const deferredSearchText = useDeferredValue(searchTerm);
    const { data, error, loading, refetch } = useQuery(
        FETCH_EMPLOYEES,
        {
            variables: {
                input: {
                    offset: currentOffset,
                    limit: 10,
                    search: deferredSearchText
                },
                fetchPolicy: "network-only",
            }
        }
    );
    const [deleteContact] = useMutation(DELETE_CONTACT);

    useEffect(() => {
        if (data && data.getEmployees && data.getEmployees.user) {
            const contactsFromServer = data.getEmployees.user.map((contact: Contact) => ({
                ...contact,
                key: contact.id,
            }));

            setDataSource(contactsFromServer);
            localStorage.setItem("contacts", JSON.stringify(contactsFromServer));
        }
    }, [data]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTableChange = (pagination: any) => {
        const newOffset = (pagination.current - 1) * pagination.pageSize;
        setCurrentOffset(newOffset);
        setCurrentPage(pagination.current);
    };
    const handleDelete = async (id: string) => {
        try {
            await deleteContact({ variables: { id } });
            notification.success({ message: "Contact deleted successfully" });
            const updatedContacts = dataSource.filter((contact) => contact.id !== id);
            setDataSource(updatedContacts);
            localStorage.setItem("contacts", JSON.stringify(updatedContacts));
            refetch();
        } catch {
            notification.error({ message: "Error deleting contact" });
        }
    };

    return {
        searchTerm, setSearchTerm,
        currentOffset, setCurrentOffset,
        currentPage, setCurrentPage,
        localContacts, dataSource, setDataSource,
        deleteContact, data, error, loading, refetch,
        handleTableChange, handleDelete
    };
};