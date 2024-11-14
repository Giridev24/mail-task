// Frontend: Form.js
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { baseUrl } from "./Urls";  // Ensure this path is correct
import { Toaster, toast } from "react-hot-toast";

const Form = () => {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = { name, domain, role, email, contact };

    try {
      const response = await axios.post(`${baseUrl}/form`, formData);

      if (response.status === 200) {
        toast.success("Mail sent successfully", { duration: 2000 });
        setName("");
        setDomain("");
        setRole("");
        setEmail("");
        setContact("");
      } else {
        toast.error("There was an error. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please check the console for more details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Mail Form</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Domain:</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Sending Mail..." : "Submit"}
        </button>
      </form>

      <button
        className="list-btn"
        onClick={() => navigate("/list")}
      >
        List
      </button>
      <Toaster />
    </div>
  );
};

export default Form;
