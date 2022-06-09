import {Card, Col, Row} from 'antd';
import React, {useState} from 'react';
import DynamicForm from "./Components/DynamicForm";

const tabListNoTitle = [
    {
        key: 'style1',
        tab: 'style1',
    },
    {
        key: 'style2',
        tab: 'style2',
    }
];

const contentListNoTitle = {
    style1: <DynamicForm/>,
    style2: <p>style2 content</p>,
};

const App = () => {
    const [activeTabKey, setActiveTabKey] = useState('style1');

    const onTab1Change = (key) => {
        setActiveTabKey(key);
    };

    return (
        <div className="App">
            <br/>
            <br/>
            <Row>
                <Col span={4}/>
                <Col span={16}>
                    <Card
                        style={{
                            width: '100%',
                        }}
                        tabList={tabListNoTitle}
                        activeTabKey={activeTabKey}
                        onTabChange={(key) => {
                            onTab1Change(key);
                        }}
                    >
                        {contentListNoTitle[activeTabKey]}
                    </Card>
                </Col>
                <Col span={4}/>
            </Row>
        </div>
    );
};

export default App;
