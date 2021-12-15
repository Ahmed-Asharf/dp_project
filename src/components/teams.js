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
    EditGuesser
} from 'react-admin';

export const TeamEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="team_Name" />
            <TextInput source="levels" />
            <TextInput source="SCORE" />
        </SimpleForm>
    </Edit>
);

export const TeamCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="team_Name" />
            <TextInput source="levels" />
            <TextInput source="SCORE" />
        </SimpleForm>
    </Create>
);
export const TeamList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="team_Name" />
            <TextField source="levels" />
            <TextField source="SCORE" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);