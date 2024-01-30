import { useState } from "react";
const CompanyForm = () => {
  const [company, setCompany] = useState("");
 
  const handleCreateCompany = async () => {
    console.log(company);
    try {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: company}),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to create company");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
      <button type="button" onClick={handleCreateCompany}>Create</button>
    </>

  );
};
export default CompanyForm;
