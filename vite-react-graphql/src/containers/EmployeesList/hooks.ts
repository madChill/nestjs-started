import { useEffect, useState, useDeferredValue } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate, useLocation } from "react-router-dom";
import { notification } from "antd";
import { FETCH_EMPLOYEES, DELETE_CONTACT } from "./graphql";
import { Contact } from './types';

export const useFetchEmployees = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentOffset, setCurrentOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSource, setDataSource] = useState<Contact[]>([]);
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
            },
        }
    );
    const [deleteContact] = useMutation(DELETE_CONTACT);
    const queryParams = new URLSearchParams(location.search);
    const searchUpdated = queryParams.get('updated') || "";
    useEffect(() => {
        if(searchUpdated){
            refetch();
        }
    }, [searchUpdated]);

    useEffect(() => {
        if (data && data.getEmployees && data.getEmployees.users) {
            const contactsFromServer = data.getEmployees.users.map((contact: Contact) => ({
                ...contact,
                key: contact.id,
            }));

            setDataSource(contactsFromServer);
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
            refetch();
        } catch {
            notification.error({ message: "Error deleting contact" });
        }
    };
    
    return {
        searchTerm, setSearchTerm,
        currentOffset, setCurrentOffset,
        currentPage, setCurrentPage, dataSource, setDataSource,
        deleteContact, data, error, loading, refetch,
        handleTableChange, handleDelete
    };
};