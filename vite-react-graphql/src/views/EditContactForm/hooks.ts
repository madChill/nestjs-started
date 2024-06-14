import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";
import { notification } from 'antd'
import {
  FETCH_CONTACT_BY_ID,
  UPDATE_CONTACT,
} from "./graphql";

export const useUpdateEmployees = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error } = useQuery(FETCH_CONTACT_BY_ID, {
    variables: { id: parseInt(id ?? "") },
    skip: !id,
  });

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phones, setPhones] = useState<string>("");

  useEffect(() => {
    if (data) {
      
      setFirstName(data.getEmployee.firstName);
      setLastName(data.getEmployee.lastName);
      setEmail(data.getEmployee.email);
      setPhones(data.getEmployee.phoneNumber);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error fetching contact",
        description: error.message,
      });
      navigate("/not-found");
    }
  }, [error]);

  const [updateContact, { loading }] = useMutation(UPDATE_CONTACT, {
    onCompleted: (res) => {
      notification.success({ message: "Contact updated successfully" });
      const updated = new Date().toISOString()
      navigate({
        pathname: "/",
        search: createSearchParams({
          updated
        }).toString()
      });
    },
    onError: (error) => {
      notification.error({
        message: "Error updating contact",
        description: error.message,
      });
    },
  });

  const handleUpdate = () => {
    updateContact({
      variables: {
        input: { id: parseInt(id ?? ""), firstName: firstName, lastName: lastName, phoneNumber: phones, email }
      },
    }).then(() => {
      // Then, update each phone number
    });
  };
  return {
    email, setEmail,
    handleUpdate,
    firstName, setFirstName,
    lastName, setLastName,
    phones, setPhones,
    loading
  }
};