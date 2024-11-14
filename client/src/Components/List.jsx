import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./List.css"; 
import { baseUrl } from "./Urls";
  // Make sure to import the CSS for react-toastify

const List = () => {
  const [mails, setMails] = useState([]);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchMails = async () => {
    // Show loading notification
    toast(
      <div>
        <h5 style={{color:"#007bff"}}>
          Render's free deployment takes <span style={{color:"#ffc107"}}>2 minutes</span> to start the server. Please wait and use the web app <sub style={{color:"#6c757d", fontStyle:"italic"}}>by GIRI</sub>
        </h5>
      </div>
    );

    try {
      const response = await axios.get(`${baseUrl}/api/get-mails`);
      setMails(response.data);
      toast.dismiss(); // Dismiss loading notification when data is fetched
    } catch (err) {
      setError("Failed to fetch data.");
      toast.error("Error fetching mails!");
      console.error(err);
    }
  };

  fetchMails(); // Call the fetchMails function

}, []);


  return (
    <div className="list-container">
      <h1>Mails Already Sent</h1>
      {error && <p className="error">{error}</p>}
      {mails.length === 0 ? (
        <p>No mails sent yet.</p>
      ) : (
        <table className="mail-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Role</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {mails.map((mail, index) => (
              <tr key={index}>
                <td>{mail.name}</td>
                <td>{mail.domain}</td>
                <td>{mail.role}</td>
                <td>{mail.email}</td>
                <td>{mail.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}   <ToastContainer />
    </div>
  );
};

export default List;
