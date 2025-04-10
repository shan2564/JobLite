"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: string;
  dateOfApplication: string;
  link: string;
}

const JobList = () => {
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: '1',
      company: 'Google',
      role: 'Software Engineer',
      status: 'Applied',
      dateOfApplication: '2024-01-01',
      link: 'https://google.com/careers'
    },
    {
      id: '2',
      company: 'Facebook',
      role: 'Frontend Developer',
      status: 'Interview',
      dateOfApplication: '2024-02-15',
      link: 'https://facebook.com/careers'
    }
  ]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>(applications);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

  useEffect(() => {
    let newFilteredApplications = [...applications];

    if (statusFilter) {
      newFilteredApplications = newFilteredApplications.filter(app => app.status === statusFilter);
    }

    if (dateFilter) {
      newFilteredApplications = newFilteredApplications.filter(app => app.dateOfApplication === format(dateFilter, 'yyyy-MM-dd'));
    }

    setFilteredApplications(newFilteredApplications);
  }, [statusFilter, dateFilter, applications]);

  const handleDelete = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Current Applications</h2>

      <div className="flex gap-4 mb-4">
        {/* Status Filter */}
        <Select onValueChange={(value) => setStatusFilter(value === "" ? undefined : value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={undefined}>All</SelectItem>
            <SelectItem value="Applied">Applied</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Offer">Offer</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !dateFilter && "text-muted-foreground"
              )}
            >
              {dateFilter ? (
                format(dateFilter, "yyyy-MM-dd")
              ) : (
                <span>Filter by Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center" side="bottom">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              disabled={(date) =>
                date > new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={() => {
          setStatusFilter(undefined);
          setDateFilter(undefined);
        }}>Clear Filters</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Company
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date of Application
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Link
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => (
              <tr key={app.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{app.company}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{app.role}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">{app.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{app.dateOfApplication}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <a href={app.link} className="text-teal-500 hover:text-teal-700" target="_blank" rel="noopener noreferrer">
                    Apply
                  </a>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <Button onClick={() => handleDelete(app.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;

