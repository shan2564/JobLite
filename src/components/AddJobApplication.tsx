"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const AddJobApplication = () => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [dateOfApplication, setDateOfApplication] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your submit logic here
    console.log({ company, role, status, dateOfApplication, link });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <Input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <Input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateOfApplication" className="block text-sm font-medium text-gray-700">Date of Application</label>
          <Input
            type="date"
            id="dateOfApplication"
            value={dateOfApplication}
            onChange={(e) => setDateOfApplication(e.target.value)}
            className="mt-1 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link to Application</label>
          <Input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <Button type="submit" className="mt-4 bg-teal-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
        Add Application
      </Button>
    </form>
  );
};

export default AddJobApplication;
