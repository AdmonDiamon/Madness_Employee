import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [positions, setPositions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingOption, setSortingOption] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [searchResults, setSearchResults] = useState([]);

  const fetchPositions = async () => {
    try {
      const response = await fetch("/api/positions");
      const data = await response.json();
      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const fetchLevels = async () => {
    try {
      const response = await fetch("/api/levels");
      const data = await response.json();
      setLevels(data);
    } catch (error) {
      console.error("Error fetching levels:", error);
    }
  };

  const fetchFilteredEmployees = async () => {
    try {
      let apiUrl = "http://localhost:8080/api/employees";

      const queryParams = [];

      if (selectedPosition) {
        apiUrl += `/position/${selectedPosition}`;
      }

      if (selectedLevel) {
        apiUrl += `/level/${selectedLevel}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching filtered employees:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSorting = (option) => {
    if (sortingOption === option) {
      setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
    } else {
      setSortingOption(option);
      setSortingOrder("asc");
    }
  };

  const sortedEmployees = employees
    ? [...employees].sort((a, b) => {
        const valueA = a[sortingOption];
        const valueB = b[sortingOption];

        if (sortingOrder === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      })
    : [];

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchPositions(), fetchLevels()]);
      await fetchFilteredEmployees();
      setLoading(false);
      setSortingOption("name");
    };

    fetchData();
  }, [selectedPosition, selectedLevel]);

  if (loading) {
    return <Loading />;
  }

  

  return (
    <div>
      <div>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
        >
          <option value="">Select Position</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">Select Level</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div>
        <button onClick={() => handleSorting("name")}>Sort by First Name</button>
        <button onClick={() => handleSorting("lastName")}>Sort by Last Name</button>
        <button onClick={() => handleSorting("middleName")}>Sort by Middle Name</button>
        <button onClick={() => handleSorting("position")}>Sort by Position</button>
        <button onClick={() => handleSorting("level")}>Sort by Level</button>
      </div>
      <EmployeeTable employees={sortedEmployees} />
    </div>
  );
};

export default EmployeeList;
