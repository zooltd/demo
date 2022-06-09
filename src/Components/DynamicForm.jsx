import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Select, Space} from 'antd';

import React, {useState} from 'react';

const leaders = [
    {label: 'David Johnson', value: 'David Johnson'},
    {label: 'John Johnson', value: 'John Johnson'}
];

const clients = [
    {label: 'Walmart', value: 'Walmart'},
    {label: 'Apple', value: 'Apple'},
    {label: 'Google', value: 'Google'},
    {label: 'Amazon', value: 'Amazon'},
]

const DynamicForm = () => {

    const [recipients, setRecipients] = useState([]);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const handleClientChange = (e) => {
        let newOpt = [];
        e.forEach(x => newOpt.push(
            {label: x + '-HR001', value: x + '-HR001'},
            {label: x + '-HR002', value: x + '-HR002'},
            {label: x + '-HR003', value: x + '-HR003'}));
        setRecipients(newOpt);
    }

    return (
        <Form form={form} name="dynamic_form" onFinish={onFinish} autoComplete="off">
            <Form.Item
                name="approvers"
                label="Team Leaders"
                rules={[
                    {
                        required: true,
                        message: 'Missing area',
                    },
                ]}
            >
                <Select mode="multiple"
                        allowClear
                        options={leaders}
                />
            </Form.Item>

            <Form.List name="clients">
                {(fields, {add, remove}) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    {...field}
                                    label="Clients"
                                    name={[field.name, 'clients']}
                                    rules={[{required: true, message: 'Missing clients'}]}
                                >
                                    <Select mode="multiple"
                                            style={{width: 300}}
                                            allowClear
                                            options={clients}
                                            onChange={handleClientChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="Recipients"
                                    name={[field.name, 'recipients']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Missing recipients',
                                        },
                                    ]}
                                >
                                    <Select mode="multiple"
                                            style={{width: 300}}
                                            allowClear
                                            options={recipients}
                                    />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)}/>
                            </Space>
                        ))}

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Submit
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DynamicForm;
