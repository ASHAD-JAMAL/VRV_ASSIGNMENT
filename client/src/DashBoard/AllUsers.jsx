import axios from "axios";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaRegEye } from "react-icons/fa";

const customStyles = {
  tableWrapper: {
    style: {
      borderRadius: "20px",
      overflow: "hidden",
    },
  },
  header: {
    style: {
      backgroundColor: "#2A397E",
      color: "#FFF",
      fontSize: "18px",
      fontWeight: "bold",
      paddingLeft: "10px",
      paddingRight: "10px",
      borderRadius: "12px 12px 0 0",
    },
  },
  rows: {
    style: {
      minHeight: "60px",
      margin: "4px 0",
      paddingLeft: "5px",
      paddingRight: "10px",
    },
  },
  cells: {
    style: {
      paddingLeft: "10px",
      paddingRight: "10px",
      fontSize: "14px",
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #e2e8f0",
      backgroundColor: "#F1F5F9",
      padding: "10px",
      borderRadius: "0 0 12px 12px",
    },
    pageButtonsStyle: {
      color: "#10A37F",
      "&:hover": {
        backgroundColor: "#92CBCE",
        color: "#FFF",
        cursor: "pointer",
      },
    },
  },
};

function AllUsers() {
  const [userArr, setUserArr] = useState([]);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullName || "Unknown",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={row.avatar || "https://via.placeholder.com/40"}
              alt="User Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-sm lg:text-base font-medium text-gray-700">
            {row.fullName}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "Unknown",
      cell: (row) => (
        <p className="text-sm lg:text-base font-medium text-gray-600">
          {row.email || "xyz@gmail.com"}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role || "Unknown",
      cell: (row) => (
        <p className="text-sm lg:text-base font-medium text-gray-600">
          {row.role || "User"}
        </p>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-3 items-center">
          <FaRegEye className="text-lg text-green-600 cursor-pointer hover:text-green-700" />
          <FaEdit className="text-lg text-gray-500 cursor-pointer hover:text-green-600" />
          <MdDelete className="text-lg text-red-400 cursor-pointer hover:text-red-500" />
        </div>
      ),
      button: true,
    },
  ];

  const handleGetusers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setUserArr(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong" || error.message);
    }
  };

  useEffect(() => {
    handleGetusers();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen overflow-y-auto px-4 lg:px-8 bg-gray-50">
      <h1 className="text-2xl lg:text-3xl text-gray-700 font-semibold my-6">
        User Lists
      </h1>
      <div className="shadow-md bg-white rounded-2xl overflow-hidden">
        <DataTable
          title=""
          columns={columns}
          data={userArr}
          customStyles={customStyles}
          pagination
        />
      </div>
    </div>
  );
}

export default AllUsers;
