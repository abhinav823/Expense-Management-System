import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("365");
  const [selectedDate, setSelectedate] = useState([]);  //
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",  //dataIndex is the key of the data in the list means the data we are getting from backend
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",  //dataindex is a property of column in antd table
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",  //actions is a property of column in antd table used for edit and delete

      render: (record) => (  //record means the data we are getting from backend
        <div>
          <EditTwoTone twoToneColor="hotpink" onClick={() => {
            setEditable(record);
            setShowModal(true);
          }}
          />
          <DeleteTwoTone twoToneColor="red"
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];
  //getall transactions

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);

        const res = await axios.post("/api/v1/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,

        });
        setLoading(false);
        setAllTransaction(res.data); //res.data is the data we are getting from backend
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue With Transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);  




  //delete handler
  const handleDelete = async (record) => {  //we named 
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction", {
        transacationId: record._id,  //transacationId is the key of the data in the list means the data we are getting from backend
      });
      setLoading(false);
      message.success("Transaction Deleted!");
      window.location.reload();
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };



  // form handling

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (editable) {  //if editable means if we are editing the data then we are using this
        await axios.post("/api/v1/transactions/edit-transaction", {
          payload:  //payload is the key of the data in the list means the data we are getting from backend
          {
            ...values,  
            userId: user._id,
          },
          transacationId: editable._id,
        });
        message.success("Transaction Updated Successfully");
        setLoading(false);
        window.location.reload();
        navigate("/");
      } else {
        await axios.post("/api/v1/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
        window.location.reload();
        navigate("/");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };



  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div >
          <h6><b>Select Frequency</b></h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div>
          <h6><b>Select Type</b></h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>

        <div className="switch-icons">
          <UnorderedListOutlined className={`mx-2 ${viewData === "table" ? "active-icon" : "inactive-icon"}`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}>
            Add New
          </button>
        </div>
      </div>
      <div className="content container mr-5">  
        {viewData === "table" ? (  //table data
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />  //we are passing allTransaction as a prop to analytics
        )}
      </div>
      <Modal title={editable ? "Edit Transaction" : "Add Transaction"}  //if editable true then edit transaction , edit transaction is coming from backend
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}  
      >
        <Form layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">  
            <Input type="date" />
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;