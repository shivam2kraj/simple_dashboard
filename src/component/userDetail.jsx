import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Paper } from "@mui/material";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to fetch user details. Please try again.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10">
      <Paper className="p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <p>
          <strong>User Name:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
        </p>
        <p>
          <strong>Geo:</strong>{" "}
           latitude{`${user.address.geo.lat}`}, longtitude {`${user.address.geo.lng}`}
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>Bs:</strong> {user.company.bs}
        </p>
        <p>
          <strong>Catch Phrase:</strong> {user.company.catchPhrase}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={`https://${user.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {user.website}
          </a>
        </p>
        <Link
          to="/"
          className="inline-block mt-6 text-white px-4 py-2 rounded hover:bg-blue-700 text-bold italic transition-all duration-300"
        >
          Back to User List
        </Link>
      </Paper>
    </div>
  );
};

export default UserDetails;
