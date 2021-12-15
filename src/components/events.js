import React from 'react';
import {
    List,
    TextInput,
    SimpleForm,
    Edit,
    Create,
    ReferenceInput,
    SelectInput,
    Datagrid,
    ReferenceField,
    TextField,
    EmailField,
    EditButton,
    DeleteButton,
    ImageInput,
    DateField,
    DateInput,
    EditGuesser,
    ImageField
} from 'react-admin';

const PreviewImage = ({ record, source }) => {
    if (typeof (record) == "string") {
        record = {
            [source]: record
        }
    }
    return <ImageField record={record} source={source} />
}

export const EventEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <DateInput source="STARTDATE" />
            <DateInput source="ENDDATE" />
            <TextInput source="PRIZE" />
            <TextInput source="IMAGE" />
            <TextInput source="description" options={{ multiLine: true }} />
            <TextInput source="TAGLINE" />
            <TextInput source="maxplayers" />
            <TextInput source="maxteams" />
        </SimpleForm>
    </Edit>
);

export const EventCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <DateInput source="STARTDATE" />
            <DateInput source="ENDDATE" />
            <TextInput source="PRIZE" />
            <ImageInput source="IMAGE">
                <PreviewImage source="src" />
            </ImageInput>
            <TextInput source="description" options={{ multiLine: true }} />
            <TextInput source="TAGLINE" />
            <TextInput source="maxplayers" />
            <TextInput source="maxteams" />
        </SimpleForm>
    </Create>
);
export const EventList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <DateField source="STARTDATE" />
            <DateField source="ENDDATE" />
            <TextField source="PRIZE" />
            <TextField source="IMAGE" />
            <TextField source="description" />
            <TextField source="TAGLINE" />
            <TextField source="maxplayers" />
            <TextField source="maxteams" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);