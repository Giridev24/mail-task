import { useEffect, useState } from "react";
import axios from "axios";
import "./List.css"; 
import { baseUrl } from "./Urls";

const List = () => {
  const [mails, setMails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/get-mails`);
        setMails(response.data);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      }
    };

    fetchMails();
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
      )}
    </div>
  );
};

export default List;
