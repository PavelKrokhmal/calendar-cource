import React, {FC} from 'react';
import {Badge, Calendar, Space} from "antd";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate())
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
        return (<Space direction={'vertical'}>
                {currentDayEvents.map((ev, i) => (
                    <Badge key={i} status={'processing'} text={`[${ev.author}]: ${ev.description}`}/>
                ))}
            </Space>
        );
    }

    return (
        <Calendar dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;