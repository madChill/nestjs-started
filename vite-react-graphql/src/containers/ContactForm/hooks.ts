import { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { useNavigate, createSearchParams } from "react-router-dom";
import { notification } from "antd";
import { CREATE_EMPLOYEE_WITH_PHONES } from "./graphql";

export const useFetchContactForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phones, setPhones] = useState("");
    const [addContact] = useMutation(CREATE_EMPLOYEE_WITH_PHONES);
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const specialCharPattern = /[^a-zA-Z0-9 ]/;
        if (
            specialCharPattern.test(firstName) ||
            specialCharPattern.test(lastName)
        ) {
            alert("Names shouldn't have special characters.");
            return;
        }
        try {
            const { data, errors } = await addContact({
                variables: {
                    input: { firstName: firstName, lastName: lastName, phoneNumber: phones, email }
                },
            });
            if (errors) {
                alert("Error adding contact: " + errors[0].message);
                return;
            }
            if (data && data?.createUser?.status) {
                notification.success({
                    message: "Contact added successfully",
                });
                setFirstName("");
                setLastName("");
                setPhones("");
                const updated = new Date().toISOString()
                navigate({
                    pathname: "/",
                    search: createSearchParams({
                        updated
                    }).toString()
                });
            } else {
                notification.error({
                    message: "Error adding contact",
                });
            }
        } catch (error) {
            notification.error({
                message: "Error adding contact",
                description: "An error occurred while adding contact. Please try again.",
            });
        }
    };

    return {
        firstName, setFirstName, lastName,
        email, setEmail,
        setLastName, phones, addContact, setPhones,
        navigate, handleSubmit
    };
};