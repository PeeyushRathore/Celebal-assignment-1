import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function FormPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.includes("@")) newErrors.email = "Email is invalid";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!countryCode.match(/^\+\d{1,4}$/))
      newErrors.countryCode = "Invalid country code";
    if (countryCode === "+91" && !phoneNumber.match(/^\d{10}$/))
      newErrors.phoneNumber = "Phone number must be 10 digits for India";
    if (!country) newErrors.country = "Country is required";
    if (!city) newErrors.city = "City is required";
    if (!pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/))
      newErrors.pan = "Invalid PAN format";
    if (!aadhar.match(/^\d{12}$/))
      newErrors.aadhar = "Aadhar must be 12 digits";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [
    firstName,
    lastName,
    username,
    email,
    password,
    countryCode,
    phoneNumber,
    country,
    city,
    pan,
    aadhar,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/success", {
        state: {
          firstName,
          lastName,
          username,
          email,
          password,
          phone: `${countryCode} ${phoneNumber}`,
          country,
          city,
          pan,
          aadhar,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>React Form with Validation</h2>

      <label>First Name</label>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      {errors.firstName && <p>{errors.firstName}</p>}

      <label>Last Name</label>
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      {errors.lastName && <p>{errors.lastName}</p>}

      <label>Username</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      {errors.username && <p>{errors.username}</p>}

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <label>Password</label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {errors.password && <p>{errors.password}</p>}

      <label>Country Code</label>
      <input
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        placeholder="+91"
      />
      {errors.countryCode && <p>{errors.countryCode}</p>}

      <label>Phone Number</label>
      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {errors.phoneNumber && <p>{errors.phoneNumber}</p>}

      <label>Country</label>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Select</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
      </select>
      {errors.country && <p>{errors.country}</p>}

      <label>City</label>
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="New York">New York</option>
      </select>
      {errors.city && <p>{errors.city}</p>}

      <label>PAN Number</label>
      <input
        value={pan}
        onChange={(e) => setPan(e.target.value)}
        placeholder="ABCDE1234F"
      />
      {errors.pan && <p>{errors.pan}</p>}

      <label>Aadhar Number</label>
      <input value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
      {errors.aadhar && <p>{errors.aadhar}</p>}

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}

export default FormPage;
