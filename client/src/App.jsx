import { useEffect, useState } from "react";

// URL Backend API
const API_URL =
  "https://xx72x48h-5000.asse.devtunnels.ms/api/students";

function App() {
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ID của sinh viên đang được sửa
  // null = đang ở chế độ thêm mới
  const [editingId, setEditingId] = useState(null);

  // Hàm lấy danh sách sinh viên
  const loadStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Không thể lấy danh sách sinh viên!");
    }
  };

  // Khi mở trang thì lấy danh sách sinh viên
  useEffect(() => {
    loadStudents();
  }, []);

  // Thêm hoặc cập nhật sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = {
      studentId,
      name,
      email,
    };

    try {
      let response;

      // Nếu có editingId => đang sửa
      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        });
      } else {
        // Không có editingId => thêm mới
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(student),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Lấy lại danh sách từ Backend
      await loadStudents();

      // Xóa dữ liệu form
      setStudentId("");
      setName("");
      setEmail("");
      setEditingId(null);

      if (editingId) {
        alert("Cập nhật thành công!");
      } else {
        alert("Thêm sinh viên thành công!");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra: " + error.message);
    }
  };

  // Khi bấm nút Sửa
  const handleEdit = (student) => {
    setStudentId(student.studentId);
    setName(student.name);
    setEmail(student.email);

    // Lưu _id của sinh viên đang sửa
    setEditingId(student._id);
  };

  // Khi bấm nút Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Cập nhật lại danh sách
      await loadStudents();

      alert("Xóa sinh viên thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra: " + error.message);
    }
  };

  return (
    <div style={{ width: "700px", margin: "30px auto" }}>
      <h1 style={{ textAlign: "center" }}>
        Danh sách sinh viên
      </h1>

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
        <h2 style={{ textAlign: "center" }}>
          {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}
        </h2>

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
            {editingId ? "Cập nhật" : "Thêm sinh viên"}
          </button>

          {/* Nút Hủy khi đang sửa */}
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setStudentId("");
                setName("");
                setEmail("");
                setEditingId(null);
              }}
              style={{
                padding: "10px 20px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {/* BẢNG DANH SÁCH */}
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
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>

              <td>
                <button onClick={() => handleEdit(student)}>
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(student._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;