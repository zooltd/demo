import {Button, Form, Input, Select, Space, Upload, message, Transfer, Cascader} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

import React, {useState} from 'react';
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";

const leaders = [
    {label: 'David Johnson', value: 'David Johnson'},
    {label: 'John Johnson', value: 'John Johnson'}
];

const allClients = [
    {label: 'Walmart', value: 'Walmart'},
    {label: 'Apple', value: 'Apple'},
    {label: 'Google', value: 'Google'},
    {label: 'Amazon', value: 'Amazon'},
]

const categories = [
    {
        value: 'Tax Forms', label: 'Tax Forms',
        children: [{value: 'POAs', label: 'POAs'},
            {value: 'Other', label: 'Other'}]
    },
    {
        value: 'Employee Info', label: 'Employee Info',
        children: [{value: 'EE Demographics', label: 'EE Demographics'},
            {value: 'Other', label: 'Other'}],
    },
    {
        value: 'Additional HCM', label: 'Additional HCM'
    },
];

const DynamicForm = () => {
    const [clients, setClients] = useState([]);
    const [recipientCandidates, setRecipientCandidates] = useState([]);
    const [selectedRecipients, setSelectedRecipients] = useState([]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const handleClientChange = (e) => {
        setClients(e);
        let candidates = [];
        let i = 0;
        e.forEach(x => candidates.push(
            {key: (i++).toString(), title: x + '-HR001', value: x + '-HR001'},
            {key: (i++).toString(), title: x + '-HR002', value: x + '-HR002'},
            {key: (i++).toString(), title: x + '-HR003', value: x + '-HR003'}));
        setRecipientCandidates(candidates);
        setSelectedRecipients([]);
    }

    const handleFileChange = (e) => {
        // console.log(e);
    }

    const handleRecipientsChange = (e) => {
        setSelectedRecipients(e);
    }

    const handleSelectAllClients = () => {
        setClients(allClients.map(x => x.value))
        form.setFieldsValue({'clients': allClients})
        handleClientChange(allClients.map(x => x.value));
    }

    const handleBeforeUploading = (file, fileList) => {
        let newClients = [...clients];
        fileList.forEach(f => {
            let clientName = f.name.split("-")[0];
            if (!newClients.includes(clientName)) newClients.push(clientName);
        });
        let ok = newClients.length === clients.length && newClients.every((value, index) => value === clients[index]);
        if (!ok) {
            form.setFieldsValue({'clients': newClients})
            handleClientChange(newClients);
        }
    }

    const filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

    return (
        <>
            <span style={{display: 'block', backgroundColor: '#d9edf7', color: '#31708f', borderColor: '#bce8f1'}}>
                For Security Purposes:<br/>
                The maximum allowed files size is 500 MB<br/>
                Only approved file types are allowed<br/><br/>
                Click here to view accepted file types
            </span>
            <br/>
            <Form form={form} name="dynamic_form" onFinish={onFinish} autoComplete="off">
                <Form.Item
                    name="approvers"
                    label="Team Leaders"
                    rules={[{required: true, message: 'Missing area',},]}
                >
                    <Select mode="multiple"
                            allowClear
                            options={leaders}
                    />
                </Form.Item>

                <Form.Item
                    name='categories'
                    label="Categories"
                    rules={[{required: true, message: 'Missing area',},]}
                >
                    <Cascader options={categories} changeOnSelect/>
                </Form.Item>

                <Form.Item
                    name='subject'
                    label="Subject"
                    rules={[{required: true, message: 'Missing area',},]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name='notes'
                    label="Notes"
                    rules={[{required: true, message: 'Missing area',},]}
                >
                    <TextArea/>
                </Form.Item>

                <Form.Item name="Files">
                    <Dragger multiple onChange={handleFileChange} beforeUpload={handleBeforeUploading}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </Dragger>
                </Form.Item>

                <Form.Item
                    name="clients"
                    label="Clients"
                    rules={[{required: true, message: 'Missing area',},]}
                >
                    <Select mode="multiple"
                            allowClear
                            options={allClients}
                            onChange={handleClientChange}
                            value={clients}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleSelectAllClients}>Select All</Button>
                </Form.Item>

                <Form.Item
                    name="recipients"
                    label="Recipients"
                    rules={[{required: true, message: 'Missing area',},]}>
                    <Transfer
                        dataSource={recipientCandidates}
                        showSearch
                        filterOption={filterOption}
                        targetKeys={selectedRecipients}
                        onChange={handleRecipientsChange}
                        render={(item) => item.title}
                        pagination
                        showSelectAll
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Upload
                    </Button>
                </Form.Item>


            </Form>
        </>
    );
};

export default DynamicForm;

