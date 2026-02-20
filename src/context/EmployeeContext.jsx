import React, { createContext, useContext, useState } from "react";

// Initial dummy data
const initialTrainers = [
  {
    id: 1,
    name: "Rahul Sharma",
    expertise: "React & Node.js",
    students: 45,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Priya Patel",
    expertise: "Python & Data Science",
    students: 38,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Ankit Verma",
    expertise: "Java & Spring Boot",
    students: 52,
    rating: 4.7,
  },
];

const initialAnalysts = [
  {
    id: 1,
    name: "Neha Gupta",
    department: "Data Analytics",
    projects: 12,
    successRate: "94%",
  },
  {
    id: 2,
    name: "Rajesh Iyer",
    department: "Business Intelligence",
    projects: 9,
    successRate: "89%",
  },
  {
    id: 3,
    name: "Sneha Desai",
    department: "Market Research",
    projects: 15,
    successRate: "92%",
  },
];

const initialCounsellors = [
  {
    id: 1,
    name: "Kavita Joshi",
    studentsAssigned: 28,
    sessionsCompleted: 134,
    satisfaction: 4.9,
  },
  {
    id: 2,
    name: "Arjun Nair",
    studentsAssigned: 22,
    sessionsCompleted: 98,
    satisfaction: 4.7,
  },
  {
    id: 3,
    name: "Meera Menon",
    studentsAssigned: 31,
    sessionsCompleted: 156,
    satisfaction: 5.0,
  },
];

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [analysts, setAnalysts] = useState(initialAnalysts);
  const [counsellors, setCounsellors] = useState(initialCounsellors);

  // Add functions
  const addTrainer = (trainer) => {
    const newId = Math.max(...trainers.map((t) => t.id), 0) + 1;
    setTrainers((prev) => [...prev, { id: newId, ...trainer }]);
  };

  const addAnalyst = (analyst) => {
    const newId = Math.max(...analysts.map((a) => a.id), 0) + 1;
    setAnalysts((prev) => [...prev, { id: newId, ...analyst }]);
  };

  const addCounsellor = (counsellor) => {
    const newId = Math.max(...counsellors.map((c) => c.id), 0) + 1;
    setCounsellors((prev) => [...prev, { id: newId, ...counsellor }]);
  };

  // Edit functions
  const editTrainer = (id, updated) => {
    setTrainers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    );
  };

  const editAnalyst = (id, updated) => {
    setAnalysts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    );
  };

  const editCounsellor = (id, updated) => {
    setCounsellors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    );
  };

  // Delete functions
  const deleteTrainer = (id) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
  };

  const deleteAnalyst = (id) => {
    setAnalysts((prev) => prev.filter((a) => a.id !== id));
  };

  const deleteCounsellor = (id) => {
    setCounsellors((prev) => prev.filter((c) => c.id !== id));
  };

  // Combined employees for Employees view
  const allEmployees = [
    ...trainers.map((t) => ({ ...t, role: "Trainer" })),
    ...analysts.map((a) => ({ ...a, role: "Analyst" })),
    ...counsellors.map((c) => ({ ...c, role: "Counsellor" })),
  ];

  return (
    <EmployeeContext.Provider
      value={{
        trainers,
        analysts,
        counsellors,
        allEmployees,
        addTrainer,
        addAnalyst,
        addCounsellor,
        editTrainer,
        editAnalyst,
        editCounsellor,
        deleteTrainer,
        deleteAnalyst,
        deleteCounsellor,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
};
