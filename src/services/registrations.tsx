import { Registration, NewRegistration } from '~/types/types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRegistrations = async (query: string = ''): Promise<Registration[]> => {
  const response = await fetch(`${API_URL}/registrations${query}`);

  if (!response.ok)
    throw new Error('Network response was not ok');

  return response.json();
};

export const postRegistration = async (data: NewRegistration): Promise<NewRegistration[]> => {
  const response = await fetch(`${API_URL}/registrations`, {
    method: "POST",
    body: JSON.stringify({ 
      ...data,
      status: "REVIEW"
    }),
  });

  if (!response.ok)
    throw new Error('Network response was not ok');

  return response.json();
};

export const updateRegistration = async (data: Registration, status: string): Promise<Registration[]> => {
  const response = await fetch(`${API_URL}/registrations/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify({ 
      ...data,
      status 
    }),
  });

  if (!response.ok)
    throw new Error('Network response was not ok');

  return response.json();
};

export const deleteRegistration = async (id: string): Promise<Registration[]> => {
  const response = await fetch(`${API_URL}/registrations/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok)
    throw new Error('Network response was not ok');

  return response.json();
};