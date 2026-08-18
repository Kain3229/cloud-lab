import { useEffect, useState } from "react";
 const API_URL = "https://expert-fiesta-5g596494gpv7f7xvj-5000.app.github.dev/api/Students" ;
function App() {
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  // Lấy danh sách sinh viên
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  // Gửi dữ liệu lên API POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStudent = {
      studentId,
      name,
      email,
    };
    try {
      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newStudent),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      // Thêm vào danh sách
      setStudents([...students, data]);
      // Xóa dữ liệu trên form
      setStudentId("");
      setName("");
      setEmail("");
      alert("Thêm sinh viên thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra!");
    }
  };
  return (
    <div style={{ width: "700px", margin: "30px auto" }}>
      <h1 style={{ textAlign: "center" }}>Danh sách sinh viên</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "2px solid black",
          padding: "20px",
          borderRadius: "8px",
          width: "500px",
          margin: "0 auto 30px auto",
          backgroundColor: "#f8f8f8",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Thêm sinh viên</h2>

        {/* MSSV */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <label
            style={{
              width: "120px",
              fontWeight: "bold",
            }}
          >
            MSSV
          </label>

          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Nhập mã số sinh viên"
            style={{
              flex: 1,
              padding: "8px",
            }}
          />
        </div>

        {/* Họ tên */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <label
            style={{
              width: "120px",
              fontWeight: "bold",
            }}
          >
            Họ tên
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ và tên"
            style={{
              flex: 1,
              padding: "8px",
            }}
          />
        </div>

        {/* Email */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              width: "120px",
              fontWeight: "bold",
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            style={{
              flex: 1,
              padding: "8px",
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Thêm sinh viên
          </button>
        </div>
      </form>

      {/* Bảng danh sách */}
      <table
        border="1"
        cellPadding="8"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;