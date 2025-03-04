import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Checkbox, Select, Input, Button, Modal, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./subjectList.css"; // Giữ lại CSS cũ

const { Option } = Select;

// ✅ Component Sidebar (Bộ lọc)
const Sidebar = ({ categories, onCategoryChange, onStatusChange, onCustomizeChange }) => {
    return (
        <div className="sidebar">
            <h3>Filter by Category</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.value}>
                        <Checkbox value={category.value} onChange={onCategoryChange}>
                            {category.value}
                        </Checkbox>
                    </li>
                ))}
            </ul>

            <h3>Filter by Status</h3>
            <Select id="statusFilter" onChange={onStatusChange} defaultValue="All">
                <Option value="All">All Status</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
            </Select>

            <h3>Customize Columns</h3>
            <div className="customization-panel">
                {["ID", "Name", "Category", "Owner", "Status"].map((col, index) => (
                    <Checkbox key={index} defaultChecked onChange={() => onCustomizeChange(index)}>
                        {col}
                    </Checkbox>
                ))}
            </div>

            <Button className="generate-ai-btn" onClick={() => window.open("/ai-analysis", "_blank")}>
                AI-Powered Changes
            </Button>
        </div>
    );
};

// ✅ Component Bảng Khóa Học
const CourseTable = ({ courses, onEdit, onManage }) => {
    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "title", key: "title" },
        { title: "Category", dataIndex: "categoryName", key: "category" },
        { title: "Owner", dataIndex: "ownerName", key: "owner" },
        { title: "Status", dataIndex: "status", key: "status", render: (status) => (status === 1 ? "Active" : "Inactive") },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button onClick={() => onEdit(record.id)}>Edit</Button>
                    <Button onClick={() => onManage(record.id)}>Manage</Button>
                </>
            ),
        },
    ];

    return <Table dataSource={courses} columns={columns} rowKey="id" />;
};

// ✅ Component AI Modal
const AIModal = ({ visible, onClose, aiResponse, onSendMessage }) => {
    const [message, setMessage] = useState("");

    return (
        <Modal visible={visible} title="AI Analysis" onCancel={onClose} footer={null}>
            <div>{aiResponse ? <p>{aiResponse}</p> : <Spin />}</div>
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask a question..." />
            <Button onClick={() => onSendMessage(message)}>Submit</Button>
        </Modal>
    );
};

// ✅ Component Chính: SubjectList
const SubjectList = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aiResponse, setAIResponse] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/v1/courses")
            .then((res) => {
                setCourses(res.data);
                setFilteredCourses(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleFilterCategory = (category) => {
        setFilteredCourses(courses.filter((c) => c.categoryName === category));
    };

    const handleFilterStatus = (status) => {
        setFilteredCourses(
            status === "All" ? courses : courses.filter((c) => (status === "Active" ? c.status === 1 : c.status === 0))
        );
    };

    const handleAIAnalysis = () => {
        setModalVisible(true);
        axios
            .post("http://localhost:4000/api/v1/ai-analysis", { message: "Analyze courses" })
            .then((res) => setAIResponse(res.data))
            .catch(() => setAIResponse("Failed to analyze courses."));
    };

    if (loading) return <Spin size="large" />;
    if (!courses.length) return <Alert message="No courses found" type="warning" />;

    return (
        <div className="container">
            <Sidebar categories={[]} onCategoryChange={handleFilterCategory} onStatusChange={handleFilterStatus} />
            <div className="content">
                <h1>Subjects List</h1>
                <Input prefix={<SearchOutlined />} placeholder="Search course..." />
                <Button onClick={() => alert("Redirecting to new course page...")}>Add New Course</Button>
                <CourseTable courses={filteredCourses} onEdit={(id) => alert(`Edit ${id}`)} onManage={(id) => alert(`Manage ${id}`)} />
                <AIModal visible={modalVisible} aiResponse={aiResponse} onClose={() => setModalVisible(false)} />
            </div>
        </div>
    );
};

export default SubjectList;
