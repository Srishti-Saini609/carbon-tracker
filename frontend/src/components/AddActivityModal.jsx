// import React, { useState } from "react";
// import toast from "react-hot-toast";

// export default function AddActivityModal({ onClose, onActivityAdded }) {
//   const [formData, setFormData] = useState({
//     category: "",
//     description: "",
//     amount: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { category, amount } = formData;

    
//     if (!category.trim()) {
//       toast.error("Category is required");
//       return;
//     }

//     if (!amount || amount <= 0) {
//       toast.error("Amount must be greater than 0");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/activities", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Activity added successfully!");
//         onActivityAdded(data); 
//         onClose(); 
//       } else {
//         toast.error(data.message || "Failed to add activity");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl w-96"
//       >
//         <h2 className="text-xl font-semibold mb-4">Add Activity</h2>

//         <input
//           name="category"
//           placeholder="Category (e.g. electricity, petrol)"
//           className="w-full border p-2 mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="description"
//           placeholder="Description (optional)"
//           className="w-full border p-2 mb-3"
//           onChange={handleChange}
//         />

//         <input
//           name="amount"
//           type="number"
//           placeholder="Amount"
//           className="w-full border p-2 mb-3"
//           onChange={handleChange}
//         />

//         <div className="flex justify-between mt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-green-600 text-white rounded"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
