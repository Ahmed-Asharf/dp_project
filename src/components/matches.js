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


export const MatchEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="teamA" />
            <TextInput source="teamB" />
            <TextInput source="tour_id" />
            <TextInput source="winner" />
            <DateInput source="match_date" />
        </SimpleForm>
    </Edit>
);

export const MatchCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="teamA" />
            <TextInput source="teamB" />
            <TextInput source="tour_id" />
            <TextInput source="winner" />
            <DateInput source="match_date" />
        </SimpleForm>
    </Create>
);
export const MatchList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="teamA" />
            <TextField source="teamB" />
            <TextField source="tour_id" />
            <TextField source="winner" />
            <DateField source="match_date" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);