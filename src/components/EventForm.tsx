import React, {FC} from 'react';
import {Button, DatePicker, Form, Input, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/date";
import moment, {Moment} from "moment";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

interface EventFormData {
    date: Moment,
    description: string,
    guest: string
}

const EventForm: FC<EventFormProps> = (props) => {
    const [form] = Form.useForm();
    const {user} = useTypedSelector(state => state.auth)
    const submit = (values: EventFormData) => {
        const preparedEvent: IEvent = {
            ...values,
            date: values.date ? formatDate(moment(values.date).toDate()) : '',
            author: user.username
        }
        props.submit(preparedEvent)
        form.resetFields()
    };
    return (
        <Form name="basic"
              form={form}
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              initialValues={{remember: true}}
              onFinish={submit}
              autoComplete="off"
        >
            <Form.Item label="Event description"
                       name="description"
                       rules={[rules.required('Please input event description!')]}
            >
                <Input/>
            </Form.Item>
            <Form.Item label="Event date"
                       rules={[rules.required('Please input event date!'),
                           rules.isDateAfter('Event date must not be in past')]}
                       name="date">
                <DatePicker/>
            </Form.Item>
            <Form.Item label="Event guest"
                       rules={[rules.required('Please input event guest!')]}
                       name="guest">
                <Select>
                    {props.guests.map(guest => (
                        <Select.Option value={guest.username} key={guest.username}>{guest.username}</Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EventForm;